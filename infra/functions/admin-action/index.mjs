import { createHmac, timingSafeEqual } from 'node:crypto';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

function htmlResponse(statusCode, title, body) {
  return {
    statusCode,
    headers: { 'content-type': 'text/html; charset=utf-8' },
    body: `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${escapeHtml(title)}</title>
<style>
  body { font-family: -apple-system, Segoe UI, Inter, Roboto, system-ui, sans-serif; margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f8f9fa; color: #1e3a5f; }
  main { max-width: 480px; padding: 2rem; background: white; border-radius: 16px; box-shadow: 0 6px 24px rgba(30, 58, 95, 0.08); text-align: center; }
  h1 { margin: 0 0 0.75rem; font-weight: 600; }
  p { color: #4a5568; line-height: 1.5; margin: 0.25rem 0; }
</style></head>
<body><main><h1>${escapeHtml(title)}</h1>${body}</main></body></html>`,
  };
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function verifyAction(token, secret) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [payloadB64, sig] = token.split('.');
  if (!payloadB64 || !sig) return null;
  const expected = createHmac('sha256', secret).update(payloadB64).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (typeof payload.exp !== 'number' || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export const handler = async (event) => {
  try {
    const profileId = event.pathParameters?.profileId;
    const action = event.queryStringParameters?.action;
    const token = event.queryStringParameters?.token;

    if (!profileId || !action || !token) {
      return htmlResponse(400, 'Invalid request', '<p>Missing required parameters.</p>');
    }

    const payload = verifyAction(token, process.env.ADMIN_ACTION_SECRET);
    if (!payload) {
      return htmlResponse(401, 'Link expired or invalid', '<p>This moderation link is no longer valid.</p>');
    }
    if (payload.profileId !== profileId || payload.action !== action) {
      return htmlResponse(401, 'Link mismatch', '<p>The signature does not match this action.</p>');
    }
    if (action !== 'approve' && action !== 'reject') {
      return htmlResponse(400, 'Unknown action', '<p>Action must be approve or reject.</p>');
    }

    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    const now = new Date().toISOString();

    try {
      await ddb.send(
        new UpdateCommand({
          TableName: process.env.PROFILES_TABLE,
          Key: { profileId },
          UpdateExpression: 'SET #s = :new, #ts = :ts',
          ConditionExpression: '#s = :pending OR #s = :current',
          ExpressionAttributeNames: { '#s': 'status', '#ts': action === 'approve' ? 'approvedAt' : 'rejectedAt' },
          ExpressionAttributeValues: {
            ':new': newStatus,
            ':ts': now,
            ':pending': 'pending',
            ':current': newStatus,
          },
        }),
      );
    } catch (err) {
      if (err.name === 'ConditionalCheckFailedException') {
        return htmlResponse(409, 'Already actioned', '<p>This profile has already been approved or rejected.</p>');
      }
      throw err;
    }

    const label = action === 'approve' ? 'Approved' : 'Rejected';
    const detail =
      action === 'approve'
        ? 'The profile is now visible on the public directory.'
        : 'The profile has been marked rejected and will not appear publicly.';
    return htmlResponse(200, `Profile ${label}`, `<p>${escapeHtml(detail)}</p><p style="font-size:12px;color:#9ca3af;margin-top:1rem;">Profile ID: ${escapeHtml(profileId)}</p>`);
  } catch (err) {
    console.error(err);
    return htmlResponse(500, 'Server error', '<p>Something went wrong. Please try again.</p>');
  }
};
