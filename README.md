# Skyworth Web

Next.js 16 product catalog, RFQ capture, and admin workspace for Skyworth PV.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local`, then set the production values:

```bash
NEXT_PUBLIC_SITE_URL="https://www.skyworth-pv.com"
NEXT_PUBLIC_SALES_EMAIL="sales@skyworth-pv.com"
ADMIN_PASSWORD="use-a-strong-password"
ADMIN_SESSION_SECRET="use-at-least-32-random-characters"
```

Admin routes are disabled until both `ADMIN_PASSWORD` and
`ADMIN_SESSION_SECRET` are configured.

## Checks

```bash
npm run lint
npm run test
npm run build
```

## Data

Products are stored in `src/data/products.json`. Leads are persisted in
`src/data/leads.json` so RFQ submissions survive server restarts.

## Production Notes

Set real contact details, SendGrid credentials, GA4 credentials, Cloudinary
credentials, and the canonical site URL in the deployment environment. The
site generates `robots.txt`, `sitemap.xml`, canonical metadata, Open Graph
metadata, and product JSON-LD from the configured values.
