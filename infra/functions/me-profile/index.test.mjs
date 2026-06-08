// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, QueryCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { handler } from './index.mjs';

const ddbMock = mockClient(DynamoDBDocumentClient);
const s3Mock = mockClient(S3Client);
const sesMock = mockClient(SESClient);

function authEvent(method, { sub = 'user-A', email = 'a@example.com', body } = {}) {
  return {
    requestContext: {
      authorizer: { jwt: { claims: { sub, email } } },
      http: { method },
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  };
}

const validBody = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  credentials: [],
  degrees: [{ degree: 'BS', institution: 'APSU', year: 2015 }],
};

beforeEach(() => {
  ddbMock.reset();
  s3Mock.reset();
  sesMock.reset();
  sesMock.on(SendEmailCommand).resolves({});
  process.env.PROFILES_TABLE = 'test-profiles';
  process.env.SITE_ORIGIN = 'https://clarksvilletn.ai';
  process.env.ADMIN_EMAIL = 'admin@altivum.ai';
  process.env.ADMIN_ACTION_SECRET = 'test-secret';
  process.env.API_DOMAIN = 'api.clarksvilletn.ai';
  process.env.MEDIA_BUCKET = 'test-bucket';
  process.env.MEDIA_BASE_URL = 'https://media.test';
});

