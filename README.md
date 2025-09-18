# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/dbcb82db-3a5c-4d43-86a6-c004351ecb04

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/dbcb82db-3a5c-4d43-86a6-c004351ecb04) and start prompting.

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

Simply open [Lovable](https://lovable.dev/projects/dbcb82db-3a5c-4d43-86a6-c004351ecb04) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Deployment Tips

### CDN Cache Purging

When deploying to production, you may need to purge the CDN cache to ensure fresh content is served:

1. **Vercel Cache Purging**: Go to your Vercel deployment page and click "Purge Cache" to clear cached static assets
2. **Manual Cache Busting**: All JSON endpoints use automatic cache-busting parameters to prevent stale data

### Environment Variables

For optimal cache busting and debugging:

1. **NEXT_PUBLIC_BUILD_ID**: Set this to the latest commit SHA in your Vercel environment variables
   - Go to Project Settings > Environment Variables
   - Add `NEXT_PUBLIC_BUILD_ID` with value `$VERCEL_GIT_COMMIT_SHA`
   - This ensures unique cache-busting parameters for each deployment

2. **NEXT_PUBLIC_SHOW_DATA_BADGE**: Set to `true` to show debug information about data sources
   - Useful for development and debugging
   - Default: `false` (hidden in production)

### How to Fix Common CI Failures

- **TypeScript errors**: Run `npm run typecheck` locally to catch type issues
- **Linting errors**: Run `npm run lint` locally and fix reported issues
- **Build failures**: Run `npm run build` locally to test the build process
- **Missing dependencies**: Run `npm install` to ensure all dependencies are installed
