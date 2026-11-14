// Canonical site address. Set NEXT_PUBLIC_SITE_URL in Vercel if the site runs on a different domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://oagitech.com").replace(/\/$/, "");
