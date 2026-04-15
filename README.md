# Enatable Digital Menu (QR-first)

A fast static web app for a Lebanese restaurant menu, optimized for mobile scanning via QR code.

## Features
- Arabic digital menu with categories and prices.
- Photo for each item (default placeholder can be replaced from admin panel).
- Social media rating field per item.
- Like / Dislike interaction per item (saved in browser local storage).
- Futuristic glass-style UI + fast navigation:
  - search,
  - category filter,
  - responsive cards.
- Lightweight admin mode (no backend required) to:
  - add items,
  - edit items,
  - delete items,
  - import/export full menu JSON.
- Auto-generate QR code for current menu URL.

## Fast deployment options (no domain required)

### Option A — Cloudflare Pages (recommended)
1. Create a new Pages project from this repository.
2. Build command: **none** (static site).
3. Output directory: repository root.
4. Deploy.
5. You will get a URL like: `https://enatable.pages.dev`
6. Use that URL to print one QR code for tables.

### Option B — Netlify Drop
1. Zip the files and drag/drop in Netlify Drop.
2. Get instant hosted URL like `https://...netlify.app`.
3. Generate QR code from that URL.

### Option C — Vercel
1. Import project in Vercel.
2. Framework preset: **Other**.
3. Deploy static output.
4. Use generated `.vercel.app` URL in QR.

## Technical requirements
- Hosting: any static host (Cloudflare Pages/Netlify/Vercel/GitHub Pages).
- Storage:
  - Current version stores updates and likes locally in browser `localStorage`.
  - For multi-device synchronization, add a backend (Supabase/Firebase) later.
- Recommended production additions:
  1. Real image CDN folder (Cloudinary or S3).
  2. Real social rating integration API (Meta/Google/TikTok ingest service).
  3. Admin authentication (password + role-based access).
  4. Analytics dashboard (popular items + feedback trend).

## Run locally
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

## Important note about ratings
Current ratings are seeded placeholder values. Replace them from admin mode or connect a backend API to pull actual social media scores periodically.
