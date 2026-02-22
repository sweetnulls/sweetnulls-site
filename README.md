# Sweet Nulls - Custom Magazine Site

A luxury editorial website that automatically pulls content from the Sweet Nulls Substack RSS feed.

## Quick Start (Local Development)

```bash
npm install
npm run dev
```

Visit `http://localhost:4321` to see your site.

## Deploy to Vercel (Step by Step)

### 1. Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create an account)
2. Click the **+** in the top right, then **New repository**
3. Name it `sweetnulls-site`
4. Keep it **Private**
5. Click **Create repository**

### 2. Push This Code to GitHub

Open a terminal in this project folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sweetnulls-site.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 3. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click **Add New** > **Project**
3. Find and select your `sweetnulls-site` repository
4. Vercel will auto-detect it as an Astro project
5. Click **Deploy**
6. Wait ~60 seconds. Your site is live!

### 4. Connect Your Domain (sweetnulls.com)

1. In Vercel, go to your project **Settings** > **Domains**
2. Type `sweetnulls.com` and click **Add**
3. Vercel will show you DNS records to add. You have two options:

**Option A: Change nameservers (recommended)**
- Go to your domain registrar (wherever you bought sweetnulls.com)
- Change the nameservers to the ones Vercel provides
- This gives Vercel full control and auto-configures everything

**Option B: Add DNS records manually**
- At your domain registrar, add the records Vercel shows you:
  - An `A` record pointing to `76.76.21.21`
  - A `CNAME` record for `www` pointing to `cname.vercel-dns.com`

4. Wait 5-30 minutes for DNS to propagate
5. Vercel will auto-provision an SSL certificate (HTTPS)

### 5. Auto-Rebuild When You Publish on Substack

To make the site rebuild automatically when you publish a new Substack post:

1. In Vercel, go to **Settings** > **Git** > **Deploy Hooks**
2. Create a hook named `substack-publish`, branch `main`
3. Copy the webhook URL
4. Set up a free cron job at [cron-job.org](https://cron-job.org):
   - URL: paste the Vercel webhook URL
   - Schedule: Every 15 minutes (or every hour)
   - Method: POST

This will rebuild your site periodically, picking up any new Substack posts.

## How It Works

- **Astro** builds a static site at deploy time
- **rss-parser** fetches your Substack RSS feed during the build
- Posts are rendered into the magazine layout with their titles, excerpts, and featured images
- The site is pure HTML/CSS/JS with zero client-side frameworks (fast!)
- Vercel hosts it for free with CDN and SSL

## Customization

- **Styles**: Edit `src/styles/global.css` for colors, fonts, spacing
- **Layout**: Edit `src/pages/index.astro` for the page structure
- **Feed URL**: Edit `src/lib/feed.ts` to change the Substack URL
- **Navigation categories**: Edit `src/layouts/Base.astro`
