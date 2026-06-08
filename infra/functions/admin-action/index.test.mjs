// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest';
import { createHmac, randomUUID } from 'node:crypto';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { handler } from './index.mjs';

const ddbMock = mockClient(DynamoDBDocumentClient);
const SECRET = 'test-secret';

function sign(profileId, action, { secret = SECRET, exp = Date.now() + 60_000, jti = randomUUID() } = {}) {
  const payload = { profileId, action, exp, jti };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', secret).update(payloadB64).digest('base64url');
  return `${payloadB64}.${sig}`;
}

function event(profileId, action, token, method = 'POST') {
  return {
    pathParameters: { profileId },
    queryStringParameters: { action, token },
    requestContext: { http: { method } },
  };
}

beforeEach(() => {
  ddbMock.reset();
  process.env.PROFILES_TABLE = 'test-profiles';
  process.env.ADMIN_ACTION_SECRET = SECRET;
});

describe('admin-action handler', () => {
  describe('GET (confirmation page — must NOT mutate, defeats email link scanners)', () => {
    it('renders a POST confirmation form for a valid token without mutating', async () => {
      const token = sign('p1', 'approve');
      const res = await handler(event('p1', 'approve', token, 'GET'));
      expect(res.statusCode).toBe(200);
      expect(res.body.toLowerCase()).toContain('method="post"');
      expect(res.body.toLowerCase()).toContain('approve');
      // Crucially: a GET (what scanners/prefetchers issue) performs no write.
      expect(ddbMock.commandCalls(UpdateCommand)).toHaveLength(0);
    });

    it('returns 401 on a GET with an invalid token (no form shown)', async () => {
      const token = sign('p1', 'approve', { exp: Date.now() - 1000 });
      const res = await handler(event('p1', 'approve', token, 'GET'));
      expect(res.statusCode).toBe(401);
      expect(ddbMock.commandCalls(UpdateCommand)).toHaveLength(0);
    });
  });

  describe('POST (performs the action)', () => {
    it('approves with a valid token and sets status + single-use nonce', async () => {
      ddbMock.on(UpdateCommand).resolves({});
      const jti = 'nonce-1';
      const token = sign('p1', 'approve', { jti });
      const res = await handler(event('p1', 'approve', token));
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatch(/Approved/);
      const input = ddbMock.commandCalls(UpdateCommand)[0].args[0].input;
      expect(input.ExpressionAttributeValues[':new']).toBe('approved');
      // single-use: records the nonce and guards against replaying it
      expect(input.ExpressionAttributeValues[':jti']).toBe(jti);
      expect(input.UpdateExpression).toMatch(/moderationJti/);
      expect(input.ConditionExpression).toMatch(/moderationJti/);
    });

    it('rejects with a valid reject token', async () => {
      ddbMock.on(UpdateCommand).resolves({});
      const res = await handler(event('p1', 'reject', sign('p1', 'reject')));
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatch(/Rejected/);
    });

    it('returns 409 when the link was already used (conditional check / replay)', async () => {
      const err = new Error('conditional');
      err.name = 'ConditionalCheckFailedException';
      ddbMock.on(UpdateCommand).rejects(err);
      const res = await handler(event('p1', 'approve', sign('p1', 'approve')));
      expect(res.statusCode).toBe(409);
    });

    it('returns 400 when required params are missing', async () => {
      const res = await handler({ pathParameters: {}, queryStringParameters: {}, requestContext: { http: { method: 'POST' } } });
      expect(res.statusCode).toBe(400);
    });

    it('returns 401 for an expired token', async () => {
      const token = sign('p1', 'approve', { exp: Date.now() - 1000 });
      const res = await handler(event('p1', 'approve', token));
      expect(res.statusCode).toBe(401);
      expect(ddbMock.commandCalls(UpdateCommand)).toHaveLength(0);
    });

    it('returns 401 for a tampered signature', async () => {
      const token = sign('p1', 'approve');
      const tampered = token.slice(0, -2) + (token.endsWith('aa') ? 'bb' : 'aa');
      const res = await handler(event('p1', 'approve', tampered));
      expect(res.statusCode).toBe(401);
    });

    it('returns 401 when signed with a different secret', async () => {
      const res = await handler(event('p1', 'approve', sign('p1', 'approve', { secret: 'other' })));
      expect(res.statusCode).toBe(401);
    });

    it('returns 401 when the path profileId does not match the signed profileId', async () => {
      const res = await handler(event('different-id', 'approve', sign('p1', 'approve')));
      expect(res.statusCode).toBe(401);
      expect(res.body).toMatch(/mismatch/i);
    });

    it('returns 401 when the action does not match the signed action', async () => {
      const res = await handler(event('p1', 'reject', sign('p1', 'approve')));
      expect(res.statusCode).toBe(401);
    });

    it('returns 401 for a legacy token without a single-use nonce (jti)', async () => {
      // Tokens minted before hardening have no jti and must be refused.
      const payload = { profileId: 'p1', action: 'approve', exp: Date.now() + 60_000 };
      const b64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
      const sig = createHmac('sha256', SECRET).update(b64).digest('base64url');
      const res = await handler(event('p1', 'approve', `${b64}.${sig}`));
      expect(res.statusCode).toBe(401);
    });

    it('escapes the profileId in the HTML response (no raw injection)', async () => {
      ddbMock.on(UpdateCommand).resolves({});
      const xssId = '<script>alert(1)</script>';
      const res = await handler(event(xssId, 'approve', sign(xssId, 'approve')));
      expect(res.body).not.toContain('<script>alert(1)</script>');
      expect(res.body).toContain('&lt;script&gt;');
    });
  });
});
