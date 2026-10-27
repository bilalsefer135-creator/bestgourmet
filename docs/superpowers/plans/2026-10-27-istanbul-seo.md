# İstanbul SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prepare a reversible, locally previewable İstanbul wholesale-dessert SEO release with consent-aware GA4 and three useful guides.

**Architecture:** Existing Vinext app-router routes and local catalog data remain the source of truth. Separate metadata, catalog-category and editorial modules feed normal server-rendered pages. One shared client component handles opt-in Analytics without collecting inquiry text.

**Tech Stack:** React 19, Next-compatible Vinext 0.0.50, TypeScript, Node test runner, existing CSS, Cloudflare Worker (no deployment).

## Global Constraints

- Production origin https://bestgourmet.online; GA4 G-M251PGJTLK; service area İstanbul ve çevresi.
- Preserve existing design, images, all 77 products, 51 cafe / 26 pastane group counts, and removed-product exclusions.
- No invented prices, minimum quantities, delivery schedules, shelf lives, credentials, street addresses or reviews.
- No production deployment, external account edits, analytics traffic from localhost, or inquiry PII sent to GA.
- Use apply_patch, scoped changes and test-first development. Root coordinates builds; workers do not run simultaneous builds or commit each other's files.

### Task 1: Technical SEO

**Files:** lib/seo.ts; app/layout.tsx; app/sitemap.ts; app/robots.ts; existing server page metadata; tests/seo-technical.test.mjs.

**Interfaces:** export SITE_URL, HOME_TITLE, HOME_DESCRIPTION; pageMetadata(title: string, description: string, path: string): Metadata; organizationJsonLd. Read wholesaleCategories from lib/catalog-seo.ts (href field) and guides from lib/guides.ts (slug field). Root provides components/analytics-consent.tsx default export and app/analytics.css.

- [ ] Add failing tests for origin, own canonical/OG URLs, absence of foreign domain, XML valid URL entries, robots sitemap and metadata on representative routes. Run focused tests against existing build for RED.
- [ ] Implement pageMetadata with `alternates: { canonical: new URL(path, SITE_URL).href }`, absolute OG URL and image at /og.png. Keep existing non-home titles where sensible, add unique descriptions. Render verified Organization JSON-LD once in layout; insert AnalyticsConsent.
- [ ] Implement sitemap including existing ten routes, populated categories and three guides; no arbitrary lastModified times. robots permits public crawling and points to sitemap.
- [ ] Report files and focused checks. Root runs build/integration tests after all workers finish.

### Task 2: Crawlable product categories and homepage copy

**Files:** lib/catalog.ts; lib/catalog-seo.ts; app/page.tsx; app/urunler/cafe/[category]/page.tsx; app/urunler/pastane/[category]/page.tsx; app/catalog-seo.css; tests/catalog-seo.test.mjs; tests/rendered-html.test.mjs catalog assertions only.

**Interfaces:** preserve/export products, sku, cafeCategories, pastaneCategories, upcomingCategories, productGroups, categoryLabel in lib/catalog.ts. Export wholesaleCategories array containing group ('cafe'|'pastane'), category (existing internal label), slug, href, title, description, intro and useful distinct paragraphs. Export getWholesaleCategory(group, slug). Home accepts productGroup?: string and initialCategory?: string. Use pageMetadata from lib/seo.ts. Root imports new CSS in layout after work completes.

- [ ] Write failing tests for exact category membership/counts, server-rendered category URLs and filtered products, unknown category404, distinct H1/description/canonical. Observe RED against old output or missing module via meaningful expected route assertions.
- [ ] Move catalog declarations without changing entries, images or group membership. Replace populated category filter controls with real links preserving pill styles; retain empty future categories as buttons. Preserve search and drag behavior and ensure keyboard/back navigation.
- [ ] Add dynamic routes for 7 cafe and 3 populated pastane categories. Invalid/wrong-group/upcoming slugs return404. Filter server HTML to requested category and show useful unique B2B intro and normal product links.
- [ ] Update homepage hero H1 to İstanbul'da toptan tatlı production/sales; keep slogan as supporting copy. Add small, readable order/service-area explanation and /rehber link, without exact unsupported shipping promises. Add /rehber to desktop/mobile main nav and footer. Preserve home two-panel-only catalog behavior.
- [ ] Update existing catalog tests to read the extracted data source and accept real category links. Keep all product regression assertions. Report files and focused results.

### Task 3: Three editorial guides

**Files:** lib/guides.ts; app/rehber/page.tsx; app/rehber/[slug]/page.tsx; app/guides.css; components/events/event-header.tsx; components/events/event-footer.tsx; tests/guides.test.mjs.

**Interfaces:** guides array objects with slug, title, description, intro, sections (heading, paragraphs and optional bullets), relatedLinks. Import pageMetadata/SITE_URL from lib/seo.ts. Reuse EventHeader/EventFooter. Category links match /urunler/cafe/cheesecake, /urunler/cafe/fransiz-ekler, /urunler/cafe/tek-pastalar; group links remain /urunler/cafe and /urunler/pastane.

- [ ] Write failing server-output tests for /rehber and three routes and unknown404, readable unique content, article metadata and links. Observe RED against old build.
- [ ] Write original useful Turkish guides for tedarikci-secimi, toptan-tatli-fiyatlari, kafe-menusu-tatli-secimi. Focus business buyer decisions, not recipes or generic SEO filler. Include qualified İstanbul context and questions to confirm operational details. No made-up author identity, dates, certifications, price or review.
- [ ] Build responsive editorial layout using existing color/font variables, breadcrumbs, related product links and WhatsApp CTA. Add truthful Article/BreadcrumbList JSON-LD without fabricated dates; escaped JSON. Use real Best Gourmet imagery only where helpful. Add Rehber links in shared nav/footer. Root imports CSS.
- [ ] Report facts requiring later user confirmation and checks run.

### Task 4: Analytics consent, integration and verification (root)

**Files:** lib/analytics.ts; components/analytics-consent.tsx; app/analytics.css; tests/analytics.test.mjs; tests/seo-integration.test.mjs; docs/seo-release-notes.md.

- [ ] Write tests for sanitized event payloads, hostname gate, consent deny/revoke and contact intent classification. Run RED before implementation.
- [ ] Implement opt-in only GA loading and SPA pageviews with query/hash removed. Track contact_click/price_list_click using method and safe placement only; never full URL, message, product free-text or contact data. Rejection leaves all site functions available. Preference button remains reachable after choice; revoke disables tracking and clears GA cookies for this host.
- [ ] Build once, run all test files, TypeScript and scoped lint. Fix integration regressions. Verify rendered sitemap/robots using built Worker; use local server for real static asset/browser QA.
- [ ] Test desktop/mobile home, both groups, one category and each guide; check back/search, no horizontal overflow, image failures, consent persistence, no pre-consent network or production tracking from preview.
- [ ] Independent diff review, scoped fixes, final commit(s), rollback instructions and local preview handoff. Do not deploy.
