import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

function corsHeaders() {
  return {
    'access-control-allow-origin': process.env.SITE_ORIGIN ?? '',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    vary: 'origin',
    'cache-control': 'public, max-age=60',
  };
}

function publicView(item) {
  return {
    profileId: item.profileId,
    name: item.name,
    city: item.city,
    headline: item.headline,
    bio: item.bio,
    linkedinUrl: item.linkedinUrl,
    headshotUrl: item.headshotUrl,
    credentials: Array.isArray(item.credentials) ? item.credentials : [],
    degrees: Array.isArray(item.degrees) ? item.degrees : [],
    approvedAt: item.approvedAt,
  };
}

export const handler = async () => {
  try {
    const res = await ddb.send(
      new QueryCommand({
        TableName: process.env.PROFILES_TABLE,
        IndexName: 'status-createdAt-index',
        KeyConditionExpression: '#s = :approved',
        ExpressionAttributeNames: { '#s': 'status' },
        ExpressionAttributeValues: { ':approved': 'approved' },
        ScanIndexForward: false,
      }),
    );
    const profiles = (res.Items ?? []).map(publicView);
    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json', ...corsHeaders() },
      body: JSON.stringify({ profiles }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json', ...corsHeaders() },
      body: JSON.stringify({ message: 'Unable to list profiles.' }),
    };
  }
};
