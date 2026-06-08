/**
 * One-time migration for the S3 -> CloudFront (OAC) media cutover.
 *
 * The media bucket is now private and served via CloudFront, so existing profile
 * records still holding the old `https://<bucket>.s3.<region>.amazonaws.com/...`
 * URLs will 403. This script rewrites stored `headshotUrl` and each
 * `credentials[].badgeImageUrl` from the old S3 base to the new CloudFront base.
 *
 * Dry-run by default; pass --apply to write. Idempotent (already-migrated URLs
 * are left untouched), so it is safe to re-run.
 *
 * Usage:
 *   OLD_MEDIA_BASE_URL=https://ai-ready-clarksville-media.s3.us-east-1.amazonaws.com \
 *   NEW_MEDIA_BASE_URL=https://<dist>.cloudfront.net \
 *   PROFILES_TABLE=ai-ready-profiles AWS_REGION=us-east-1 \
 *   node infra/scripts/migrate-media-urls.mjs           # dry run
 *   node infra/scripts/migrate-media-urls.mjs --apply   # write changes
 *
 * Tip: read NEW_MEDIA_BASE_URL from the stack's MediaCdnDomain output.
 */
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

export function rewriteUrl(url, oldBase, newBase) {
  if (typeof url !== 'string') return url;
  if (!url.startsWith(oldBase)) return url;
  return newBase + url.slice(oldBase.length);
}

export function rewriteItem(item, oldBase, newBase) {
  const headshotUrl = rewriteUrl(item.headshotUrl, oldBase, newBase);
  const credentials = Array.isArray(item.credentials)
    ? item.credentials.map((c) =>
        c && typeof c === 'object' && typeof c.badgeImageUrl === 'string'
          ? { ...c, badgeImageUrl: rewriteUrl(c.badgeImageUrl, oldBase, newBase) }
          : c,
      )
    : item.credentials;

  const headshotChanged = headshotUrl !== item.headshotUrl;
  const credentialsChanged =
    Array.isArray(item.credentials) &&
    item.credentials.some((c, i) => c?.badgeImageUrl !== credentials[i]?.badgeImageUrl);

  return {
    changed: headshotChanged || credentialsChanged,
    headshotChanged,
    credentialsChanged,
    headshotUrl,
    credentials,
  };
}

async function main() {
  const TABLE = process.env.PROFILES_TABLE || 'ai-ready-profiles';
  const oldBase = process.env.OLD_MEDIA_BASE_URL;
  const newBase = process.env.NEW_MEDIA_BASE_URL;
  const apply = process.argv.includes('--apply');

  if (!oldBase || !newBase) {
    console.error('Set OLD_MEDIA_BASE_URL and NEW_MEDIA_BASE_URL environment variables.');
    process.exit(1);
  }

  const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
  let scanned = 0;
  let changed = 0;
  let ExclusiveStartKey;

  console.log(`${apply ? 'APPLYING' : 'DRY RUN'} — table=${TABLE}`);
  console.log(`  ${oldBase}  ->  ${newBase}\n`);

  do {
    const res = await ddb.send(new ScanCommand({ TableName: TABLE, ExclusiveStartKey }));
    for (const item of res.Items ?? []) {
      scanned++;
      const r = rewriteItem(item, oldBase, newBase);
      if (!r.changed) continue;
      changed++;
      console.log(`  ${apply ? 'update' : 'would update'} ${item.profileId}`);

      if (apply) {
        const sets = [];
        const names = {};
        const values = {};
        if (r.headshotChanged) {
          sets.push('#h = :h');
          names['#h'] = 'headshotUrl';
          values[':h'] = r.headshotUrl;
        }
        if (r.credentialsChanged) {
          sets.push('#c = :c');
          names['#c'] = 'credentials';
          values[':c'] = r.credentials;
        }
        await ddb.send(
          new UpdateCommand({
            TableName: TABLE,
            Key: { profileId: item.profileId },
            UpdateExpression: `SET ${sets.join(', ')}`,
            ExpressionAttributeNames: names,
            ExpressionAttributeValues: values,
          }),
        );
      }
    }
    ExclusiveStartKey = res.LastEvaluatedKey;
  } while (ExclusiveStartKey);

  console.log(
    `\nScanned ${scanned}; ${changed} ${apply ? 'updated' : 'to update'}.` +
      (apply ? '' : ' Re-run with --apply to write.'),
  );
}

// Run main() only when executed directly, not when imported by tests.
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
