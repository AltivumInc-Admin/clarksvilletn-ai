# AI-Ready Clarksville — Backend (SAM)

Serverless API that powers the AI-Ready Clarksville directory.

## Stack

- API Gateway HTTP API (custom domain: `api.clarksvilletn.ai`)
- Three Lambda functions (Node 20, arm64)
  - `submit-profile` — `POST /profiles` (Turnstile-gated, S3 upload, DDB write, SES review email)
  - `list-profiles` — `GET /profiles` (approved profiles, newest first)
  - `admin-action` — `GET /admin/profiles/{profileId}/action` (HMAC-signed approve/reject links)
- DynamoDB `Profiles` table with GSI `status-createdAt-index`
- S3 media bucket for headshots (public-read)
- SES email to `admin@altivum.ai` for new submissions

## Prerequisites (one-time, out of band)

Before `sam deploy` will succeed, the operator needs to provision:

1. **Cloudflare Turnstile site + secret keys** — create a site for `clarksvilletn.ai`, copy both keys. The site key goes in the Amplify frontend env var `VITE_TURNSTILE_SITE_KEY`; the secret goes to the SAM stack as `TurnstileSecretKey`.
2. **ACM certificate for `api.clarksvilletn.ai`** — request a public cert in the same region as the API (currently `us-east-1`). Validate via DNS. Copy the ARN for `ApiCertificateArn`.
3. **DNS CNAME** — after the first deploy, point `api.clarksvilletn.ai` at the API Gateway regional domain. Look it up with:
   ```
   aws apigatewayv2 get-domain-name --domain-name api.clarksvilletn.ai \
     --query 'DomainNameConfigurations[0].ApiGatewayDomainName' --output text
   ```
4. **SES sender verification** — verify `admin@altivum.ai` as a sender identity. If the account is still in the SES sandbox, verify it as a recipient as well.
5. **Admin action secret** — generate a long random string (≥ 32 bytes) for `AdminActionSecret`. This signs the approve/reject email links. Store it in your secrets manager of choice; redeploying with a new value invalidates all outstanding links.

## Parameters

| Parameter | Default | Notes |
|---|---|---|
| `ApiDomainName` | `api.clarksvilletn.ai` | |
| `ApiCertificateArn` | — | ACM cert for the domain above |
| `SiteOrigin` | `https://clarksvilletn.ai` | CORS allow-list (apex) |
| `SiteOriginWww` | `https://www.clarksvilletn.ai` | CORS allow-list (www) |
| `TurnstileSecretKey` | — | `NoEcho` |
| `AdminEmail` | `admin@altivum.ai` | SES sender + recipient |
| `AdminActionSecret` | — | `NoEcho`, HMAC key |
| `MediaBucketName` | `ai-ready-clarksville-media` | Must be globally unique |

## Deploy

```bash
cd infra
sam build
sam deploy --guided   # first time only
# subsequent deploys:
sam deploy
```

Capture outputs:
```bash
aws cloudformation describe-stacks --stack-name ai-ready-clarksville \
  --query 'Stacks[0].Outputs'
```

## Wire the frontend

After the stack is up, set in Amplify → App settings → Environment variables:

```
VITE_API_BASE_URL=https://api.clarksvilletn.ai
VITE_TURNSTILE_SITE_KEY=<site key from Cloudflare>
```

Trigger a rebuild in Amplify for the variables to take effect.

## Moderation flow

1. Visitor completes Turnstile, submits `POST /profiles`.
2. Lambda uploads headshot to S3, writes `status=pending` row to DDB, sends SES email.
3. Email contains two signed URLs (3-day TTL): approve and reject.
4. Clicking either hits `admin-action`, which verifies the HMAC + exp, updates the row, and returns a styled HTML confirmation page.
5. The approved profile appears on the public `GET /profiles` response (cached 60s by browser).

Links are idempotent — clicking approve twice still renders "Approved"; the conditional write only transitions from `pending` or from the same target state.

## Operational notes

- **Throttling** — HTTP API stage is capped at 10 rps / 25 burst.
- **Payload cap** — submit-profile validates headshot at 2 MB. API Gateway's own hard limit is 10 MB.
- **PITR** — enabled on the Profiles table.
- **Rotating the admin secret** — redeploy with a new `AdminActionSecret`; any outstanding approve/reject email links are invalidated immediately.
- **Removing a profile after approval** — there is no admin UI. Run an `aws dynamodb update-item` to set `status=rejected`, or delete the row outright.
