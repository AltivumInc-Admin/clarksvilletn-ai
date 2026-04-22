import { randomUUID, createHmac } from 'node:crypto';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const s3 = new S3Client({});
const ses = new SESClient({});

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 3;
const MAX_HEADSHOT_BYTES = 2 * 1024 * 1024;
const MAX_BADGE_BYTES = 200 * 1024;
const MAX_CREDENTIALS = 12;
const MAX_DEGREES = 6;
const MAX_BIO = 300;

function corsHeaders() {
  return {
    'access-control-allow-origin': process.env.SITE_ORIGIN ?? '',
    'access-control-allow-methods': 'GET, POST, PUT, OPTIONS',
    'access-control-allow-headers': 'content-type, authorization',
    vary: 'origin',
  };
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { 'content-type': 'application/json', ...corsHeaders() },
    body: JSON.stringify(body),
  };
}

const ok = (body) => jsonResponse(200, body);
const created = (body) => jsonResponse(201, body);
const badRequest = (message) => jsonResponse(400, { message });
const unauthorized = () => jsonResponse(401, { message: 'Unauthorized' });
const notFound = (message = 'Not found') => jsonResponse(404, { message });
const methodNotAllowed = () => jsonResponse(405, { message: 'Method not allowed' });
const serverError = (message = 'Internal server error') => jsonResponse(500, { message });

function signAction(profileId, action, secret) {
  const payload = { profileId, action, exp: Date.now() + TOKEN_TTL_MS };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', secret).update(payloadB64).digest('base64url');
  return `${payloadB64}.${sig}`;
}

function parseDataUri(value) {
  if (typeof value !== 'string') return null;
  const match = value.match(/^data:(image\/(?:jpeg|png|webp|gif));base64,(.+)$/i);
  if (!match) return null;
  const contentType = match[1].toLowerCase();
  const buffer = Buffer.from(match[2], 'base64');
  return { contentType, buffer };
}

function isHttpUrl(value) {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function clean(value, max) {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return max ? trimmed.slice(0, max) : trimmed;
}

function validatePayload(raw) {
  if (!raw || typeof raw !== 'object') return { error: 'Invalid JSON body.' };
  const name = clean(raw.name, 120);
  if (!name) return { error: 'Name is required.' };

  const email = clean(raw.email, 254);
  if (email && !email.includes('@')) return { error: 'Email must be a valid address.' };

  const credentialsRaw = Array.isArray(raw.credentials) ? raw.credentials : [];
  if (credentialsRaw.length > MAX_CREDENTIALS) {
    return { error: `Maximum ${MAX_CREDENTIALS} credentials allowed.` };
  }
  const credentials = [];
  for (const c of credentialsRaw) {
    const issuer = clean(c?.issuer, 80);
    const title = clean(c?.title, 160);
    const verifyUrl = clean(c?.verifyUrl, 1024);
    if (!issuer || !title || !verifyUrl) continue;
    if (!isHttpUrl(verifyUrl)) {
      return { error: `Credential "${title}" has an invalid verify URL.` };
    }
    const badgeImageUrl = clean(c?.badgeImageUrl, 1024);
    if (badgeImageUrl && !isHttpUrl(badgeImageUrl)) {
      return { error: `Credential "${title}" has an invalid badge image URL.` };
    }
    const badgeImageBase64 =
      typeof c?.badgeImageBase64 === 'string' && c.badgeImageBase64 ? c.badgeImageBase64 : undefined;
    credentials.push({
      issuer,
      title,
      verifyUrl,
      ...(badgeImageUrl ? { badgeImageUrl } : {}),
      ...(badgeImageBase64 ? { badgeImageBase64 } : {}),
      ...(clean(c?.issuedDate, 32) ? { issuedDate: clean(c?.issuedDate, 32) } : {}),
    });
  }

  const degreesRaw = Array.isArray(raw.degrees) ? raw.degrees : [];
  if (degreesRaw.length > MAX_DEGREES) {
    return { error: `Maximum ${MAX_DEGREES} degrees allowed.` };
  }
  const degrees = [];
  for (const d of degreesRaw) {
    const degree = clean(d?.degree, 80);
    const institution = clean(d?.institution, 160);
    const year = Number(d?.year);
    if (!degree || !institution || !Number.isFinite(year) || year < 1950 || year > 2100) continue;
    degrees.push({
      degree,
      institution,
      year,
      ...(clean(d?.focus, 160) ? { focus: clean(d?.focus, 160) } : {}),
    });
  }

  const linkedinUrl = clean(raw.linkedinUrl, 512);
  if (linkedinUrl && !isHttpUrl(linkedinUrl)) {
    return { error: 'LinkedIn URL must be a valid http(s) URL.' };
  }

  return {
    payload: {
      name,
      email,
      phone: clean(raw.phone, 40),
      city: clean(raw.city, 120),
      headline: clean(raw.headline, 200),
      bio: clean(raw.bio, MAX_BIO),
      linkedinUrl,
      credentials,
      degrees,
      headshotBase64: typeof raw.headshotBase64 === 'string' ? raw.headshotBase64 : undefined,
    },
  };
}

async function uploadHeadshot(profileId, dataUri) {
  if (!dataUri) return undefined;
  const parsed = parseDataUri(dataUri);
  if (!parsed) {
    const err = new Error('Headshot must be a JPEG, PNG, WebP, or GIF data URI.');
    err.userFacing = true;
    throw err;
  }
  if (parsed.buffer.byteLength > MAX_HEADSHOT_BYTES) {
    const err = new Error('Headshot exceeds 2MB.');
    err.userFacing = true;
    throw err;
  }
  const ext = parsed.contentType.split('/')[1];
  const key = `headshots/${profileId}.${ext}`;
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.MEDIA_BUCKET,
      Key: key,
      Body: parsed.buffer,
      ContentType: parsed.contentType,
      CacheControl: 'public, max-age=86400',
    }),
  );
  return `${process.env.MEDIA_BASE_URL}/${key}`;
}

