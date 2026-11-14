# OAGITECH website

Next.js 16 (App Router) + Tailwind CSS 4 site for OAGITECH — Oil & Gas Inspection Technology.

## Develop

```bash
npm install
npm run dev
```

## Deploy on Vercel

1. Import this repository in Vercel. The framework preset is detected as **Next.js**; leave the build command (`next build`) and output settings at their defaults.
2. Optional: set `NEXT_PUBLIC_SITE_URL` (for example `https://oagitech.com`) if the site runs on a domain other than oagitech.com. It is used for canonical URLs, the sitemap and social previews.
3. Add the custom domain in **Project → Settings → Domains**.

Preview deployments are kept out of search engines automatically (`app/robots.ts`); only production is indexed.

## Content

- `data/pages.json` — every service, training, calibration, diving and about page carried over from the old WordPress site.
- `data/catalog.ts` — categories, navigation menu and page hero photos.
- `data/site.ts` — homepage content.
- Old WordPress URLs redirect permanently to the new routes (see `next.config.ts`).

Photos in `public/photos` are Unsplash stock (free licence) used as placeholders; `public/old` holds images from the old site.
