# 520998.com — Phase-wise Build Prompts

Concept: **"520998 · Love Codes & Lucky Numbers"** — 520 (我爱你, "I love you") + 998 (久久发, "long-lasting prosperity"). A free toolkit + reference that decodes the numbers people use to express love, wish luck and price products, monetised by AdSense, B2B campaign leads, sponsorships and reader support.

Global constraints (paste into every phase):
> Static site for GitHub Pages free plan from `main` root (plain HTML or native Jekyll, no plugins), relative links only. AdSense script `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6620975821265271" crossorigin="anonymous"></script>` in every `<head>`. Top of every page: "Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership" linked to https://web.works/contact. All forms deliver to one private inbox via an AJAX form backend; the address is encoded in JS and never appears in HTML, text or source as plain text. No trademark claims on "520998"; include a trademark/copyright disclosure. Original content only; mobile-first; WCAG AA; light/dark mode.

---

## Phase 1 — Foundation & brand
"Create the design system and shared layout for 520998.com: red→crimson→gold gradient (#e0243c, #b3122a, #f2b84b) on ink (#0f0a0c) with a cream light theme; DM Serif Display headings, Manrope body, JetBrains Mono for numbers. Build header (logo badge '520·998', nav: Decoder, Numbers, Tools, Gifts, Guides, Videos, Contest, For Brands, CTA 'Free Campaign Kit', theme toggle, burger), the contact top-bar, footer with newsletter form, link columns and the trademark/copyright disclosure, sticky mobile CTA bar, cookie notice, skip link. Put it in a Jekyll layout so every page only holds its content; generate sitemap.xml and robots.txt with Liquid; add ads.txt (`google.com, pub-6620975821265271, DIRECT, f08c47fec0942fa0`), manifest and favicon."

## Phase 2 — Number engine & decoder (core traffic tool)
"Create a digit symbolism map (0–9: Chinese characters, pinyin, meanings, luck weight −3..+3) and a library of 30+ number codes (love: 520, 521, 1314, 5201314, 530, 9420…; luck: 168, 518, 888, 998, 99, 999, 666…; chat: 88, 233, 555, 1414; avoid: 250, 748, 7456) each with meaning, characters, pinyin, a 2–3 sentence original explanation and usage, stored in `_data/`. Build decoder.html: input any number (≤20 digits) → longest-match code parsing, digit cards, slang reading, numerology root (keep 11/22/33), auspiciousness score meter, pattern detection (repeats, mirrors, sequences, contains 4, lucky ending), copy & share link (?n=), quick-try chips, explanation section, and the consumer lead form 'Get your personal Love-Number Report'."

## Phase 3 — Programmatic SEO pages
"Generate /numbers/{code}.html for every code from the data file through one layout: H1 '{n} meaning', quick-answer box (featured-snippet style), digit breakdown, luck score, explanation, usage, internal links to decoder/tools, share button, FAQ with FAQPage JSON-LD, related codes grid, report lead form. Build /numbers/index.html grouped by category with live filter."

## Phase 4 — Tools hub & gift finder
"Build tools.html with anchored sections: (1) Love-code builder (checkbox phrases → chained code, copy/decode), (2) Lucky gift & red-envelope amount calculator (budget, currency, occasion incl. condolence etiquette; never suggests amounts containing 4), (3) Lucky price calculator for sellers (charm .99, 8-ending, whole-8, prestige, seasonal love-code prices, margin %), (4) Name-number love match (Pythagorean, labelled entertainment), (5) Live love-days calendar with countdowns (Valentine's, White Day, 520, 521, Qixi by year, Double Nine, Singles' Day, Christmas Eve). Build gifts.html: filter by recipient, budget tier (52/99/168/520/1314) and vibe, each idea with a lucky-number touch; sponsor CTA."

## Phase 5 — Content & video
"Write 7 original long-form guides (what 520 means, Chinese number slang dictionary, lucky-number pricing, 520 Day marketing playbook, red-envelope amounts, angel numbers vs Chinese numbers, love-days calendar) with TOC, tables, FAQ in front matter, Article + FAQ schema, share buttons, related guides, and CTAs into tools and the B2B kit. Build videos.html with click-to-load YouTube facades (privacy-enhanced embeds when a video ID is set via data-yt; otherwise open a curated YouTube search) and a creator call-to-action."

## Phase 6 — Lead generation (highest-value conversion)
"Build brands.html: hero promise ('Make May 20 your best sales day of spring'), benefit checklist, micro-stats, and a 4-step progressive form with progress bar — (1) category radio cards, (2) market + moments, (3) budget + goal, (4) name, work email, company, website, phone/WeChat, notes, consent. Validate per step, honeypot anti-spam, AJAX submit, success state. Add 'how it works' steps, Starter/Strategy/Done-for-you packages, FAQ with schema, and links to the playbook. Add secondary lead magnets: report form on decoder/number/guide pages, newsletter in footer, CTAs inside tools."

## Phase 7 — Community & monetisation pages
"Build support.html (love-coded tiers $5.20 / $13.14 / $52.0 / $99.8, goals for operations, promotion & marketing, hiring talent, contests & prizes; pledge form that collects intent and replies with a secure payment link — no card data on site; not-a-charity notice), contest.html (monthly Love-Code Contest, month-end countdown, prizes $99.8/$52.0/$13.14, how to enter, official rules summary, sponsor CTA, entry form with 18+ check), careers.html (6 remote roles + application form), advertise.html (6 sponsorship packages + media-kit form + domain/partnership link)."

## Phase 8 — Trust, legal & AdSense readiness
"Create about, contact (form + mail-app button that reveals the address only in JS), privacy (AdSense/third-party cookie wording, opt-out links, EEA consent, GDPR/CCPA rights), terms (contest and support clauses), cookies, disclaimer (entertainment notice for numerology) and trademark & copyright pages. Ensure every page has unique title/description, canonical, OG tags, no broken links, fast load, no ads-only pages, clear navigation and substantial original text."

## Phase 9 — QA, deploy & growth
"Render every page at 390px and 1280px, fix layout/console errors, run link check. Push to github.com/webworksa1/520998-com (main), enable Pages from main/root, add custom domain 520998.com with GitHub A records + www CNAME, enforce HTTPS, submit sitemap in Search Console, apply for AdSense, enable Google CMP. Growth: add 10 code pages/week, localise top pages (zh, es, id, vi), publish a 520 campaign every April, pitch brand sponsors for May and August."