async function uploadBadge(profileId, index, dataUri) {
  const parsed = parseDataUri(dataUri);
  if (!parsed) {
    const err = new Error(`Credential ${index + 1} badge must be a JPEG, PNG, WebP, or GIF image.`);
    err.userFacing = true;
    throw err;
  }
  if (parsed.buffer.byteLength > MAX_BADGE_BYTES) {
    const err = new Error(`Credential ${index + 1} badge exceeds 200KB.`);
    err.userFacing = true;
    throw err;
  }
  const ext = parsed.contentType.split('/')[1];
  const key = `badges/${profileId}/${index}.${ext}`;
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.MEDIA_BUCKET,
      Key: key,
      Body: parsed.buffer,
      ContentType: parsed.contentType,
      CacheControl: 'public, max-age=86400',
    }),
  );
  return `${process.env.MEDIA_BASE_URL}/${key}`;
}

async function getProfileByUserSub(userSub) {
  const res = await ddb.send(
    new QueryCommand({
      TableName: process.env.PROFILES_TABLE,
      IndexName: 'userSub-index',
      KeyConditionExpression: 'userSub = :us',
      ExpressionAttributeValues: { ':us': userSub },
      Limit: 1,
    }),
  );
  return res.Items?.[0];
}

function ownerView(item) {
  return {
    profileId: item.profileId,
    status: item.status,
    name: item.name,
    email: item.email,
    phone: item.phone,
    city: item.city,
    headline: item.headline,
    bio: item.bio,
    linkedinUrl: item.linkedinUrl,
    headshotUrl: item.headshotUrl,
    credentials: Array.isArray(item.credentials) ? item.credentials : [],
    degrees: Array.isArray(item.degrees) ? item.degrees : [],
    approvedAt: item.approvedAt,
    rejectedAt: item.rejectedAt,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

async function sendReviewEmail(profile, isUpdate) {
  const secret = process.env.ADMIN_ACTION_SECRET;
  const apiBase = `https://${process.env.API_DOMAIN}`;
  const approve = `${apiBase}/admin/profiles/${profile.profileId}/action?action=approve&token=${signAction(profile.profileId, 'approve', secret)}`;
  const reject = `${apiBase}/admin/profiles/${profile.profileId}/action?action=reject&token=${signAction(profile.profileId, 'reject', secret)}`;

  const credentialsLines = profile.credentials
    .map((c) => `  - ${c.issuer} — ${c.title} (${c.verifyUrl})`)
    .join('\n');
  const degreesLines = profile.degrees
    .map((d) => `  - ${d.degree} ${d.focus ? `(${d.focus}) ` : ''}— ${d.institution}, ${d.year}`)
    .join('\n');

  const text = [
    isUpdate
      ? `AI-Ready Clarksville profile updated. Now pending re-review.`
      : `New AI-Ready Clarksville profile submitted.`,
    ``,
    `Name: ${profile.name}`,
    profile.email ? `Email: ${profile.email}` : null,
    profile.phone ? `Phone: ${profile.phone}` : null,
    profile.city ? `City: ${profile.city}` : null,
    profile.headline ? `Headline: ${profile.headline}` : null,
    profile.linkedinUrl ? `LinkedIn: ${profile.linkedinUrl}` : null,
    profile.bio ? `\nBio:\n${profile.bio}` : null,
    profile.credentials.length ? `\nCredentials:\n${credentialsLines}` : null,
    profile.degrees.length ? `\nEducation:\n${degreesLines}` : null,
    profile.headshotUrl ? `\nHeadshot: ${profile.headshotUrl}` : null,
    ``,
    `Approve: ${approve}`,
    `Reject:  ${reject}`,
    ``,
    `(Links expire in 3 days.)`,
  ]
    .filter((v) => v !== null)
    .join('\n');

  const toAddress = process.env.ADMIN_EMAIL;
  const subject = isUpdate
    ? `[AI-Ready] Profile updated: ${profile.name}`
    : `[AI-Ready] New profile: ${profile.name}`;
  try {
    await ses.send(
      new SendEmailCommand({
        Source: toAddress,
        Destination: { ToAddresses: [toAddress] },
        Message: {
          Subject: { Data: subject },
          Body: { Text: { Data: text } },
        },
      }),
    );
  } catch (err) {
    console.error('Failed to send review email', err);
  }
}

export const handler = async (event) => {
  try {
    const claims = event.requestContext?.authorizer?.jwt?.claims;
    const sub = claims?.sub;
    if (!sub) return unauthorized();
    const cognitoEmail = typeof claims?.email === 'string' ? claims.email : undefined;

    const method = event.requestContext?.http?.method;

    if (method === 'GET') {
      const existing = await getProfileByUserSub(sub);
      if (!existing) return notFound('No profile for this user.');
      return ok({ profile: ownerView(existing) });
    }

    if (method === 'PUT') {
      let body;
      try {
        body = JSON.parse(event.body ?? '{}');
      } catch {
        return badRequest('Invalid JSON.');
      }

      const { payload, error } = validatePayload(body);
      if (error) return badRequest(error);

      const existing = await getProfileByUserSub(sub);
      const profileId = existing?.profileId ?? randomUUID();
      const createdAt = existing?.createdAt ?? new Date().toISOString();
      const now = new Date().toISOString();

      let headshotUrl = existing?.headshotUrl;
      let storedCredentials;
      try {
        if (payload.headshotBase64) {
          headshotUrl = await uploadHeadshot(profileId, payload.headshotBase64);
        }
        storedCredentials = await Promise.all(
          payload.credentials.map(async (c, i) => {
            const { badgeImageBase64, ...rest } = c;
            if (badgeImageBase64) {
              const uploadedUrl = await uploadBadge(profileId, i, badgeImageBase64);
              return { ...rest, badgeImageUrl: uploadedUrl };
            }
            return rest;
          }),
        );
      } catch (err) {
        if (err.userFacing) return badRequest(err.message);
        throw err;
      }

      const record = {
        profileId,
        userSub: sub,
        status: 'pending',
        createdAt,
        updatedAt: now,
        name: payload.name,
        email: payload.email ?? cognitoEmail,
        phone: payload.phone,
        city: payload.city,
        headline: payload.headline,
        bio: payload.bio,
        linkedinUrl: payload.linkedinUrl,
        headshotUrl,
        credentials: storedCredentials,
        degrees: payload.degrees,
      };

      await ddb.send(
        new PutCommand({
          TableName: process.env.PROFILES_TABLE,
          Item: record,
        }),
      );

      await sendReviewEmail(record, Boolean(existing));

      const responseBody = { profile: ownerView(record), status: 'pending' };
      return existing ? ok(responseBody) : created(responseBody);
    }

    return methodNotAllowed();
  } catch (err) {
    console.error(err);
    return serverError();
  }
};
