# Next Steps: Deployment Flow

This document outlines the deployment flow and next steps for the Asper Beauty Shop project.

## Overview

The project uses Lovable for automated deployments with GitHub Actions for health checks and file synchronization.

## Deployment Flow

1. **Code Changes**
   - Make changes to the codebase
   - Commit changes to a feature branch
   - Push to GitHub

2. **Pull Request & Review**
   - Create a pull request to `main` branch
   - Code review and approval
   - Merge to `main`

3. **Automated Deployment**
   - Lovable automatically deploys from `main` branch
   - Deployment typically completes within 2-5 minutes
   - Live site: https://asperbeautyshop-com.lovable.app/

4. **Health Check**
   - GitHub Actions workflow runs automatically after push to `main`
   - Waits 120 seconds for Lovable deployment
   - Checks `/health` endpoint for 200 response
   - Optional: Discord notification with status

## Health Check Endpoint

The application should implement a `/health` endpoint that returns:
- HTTP 200 status for successful health check
- JSON response with status information (optional)

Example implementation (in React Router):
```typescript
{
  path: '/health',
  element: <HealthCheck />
}
```

## Next Steps for Developers

### 1. Verify Health Endpoint
- Ensure `/health` route is implemented
- Test locally: `http://localhost:5173/health`
- Verify returns 200 status

### 2. Configure Discord Notifications (Optional)
- Go to GitHub repository → Settings → Secrets and variables → Actions
- Add `DISCORD_WEBHOOK_URL` secret
- Get webhook URL from Discord server settings

### 3. Configure Lovable Webhook (Optional)

The `LOVABLE_WEBHOOK_URL` secret enables three GitHub Actions workflows to stay in sync with Lovable:
- `deploy-health-check.yml` — notifies Lovable after each deployment
- `sync-file-changes-to-lovable.yml` — forwards file-change lists on every push
- `sync-issues-prs-to-lovable.yml` — forwards issue and PR events

All three workflows skip gracefully (exit 0) when the secret is absent, so CI will not fail if you choose not to configure it.

**Step 1 — Obtain the webhook URL**
1. Open the Lovable project dashboard:
   `https://lovable.dev/projects/657fb572-13a5-4a3e-bac9-184d39fdf7e6`
   *(This project ID is also documented in `CLAUDE.md` as the canonical reference — keep the two in sync if the project is ever recreated.)*
2. Go to **Settings → Integrations → GitHub**
3. Copy the webhook URL shown there

**Step 2 — Set the variable**

*For local development:*
Add to your `.env` file (already in `.gitignore`, never commit real values):
```
LOVABLE_WEBHOOK_URL=https://your.real.lovable.webhook/endpoint
```
A placeholder entry is in `env.main-site.example` as a reminder.

*For GitHub Actions (production/CI):*
1. Go to the repository → **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Name: `LOVABLE_WEBHOOK_URL`
4. Value: the webhook URL from Step 1

**Step 3 — Verify integration**
- Push a commit to any branch and check the **Actions** tab
- The `Sync File Changes to Lovable` job should complete successfully and log a masked URL confirmation
- For the deploy health check, push to `main` and confirm the `Notify Lovable webhook` step shows `200` or no error

**Step 4 — Troubleshoot**
- **"skipping Lovable sync" warning** — The secret is not set; follow Step 2 above
- **`curl` returns non-2xx** — Confirm the URL is current; regenerate it in the Lovable dashboard if needed
- **"does not appear to be a valid URL" error** — The secret value is malformed; ensure it starts with `https://`
- Check raw logs in GitHub Actions → the run → the failing step for the full `curl` error message

### 4. Monitor Deployments
- Check GitHub Actions tab for workflow runs
- Review deployment logs
- Verify health check results

### 5. Troubleshooting

**Health check fails:**
- Verify `/health` endpoint exists and returns 200
- Check Lovable deployment logs
- Ensure deployment completed before health check runs
- Adjust wait time in workflow if needed (currently 120s)

**Deployment doesn't trigger:**
- Verify changes were merged to `main` branch
- Check GitHub Actions is enabled for repository
- Review workflow file permissions
- `.github/workflows/deploy-health-check.yml` - Post-deployment

## Additional Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [DEPLOYMENT_TEMPLATE.md](./docs/DEPLOYMENT_TEMPLATE.md) - Detailed deployment guide
- [APPLY_TO_MAIN_SITE.md](./APPLY_TO_MAIN_SITE.md) - Pre-deployment checklist

## Workflow Files
 health verification
- `.github/workflows/sync-file-changes-to-lovable.yml` - File change synchronization
- `.github/workflows/sync-issues-prs-to-lovable.yml` - Issue and PR synchronization

## Contact & Support

For deployment issues or questions:
1. Check workflow logs in GitHub Actions
2. Review Lovable dashboard
3. Consult team documentation in `/docs`
4. Reference [MAIN_PROJECT.md](./MAIN_PROJECT.md) for integration details
