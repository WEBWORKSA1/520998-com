# 520998.com — Love Codes & Lucky Numbers

Free number decoder, love-code library (33 code pages), 6 tools, 7 guides, gift finder, videos, monthly contest, support/donations, careers, advertising and a dedicated **B2B campaign-kit lead-generation funnel** — monetised with Google AdSense (`ca-pub-6620975821265271`).

- **Jekyll site built natively by GitHub Pages** (no Actions, no plugins). Shared chrome + AdSense in `_layouts/default.html`; every page holds only its content. All links are relative (`page.b`), so the site works at `https://webworksa1.github.io/520998-com/` and at `https://520998.com/`.
- **Number pages** are generated from `_data/codes.json` through `_layouts/number.html`. To add a code: append an entry to `_data/codes.json` and add a 7-line stub `numbers/<code>.md` (copy any existing one).
- **Guides** use `_layouts/guide.html`; FAQ lives in each guide's front matter (rendered + FAQPage schema automatically).
- Gift finder data: `_data/gifts.json` · digit symbolism: `_data/digits.json` · lead form shared via `_includes/report.html`.
- Styles `assets/css/style.css` · logic `assets/js/main.js` · data bridge `assets/js/codes.js` (Liquid-generated). `sitemap.xml` and `robots.txt` are generated automatically.
- **Forms** post via AJAX to FormSubmit; the inbox is XOR-encoded in `main.js` and never appears in page source. The first submission triggers a one-time FormSubmit activation email — click it once.
- AdSense: script in every `<head>` (Auto ads) + `ads.txt`. In AdSense → Privacy & messaging, enable the Google CMP for EEA/UK.
- Top-of-page notice on every page links to https://web.works/contact.

## Publish (GitHub Pages, free plan)
1. Repo → **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.
2. Custom domain `520998.com` (the `CNAME` file is already present). DNS: A `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; CNAME `www` → `webworksa1.github.io`. Tick **Enforce HTTPS**.
3. Submit `https://520998.com/sitemap.xml` in Google Search Console, then apply to AdSense with `520998.com`.

See `BUILD-PROMPTS.md` (phase-wise build prompts) and `RESEARCH.md` (research + 25-site benchmark).

Trademark: "520998" is used only as a domain identifier and descriptive code; no exclusive rights are claimed — see `/trademark.html`.
