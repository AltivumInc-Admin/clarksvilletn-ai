// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { handler } from './index.mjs';

const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
  ddbMock.reset();
  process.env.PROFILES_TABLE = 'test-profiles';
  process.env.SITE_ORIGIN = 'https://clarksvilletn.ai';
});

describe('list-profiles handler', () => {
  it('returns approved profiles with PII (email/phone/sourceIp) stripped', async () => {
    ddbMock.on(QueryCommand).resolves({
      Items: [
        {
          profileId: 'p1',
          name: 'Jane Doe',
          city: 'Clarksville',
          headline: 'Cloud Engineer',
          bio: 'Bio',
          linkedinUrl: 'https://linkedin.com/in/jane',
          headshotUrl: 'https://img/headshots/p1.jpg',
          credentials: [],
          degrees: [],
          approvedAt: '2026-01-01T00:00:00.000Z',
          status: 'approved',
          email: 'jane@example.com',
          phone: '555-0100',
          sourceIp: '203.0.113.7',
        },
      ],
    });

    const res = await handler();
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.profiles).toHaveLength(1);
    const p = body.profiles[0];
    expect(p.name).toBe('Jane Doe');
    expect(p.email).toBeUndefined();
    expect(p.phone).toBeUndefined();
    expect(p.sourceIp).toBeUndefined();
    expect(p.status).toBeUndefined();
  });

  it('coerces missing credentials/degrees arrays to empty arrays', async () => {
    ddbMock.on(QueryCommand).resolves({ Items: [{ profileId: 'p2', name: 'No Lists' }] });
    const res = await handler();
    const p = JSON.parse(res.body).profiles[0];
    expect(p.credentials).toEqual([]);
    expect(p.degrees).toEqual([]);
  });

  it('queries the status-createdAt-index for approved, newest first', async () => {
    ddbMock.on(QueryCommand).resolves({ Items: [] });
    await handler();
    const input = ddbMock.commandCalls(QueryCommand)[0].args[0].input;
    expect(input.IndexName).toBe('status-createdAt-index');
    expect(input.ScanIndexForward).toBe(false);
    expect(input.ExpressionAttributeValues[':approved']).toBe('approved');
  });

  it('handles an empty result set', async () => {
    ddbMock.on(QueryCommand).resolves({});
    const res = await handler();
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body).profiles).toEqual([]);
  });

  it('returns 500 with CORS headers when the query throws', async () => {
    ddbMock.on(QueryCommand).rejects(new Error('boom'));
    const res = await handler();
    expect(res.statusCode).toBe(500);
    expect(res.headers['access-control-allow-origin']).toBe('https://clarksvilletn.ai');
    expect(JSON.parse(res.body).message).toMatch(/unable to list/i);
  });
});