describe('me-profile handler', () => {
  it('returns 401 when there is no authenticated sub', async () => {
    const res = await handler({ requestContext: { http: { method: 'GET' } } });
    expect(res.statusCode).toBe(401);
  });

  it('GET scopes the lookup to the caller sub (no IDOR) and returns 404 when none exists', async () => {
    ddbMock.on(QueryCommand).resolves({ Items: [] });
    const res = await handler(authEvent('GET', { sub: 'user-A' }));
    expect(res.statusCode).toBe(404);
    const input = ddbMock.commandCalls(QueryCommand)[0].args[0].input;
    expect(input.IndexName).toBe('userSub-index');
    expect(input.ExpressionAttributeValues[':us']).toBe('user-A');
  });

  it('GET returns only the caller-owned profile via ownerView', async () => {
    ddbMock.on(QueryCommand).resolves({
      Items: [
        {
          profileId: 'p1',
          userSub: 'user-A',
          status: 'approved',
          name: 'Jane',
          email: 'jane@example.com',
          phone: '555',
          credentials: [],
          degrees: [],
          createdAt: '2026-01-01',
        },
      ],
    });
    const res = await handler(authEvent('GET', { sub: 'user-A' }));
    expect(res.statusCode).toBe(200);
    const { profile } = JSON.parse(res.body);
    expect(profile.profileId).toBe('p1');
    expect(profile.email).toBe('jane@example.com'); // owner sees own PII
  });

  it('PUT writes the record stamped with the caller sub (prevents writing another user\'s row)', async () => {
    ddbMock.on(QueryCommand).resolves({ Items: [] }); // no existing
    ddbMock.on(PutCommand).resolves({});
    const res = await handler(authEvent('PUT', { sub: 'user-A', body: validBody }));
    expect(res.statusCode).toBe(201); // created when new
    const putInput = ddbMock.commandCalls(PutCommand)[0].args[0].input;
    expect(putInput.Item.userSub).toBe('user-A');
    expect(putInput.Item.status).toBe('pending');
    expect(sesMock.commandCalls(SendEmailCommand)).toHaveLength(1);
  });

  it('PUT returns 200 (not 201) when updating an existing profile and reuses its id', async () => {
    ddbMock.on(QueryCommand).resolves({
      Items: [{ profileId: 'existing-id', userSub: 'user-A', createdAt: '2025-01-01' }],
    });
    ddbMock.on(PutCommand).resolves({});
    const res = await handler(authEvent('PUT', { sub: 'user-A', body: validBody }));
    expect(res.statusCode).toBe(200);
    const putInput = ddbMock.commandCalls(PutCommand)[0].args[0].input;
    expect(putInput.Item.profileId).toBe('existing-id');
    expect(putInput.Item.createdAt).toBe('2025-01-01'); // preserved
  });

  it('PUT falls back to the Cognito email claim when no email is supplied', async () => {
    ddbMock.on(QueryCommand).resolves({ Items: [] });
    ddbMock.on(PutCommand).resolves({});
    const { email, ...noEmail } = validBody;
    void email;
    await handler(authEvent('PUT', { sub: 'user-A', email: 'claim@example.com', body: noEmail }));
    const putInput = ddbMock.commandCalls(PutCommand)[0].args[0].input;
    expect(putInput.Item.email).toBe('claim@example.com');
  });

  it('PUT uploads a headshot to S3 when a data URI is provided', async () => {
    ddbMock.on(QueryCommand).resolves({ Items: [] });
    ddbMock.on(PutCommand).resolves({});
    s3Mock.on(PutObjectCommand).resolves({});
    const tinyPng = 'data:image/png;base64,' + Buffer.from('hello').toString('base64');
    await handler(authEvent('PUT', { sub: 'user-A', body: { ...validBody, headshotBase64: tinyPng } }));
    expect(s3Mock.commandCalls(PutObjectCommand)).toHaveLength(1);
  });

  it('PUT rejects an invalid payload (missing name) with 400', async () => {
    const res = await handler(authEvent('PUT', { sub: 'user-A', body: { credentials: [], degrees: [] } }));
    expect(res.statusCode).toBe(400);
  });

  it('PUT rejects malformed JSON with 400', async () => {
    const res = await handler({
      requestContext: { authorizer: { jwt: { claims: { sub: 'user-A' } } }, http: { method: 'PUT' } },
      body: '{not json',
    });
    expect(res.statusCode).toBe(400);
  });

  it('returns 405 for unsupported methods', async () => {
    const res = await handler(authEvent('DELETE', { sub: 'user-A' }));
    expect(res.statusCode).toBe(405);
  });

  it('PUT uploads a credential badge to S3', async () => {
    ddbMock.on(QueryCommand).resolves({ Items: [] });
    ddbMock.on(PutCommand).resolves({});
    s3Mock.on(PutObjectCommand).resolves({});
    const tinyPng = 'data:image/png;base64,' + Buffer.from('x').toString('base64');
    const body = {
      ...validBody,
      credentials: [{ issuer: 'AWS', title: 'SAA', verifyUrl: 'https://v', badgeImageBase64: tinyPng }],
    };
    await handler(authEvent('PUT', { sub: 'user-A', body }));
    expect(s3Mock.commandCalls(PutObjectCommand)).toHaveLength(1);
  });

  it('PUT returns 400 on an oversized headshot', async () => {
    ddbMock.on(QueryCommand).resolves({ Items: [] });
    const huge = 'data:image/png;base64,' + 'A'.repeat(2_800_000);
    const res = await handler(authEvent('PUT', { sub: 'user-A', body: { ...validBody, headshotBase64: huge } }));
    expect(res.statusCode).toBe(400);
  });

  it('returns 500 when the DynamoDB write fails', async () => {
    ddbMock.on(QueryCommand).resolves({ Items: [] });
    ddbMock.on(PutCommand).rejects(new Error('ddb down'));
    const res = await handler(authEvent('PUT', { sub: 'user-A', body: validBody }));
    expect(res.statusCode).toBe(500);
  });

  it('PUT mints moderation links carrying a single-use nonce (jti) and a 24h expiry', async () => {
    ddbMock.on(QueryCommand).resolves({ Items: [] });
    ddbMock.on(PutCommand).resolves({});
    await handler(authEvent('PUT', { sub: 'user-A', body: validBody }));
    const sesInput = sesMock.commandCalls(SendEmailCommand)[0].args[0].input;
    const text = sesInput.Message.Body.Text.Data;
    const match = text.match(/action=approve&token=([^\s]+)/);
    expect(match).toBeTruthy();
    const payload = JSON.parse(Buffer.from(match[1].split('.')[0], 'base64url').toString('utf8'));
    expect(typeof payload.jti).toBe('string');
    const ttl = payload.exp - Date.now();
    expect(ttl).toBeGreaterThan(23 * 60 * 60 * 1000);
    expect(ttl).toBeLessThanOrEqual(24 * 60 * 60 * 1000 + 5000);
  });

  it('PUT accepts a fully-populated profile (all optional fields + email branches)', async () => {
    ddbMock.on(QueryCommand).resolves({ Items: [] });
    ddbMock.on(PutCommand).resolves({});
    const body = {
      name: 'Jane',
      email: 'j@x.com',
      phone: '555-0100',
      city: 'Clarksville',
      headline: 'Engineer',
      bio: 'Hello there',
      linkedinUrl: 'https://linkedin.com/in/jane',
      credentials: [{ issuer: 'AWS', title: 'SAA', verifyUrl: 'https://v', issuedDate: '2024' }],
      degrees: [{ degree: 'BS', institution: 'APSU', year: 2015, focus: 'CS' }],
    };
    const res = await handler(authEvent('PUT', { sub: 'user-A', body }));
    expect(res.statusCode).toBe(201);
    const putInput = ddbMock.commandCalls(PutCommand)[0].args[0].input;
    expect(putInput.Item.degrees[0].focus).toBe('CS');
  });
});
