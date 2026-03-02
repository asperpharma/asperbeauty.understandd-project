# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Quick Deploy

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

### Automated Deployment Flow

This project uses an automated deployment pipeline:

1. **Push to Main**: When code is merged to the `main` branch, Lovable automatically deploys the changes
2. **Health Check**: GitHub Actions runs a post-deployment health check after 120 seconds
3. **Verification**: The workflow pings the `/health` endpoint to verify the deployment succeeded
4. **Notifications**: Optional Discord notifications for deployment status

### Deployment Documentation

For comprehensive deployment guides and best practices, see:
- [NEXT_STEPS.md](./NEXT_STEPS.md) - Quick reference for deployment flow and next steps
- [docs/DEPLOYMENT_TEMPLATE.md](./docs/DEPLOYMENT_TEMPLATE.md) - Complete deployment guide with checklists
- [APPLY_TO_MAIN_SITE.md](./APPLY_TO_MAIN_SITE.md) - Pre-deployment verification checklist

### Monitoring

After deployment, monitor:
- **Live Site**: https://asperbeautyshop-com.lovable.app/
- **GitHub Actions**: Check workflow runs for health check results
- **Lovable Dashboard**: https://lovable.dev/projects/657fb572-13a5-4a3e-bac9-184d39fdf7e6

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
