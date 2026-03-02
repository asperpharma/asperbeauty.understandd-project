# Deployment Template & Guide

## Purpose

This template provides a comprehensive guide for deploying the Asper Beauty Shop application, including pre-deployment checks, deployment procedures, and post-deployment verification.

## Pre-Deployment Checklist

Before deploying to production, ensure all items are completed:

### Code Quality
- [ ] All tests pass locally
- [ ] Linting passes with no errors
- [ ] Build completes successfully
- [ ] No console errors or warnings
- [ ] Code review completed and approved

### Design System Compliance
- [ ] All UI changes follow [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md)
- [ ] Color palette matches brand guidelines (no pure #FFF or #000)
- [ ] Typography uses approved fonts (Playfair Display, Montserrat, Tajawal)
- [ ] Spacing and layout follow clinical luxury aesthetic

### Functionality
- [ ] All new features tested manually
- [ ] Cross-browser compatibility verified
- [ ] Mobile responsiveness checked
- [ ] Performance impact assessed
- [ ] Accessibility standards met

### Integration Points
- [ ] Supabase connections tested
- [ ] Shopify catalog integration verified
- [ ] External API calls functional
- [ ] Environment variables configured

### Documentation
- [ ] README updated if needed
- [ ] API documentation current
- [ ] Component documentation added
- [ ] CHANGELOG updated

## Deployment Process

### Step 1: Prepare Release Branch

```bash
# Ensure you're on main and up to date
git checkout main
git pull origin main

# Create release branch (optional, for staging review)
git checkout -b release/YYYY-MM-DD-description
```

### Step 2: Final Verification

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Step 3: Merge to Main

```bash
# If using release branch, create PR to main
# Once approved, merge to main
git checkout main
git merge release/YYYY-MM-DD-description
git push origin main
```

### Step 4: Monitor Deployment

1. **Lovable Auto-Deploy**
   - Lovable automatically detects push to `main`
   - Deployment begins immediately
   - Monitor at: https://lovable.dev/projects/657fb572-13a5-4a3e-bac9-184d39fdf7e6

2. **GitHub Actions**
   - Go to repository → Actions tab
   - Watch "Deploy health check" workflow
   - Verify all steps complete successfully

## Post-Deployment Verification

### Automated Health Check

The `deploy-health-check.yml` workflow automatically:
1. Waits 120 seconds for deployment
2. Pings `https://asperbeautyshop-com.lovable.app/health`
3. Verifies 200 response
4. Sends Discord notification (if configured)

### Manual Verification Checklist

Verify the following on the live site:

#### Critical Paths
- [ ] Homepage loads correctly
- [ ] Navigation works across all pages
- [ ] Product catalog displays properly
- [ ] Search functionality works
- [ ] Cart operations function
- [ ] Checkout process completes

#### User Experience
- [ ] No visual regressions
- [ ] Animations and transitions smooth
- [ ] Forms validate correctly
- [ ] Error messages display properly
- [ ] Loading states work

#### Performance
- [ ] Page load time acceptable (< 3s)
- [ ] No JavaScript errors in console
- [ ] Images load and display correctly
- [ ] API calls complete successfully

#### Brand & Design
- [ ] Color scheme matches brand guidelines
- [ ] Fonts load and display correctly
- [ ] Spacing and layout proper
- [ ] Clinical luxury aesthetic maintained

## Rollback Procedure

If critical issues are discovered post-deployment:

### Quick Rollback via Lovable

1. Go to Lovable project dashboard
2. Navigate to deployment history
3. Select previous stable deployment
4. Click "Redeploy" or "Rollback"

### Rollback via Git

```bash
# Identify the last good commit
git log --oneline

# Create revert commit
git revert <commit-hash>

# Push to trigger new deployment
git push origin main
```

### Hotfix Process

For urgent fixes without full rollback:

```bash
# Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/description

# Make minimal fix
# Test thoroughly
# Create PR with "HOTFIX" label

# After approval, merge immediately
git checkout main
git merge hotfix/description
git push origin main
```

## Environment Configuration

### Required Secrets

Ensure these are configured in GitHub repository settings:

#### Lovable Integration
- `LOVABLE_WEBHOOK_URL` - For file change synchronization
- Lovable project URL: https://lovable.dev/projects/657fb572-13a5-4a3e-bac9-184d39fdf7e6

#### Optional Notifications
- `DISCORD_WEBHOOK_URL` - For deployment notifications

### Environment Variables

Production environment variables should be configured in:
- Lovable project settings (for build-time variables)
- Supabase dashboard (for database configuration)

Key variables to verify:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- Any Shopify API credentials
- External service endpoints

## Monitoring & Observability

### Health Endpoint

Implement a `/health` endpoint that returns:

```json
{
  "status": "ok",
  "timestamp": "2026-03-02T05:56:00Z",
  "version": "1.0.0",
  "services": {
    "database": "connected",
    "api": "available"
  }
}
```

### Deployment History

Track deployments in:
1. GitHub Actions workflow runs
2. Lovable deployment dashboard
3. Internal deployment log (if maintained)

### Error Monitoring

Monitor for:
- 404 errors (broken links)
- 500 errors (server issues)
- JavaScript console errors
- Failed API calls
- Performance degradation

## Best Practices

### Deployment Timing
- **Recommended**: Deploy during low-traffic periods
- **Avoid**: Peak shopping hours, major promotions
- **Coordinate**: Notify team before major deployments

### Communication
- Announce deployments in team channels
- Document changes in deployment notes
- Share rollback plan if deploying risky changes

### Testing
- Never deploy without testing
- Use staging environment when available
- Perform smoke tests after deployment

### Documentation
- Keep CHANGELOG updated
- Document breaking changes
- Update API documentation
- Record lessons learned

## Deployment Cadence

### Recommended Schedule
- **Daily**: Minor updates, bug fixes
- **Weekly**: Feature releases
- **Monthly**: Major updates, refactors

### Emergency Deployments
- Critical security fixes: Deploy immediately
- Data loss prevention: Deploy ASAP
- Minor bugs: Can wait for next scheduled deployment

## Support & Escalation

### During Deployment Issues

1. **Check Logs**
   - GitHub Actions workflow logs
   - Lovable deployment logs
   - Browser console errors

2. **Verify Services**
   - Supabase status
   - Shopify API availability
   - External dependencies

3. **Escalation Path**
   - Level 1: Developer who deployed
   - Level 2: Senior team member
   - Level 3: Project lead
   - Level 4: External support (Lovable, Supabase)

## Additional Resources

- [APPLY_TO_MAIN_SITE.md](../APPLY_TO_MAIN_SITE.md) - Main site deployment checklist
- [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) - Design guidelines
- [MAIN_PROJECT.md](../MAIN_PROJECT.md) - Project overview and integrations
- [NEXT_STEPS.md](../NEXT_STEPS.md) - Quick deployment flow reference

---

**Last Updated**: March 2026  
**Maintained By**: Asper Beauty Shop Development Team  
**Contact**: See [MAIN_PROJECT.md](../MAIN_PROJECT.md) for team contacts
