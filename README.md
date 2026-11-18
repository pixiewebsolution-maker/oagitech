# OAGITECH website

Next.js 16 (App Router) + Tailwind CSS 4 site for OAGITECH, Oil & Gas Inspection Technology.

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

- `data/services.ts`: service divisions and pages. Service names and codes follow the OAGITECH master lists.
- `data/training.ts`: the eight training categories, 109 coded courses, delivery methods and regions.
- `data/about.ts`: About, Certifications and Careers pages.
- `data/catalog.ts`: navigation menus, hub pages and route lookup.
- `data/site.ts`: homepage wording.
- `data/redirects.ts`: old WordPress URLs and the new page each one redirects to.

Photos in `public/photos` are Unsplash stock (free licence) used as placeholders until OAGITECH supplies its own.
