# Apply All Updates, Brain & Everything to Main Website

**Production site:** https://www.asperbeautyshop.com
**Staging site:** https://asperbeautyshop-com.lovable.app/
**Repo:** asperpharma/understand-project
**Lovable:** https://lovable.dev/projects/657fb572-13a5-4a3e-bac9-184d39fdf7e6/settings
**Supabase project:** `qqceibvalkoytafynwoc`

---

## Quick Deploy (4 Steps)

Do this whenever you want the **latest code live** on the main site.

**1. Open a terminal in your understand-project folder.**
If you don't have it yet:
```bash
gh repo clone asperpharma/understand-project
cd understand-project
```

**2. Get latest and install deps.**
```bash
git pull origin main
npm install
```

**3. Deploy to the live site.**
(If you have no new changes, skip the commit; otherwise:)
```bash
git add .
git commit -m "Your message"
git push origin main
```
Lovable will build and deploy; the site updates in a few minutes.

**4. Verify.**
```bash
npm run health
```
Then open https://www.asperbeautyshop.com/ and spot-check: Home, Products, Cart, Beauty Assistant.

---

## Manual Configuration Checklist

Do these **in your dashboards** so the live site can use the Brain and Commerce Engine. Tick each when done.

### Step 1 — Lovable Environment Variables

**Where:** [Lovable → Settings → Environment variables](https://lovable.dev/projects/657fb572-13a5-4a3e-bac9-184d39fdf7e6/settings)

Set (or confirm) these production variables:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_PROJECT_ID` | `qqceibvalkoytafynwoc` |
| `VITE_SUPABASE_URL` | `https://qqceibvalkoytafynwoc.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | *(your anon/public key from Supabase)* |
| `VITE_SHOPIFY_STORE_DOMAIN` | `lovable-project-milns.myshopify.com` |
| `VITE_SHOPIFY_STOREFRONT_TOKEN` | *(your Storefront API token)* |
| `VITE_SHOPIFY_API_VERSION` | `2025-07` |
| `VITE_SITE_URL` | `https://www.asperbeautyshop.com/` |
| `VITE_LOVABLE_URL` | `asperbeautyshop-com.lovable.app` |

- [ ] All Lovable env vars saved; redeploy or push to `main` so build uses them

### Step 2 — Supabase Auth Redirects

**Where:** [Supabase Dashboard](https://supabase.com/dashboard/project/qqceibvalkoytafynwoc) → **Authentication** → **URL Configuration**

- Under **Redirect URLs**, add:
  - `https://www.asperbeautyshop.com/**`
  - `https://asperbeautyshop-com.lovable.app/**`
- Set **Site URL** to: `https://www.asperbeautyshop.com/`
- Save

- [ ] Redirect URLs include production and staging domains; Site URL points to production

### Step 3 — Edge Function SITE_URL Secret

**Where:** Supabase → **Project Settings** → **Edge Functions** → **Secrets**

- Add or update: **`SITE_URL`** = `https://www.asperbeautyshop.com/`

- [ ] `SITE_URL` secret set so COD/confirmation emails link to the live site

### Step 4 — Google Merchant Center

- Log into [Google Merchant Center](https://merchant.google.com/).
- Confirm your Shopify product feed is syncing 5,000+ SKUs without critical errors.
- Ensure product and storefront links point to `https://www.asperbeautyshop.com`.

- [ ] Feed syncing; no critical errors; links point to production domain

### Step 5 — Social Media Platforms

Base URL for all: **https://www.asperbeautyshop.com/**

| Platform | Handle / URL | What to update |
|---|---|---|
| Instagram | `@asper.beauty.shop` | Bio link, story links, shoppable posts landing URL |
| Facebook | `AsperBeautyShop` | Page link, shop link, ads landing URL |
| WhatsApp | `+962 79 065 6666` | CTA links, catalog links, ManyChat webhook deep links |
| TikTok | `@asper.beauty.shop` | Bio link, ads landing URL |
| X (Twitter) | `@asperbeautyshop` | Bio link, pinned post, ads landing URL |
| YouTube | `@asperbeautyshop` | Description link, end screen, Community posts |
| LinkedIn | `company/asper-beauty-shop` | About page link |
| Snapchat | `@asperbeautyshop` | Profile link |
| Pinterest | `asperbeautyshop` | Profile link, product pins |
| ManyChat / Meta | — | All flow buttons and quick replies |

- [ ] All social platform links point to production domain
- [ ] No old/staging URLs on any social platform

### Step 6 — Deploy and Verify

**Deploy from the understand-project repo:**

```bash
cd path/to/understand-project
git add .
git commit -m "feat: complete apply_to_main_site checklist"
git push origin main
```

Lovable will build and deploy. Then **verify:**

```bash
npm run health
```

Open https://www.asperbeautyshop.com/ and https://www.asperbeautyshop.com/health — expect 200.

- [ ] Pushed to `main`; Lovable deploy successful
- [ ] `npm run health` passes; `/health` returns 200; site and Brain connected

---

## Post-Deploy Smoke Test

| Page / Route | Check |
|---|---|
| **Home** `/` | Hero, nav, featured products, footer |
| **Products** `/products` | Listing, filters |
| **Product detail** `/product/:handle` | Images, price, Add to cart |
| **Cart** | Cart drawer — items, checkout CTA |
| **Checkout** | Shopify checkout flow |
| **Account / Login** | Auth redirects back to production domain |
| **Beauty Assistant** | Chat widget loads and responds |
| **Health** `/health` | Returns 200 JSON |

- [ ] All critical routes load correctly
- [ ] Cart and checkout work; login redirects to production site
- [ ] Beauty Assistant responds; `/health` returns 200

---

## Optional — Catalog Sync (CSV to Shopify)

If you have a new or updated CSV catalog:

```bash
node scripts/sync-shopify-catalog.js --dry-run --limit 5  # dry-run
node scripts/sync-shopify-catalog.js                       # full sync
```

- [ ] Sync run (if needed); products visible on main site

---

## Quick Reference

| What | Where |
|---|---|
| Production site | https://www.asperbeautyshop.com/ |
| Staging site | https://asperbeautyshop-com.lovable.app/ |
| Lovable settings | https://lovable.dev/projects/657fb572-13a5-4a3e-bac9-184d39fdf7e6/settings |
| GitHub repo | https://github.com/asperpharma/understand-project |
| Supabase project | `qqceibvalkoytafynwoc` |
| Supabase dashboard | https://supabase.com/dashboard/project/qqceibvalkoytafynwoc |
| Shopify admin | https://admin.shopify.com/store/lovable-project-milns |
| Gorgias helpdesk | https://asper-beauty-shop.gorgias.com |
| Google Merchant Center | https://merchants.google.com/mc/overview?a=5717495012 |
| Env template | `env.main-site.example` |
| Design system | `DESIGN_SYSTEM.md` |
| Supabase profile | `docs/SUPABASE_MASTER_PROFILE.md` |

---

*Last updated: March 2026.*
