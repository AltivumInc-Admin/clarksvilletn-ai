// @vitest-environment node
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { handler } from './index.mjs';

const ddbMock = mockClient(DynamoDBDocumentClient);
const s3Mock = mockClient(S3Client);
const sesMock = mockClient(SESClient);

function event(body) {
  return {
    body: typeof body === 'string' ? body : JSON.stringify(body),
    requestContext: { http: { sourceIp: '203.0.113.5' } },
  };
}

const tinyPng = 'data:image/png;base64,' + Buffer.from('hello').toString('base64');

const validBody = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  turnstileToken: 'tok',
  credentials: [],
  degrees: [],
};

function stubFetch(success) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({ json: async () => ({ success }) })),
  );
}

beforeEach(() => {
  ddbMock.reset();
  s3Mock.reset();
  sesMock.reset();
  ddbMock.on(PutCommand).resolves({});
  s3Mock.on(PutObjectCommand).resolves({});
  sesMock.on(SendEmailCommand).resolves({});
  process.env.PROFILES_TABLE = 'test-profiles';
  process.env.SITE_ORIGIN = 'https://clarksvilletn.ai';
  process.env.ADMIN_EMAIL = 'admin@altivum.ai';
  process.env.ADMIN_ACTION_SECRET = 'test-secret';
  process.env.API_DOMAIN = 'api.clarksvilletn.ai';
  process.env.MEDIA_BUCKET = 'test-bucket';
  process.env.MEDIA_BASE_URL = 'https://media.test';
  // Default: Turnstile is configured and passes. Individual tests override.
  process.env.TURNSTILE_SECRET = 'secret';
  stubFetch(true);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('submit-profile handler', () => {
  it('returns 400 for malformed JSON', async () => {
    const res = await handler(event('{not json'));
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when name is missing', async () => {
    const res = await handler(event({ ...validBody, name: '' }));
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 for an invalid email', async () => {
    const res = await handler(event({ ...validBody, email: 'not-an-email' }));
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when the turnstile token is missing', async () => {
    const { turnstileToken, ...noToken } = validBody;
    void turnstileToken;
    const res = await handler(event(noToken));
    expect(res.statusCode).toBe(400);
  });

  it('fails closed (400) when TURNSTILE_SECRET is not configured', async () => {
    // Hardened behavior: a missing secret must NOT silently disable bot protection.
    delete process.env.TURNSTILE_SECRET;
    const res = await handler(event(validBody));
    expect(res.statusCode).toBe(400);
    expect(ddbMock.commandCalls(PutCommand)).toHaveLength(0);
  });

  it('returns 400 when Turnstile verification fails', async () => {
    stubFetch(false);
    const res = await handler(event(validBody));
    expect(res.statusCode).toBe(400);
    expect(ddbMock.commandCalls(PutCommand)).toHaveLength(0);
  });

  it('proceeds when Turnstile verification succeeds', async () => {
    const res = await handler(event(validBody));
    expect(res.statusCode).toBe(200);
  });

  it('rejects an oversized headshot with 400', async () => {
    const huge = 'data:image/png;base64,' + 'A'.repeat(2_800_000); // > 2MB decoded
    const res = await handler(event({ ...validBody, headshotBase64: huge }));
    expect(res.statusCode).toBe(400);
    expect(s3Mock.commandCalls(PutObjectCommand)).toHaveLength(0);
  });

  it('rejects a non-image headshot data URI with 400', async () => {
    const res = await handler(event({ ...validBody, headshotBase64: 'data:application/pdf;base64,AAAA' }));
    expect(res.statusCode).toBe(400);
  });

  it('happy path: uploads headshot, writes pending row, emails admin, returns profileId', async () => {
    const res = await handler(event({ ...validBody, headshotBase64: tinyPng }));
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.status).toBe('pending');
    expect(body.profileId).toBeTruthy();
    expect(s3Mock.commandCalls(PutObjectCommand)).toHaveLength(1);
    const putInput = ddbMock.commandCalls(PutCommand)[0].args[0].input;
    expect(putInput.Item.status).toBe('pending');
    expect(putInput.Item.sourceIp).toBe('203.0.113.5');
    expect(sesMock.commandCalls(SendEmailCommand)).toHaveLength(1);
  });

  it('uploads a credential badge image to S3 when provided', async () => {
    const body = {
      ...validBody,
      credentials: [
        { issuer: 'AWS', title: 'SAA', verifyUrl: 'https://verify', badgeImageBase64: tinyPng },
      ],
    };
    const res = await handler(event(body));
    expect(res.statusCode).toBe(200);
    expect(s3Mock.commandCalls(PutObjectCommand)).toHaveLength(1);
    const putInput = ddbMock.commandCalls(PutCommand)[0].args[0].input;
    expect(putInput.Item.credentials[0].badgeImageUrl).toContain('badges/');
    expect(putInput.Item.credentials[0].badgeImageBase64).toBeUndefined();
  });

  it('returns 400 for a credential with an invalid verify URL', async () => {
    const body = {
      ...validBody,
      credentials: [{ issuer: 'AWS', title: 'SAA', verifyUrl: 'ftp://nope' }],
    };
    const res = await handler(event(body));
    expect(res.statusCode).toBe(400);
  });

  it('returns 500 when the DynamoDB write fails', async () => {
    ddbMock.on(PutCommand).rejects(new Error('ddb down'));
    const res = await handler(event(validBody));
    expect(res.statusCode).toBe(500);
  });

  it('returns 400 for an invalid LinkedIn URL', async () => {
    const res = await handler(event({ ...validBody, linkedinUrl: 'ftp://bad' }));
    expect(res.statusCode).toBe(400);
  });

  it('fails closed (400) when the Turnstile request itself throws', async () => {
    process.env.TURNSTILE_SECRET = 'secret';
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('network');
      }),
    );
    const res = await handler(event(validBody));
    expect(res.statusCode).toBe(400);
  });

  it('mints moderation links carrying a single-use nonce (jti) and a 24h expiry', async () => {
    await handler(event(validBody));
    const sesInput = sesMock.commandCalls(SendEmailCommand)[0].args[0].input;
    const text = sesInput.Message.Body.Text.Data;
    const match = text.match(/action=approve&token=([^\s]+)/);
    expect(match).toBeTruthy();
    const payload = JSON.parse(Buffer.from(match[1].split('.')[0], 'base64url').toString('utf8'));
    expect(typeof payload.jti).toBe('string');
    expect(payload.jti.length).toBeGreaterThan(0);
    const ttl = payload.exp - Date.now();
    expect(ttl).toBeGreaterThan(23 * 60 * 60 * 1000);
    expect(ttl).toBeLessThanOrEqual(24 * 60 * 60 * 1000 + 5000);
  });

  it('accepts a fully-populated profile (all optional fields + email branches)', async () => {
    const body = {
      ...validBody,
      phone: '555-0100',
      city: 'Clarksville',
      headline: 'Engineer',
      bio: 'Hello there',
      linkedinUrl: 'https://linkedin.com/in/jane',
      credentials: [{ issuer: 'AWS', title: 'SAA', verifyUrl: 'https://v', issuedDate: '2024' }],
      degrees: [{ degree: 'BS', institution: 'APSU', year: 2015, focus: 'CS' }],
    };
    const res = await handler(event(body));
    expect(res.statusCode).toBe(200);
    const putInput = ddbMock.commandCalls(PutCommand)[0].args[0].input;
    expect(putInput.Item.degrees[0].focus).toBe('CS');
  });
});
