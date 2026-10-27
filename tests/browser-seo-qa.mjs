import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const runtimeRequire = process.env.BEST_GOURMET_QA_MODULES
  ? createRequire(path.join(process.env.BEST_GOURMET_QA_MODULES, "package.json"))
  : createRequire(import.meta.url);
const { chromium } = runtimeRequire("playwright");
const origin = process.env.BEST_GOURMET_QA_ORIGIN || "http://localhost:3001";
const output = path.resolve("outputs/seo-2026-10-27");
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const findings = [];
const consoleErrors = [];
const failedRequests = [];
const googleRequests = [];
const routes = ["/", "/urunler/cafe", "/urunler/pastane", "/urunler/cafe/cheesecake", "/rehber", "/rehber/tedarikci-secimi", "/rehber/toptan-tatli-fiyatlari", "/rehber/kafe-menusu-tatli-secimi"];

async function stubMaps(context) {
  await context.route("https://www.google.com/maps/embed?*", (route) => route.fulfill({
    contentType: "text/html", body: "<!doctype html><html lang='tr'><body>Google Maps — test yer tutucusu</body></html>",
  }));
}

try {
  const context = await browser.newContext();
  await stubMaps(context);
  const page = await context.newPage();
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  page.on("requestfailed", (request) => failedRequests.push({ url: request.url(), error: request.failure()?.errorText }));
  page.on("request", (request) => {
    if (/googletagmanager\.com|google-analytics\.com/.test(request.url())) googleRequests.push(request.url());
  });
  await page.goto(origin);
  await page.getByRole("button", { name: "Analitiği reddet", exact: true }).click();
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const route of routes) {
      const response = await page.goto(`${origin}${route}`);
      assert.equal(response.status(), 200, `${width} ${route}`);
      await page.locator("h1").waitFor();
      await page.locator("img").evaluateAll((images) => Promise.all(images.map((image) => {
        image.loading = "eager";
        return image.complete ? Promise.resolve() : new Promise((resolve) => { image.onload = image.onerror = resolve; });
      })));
      const state = await page.evaluate(() => ({
        viewport: window.innerWidth,
        width: document.documentElement.scrollWidth,
        headings: document.querySelectorAll("h1").length,
        brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
        title: document.title,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        gaScripts: document.querySelectorAll('script[src*="googletagmanager.com"]').length,
      }));
      assert.ok(state.width <= width + 1, `horizontal overflow ${width} ${route}: ${state.width}`);
      assert.equal(state.headings, 1, `${route} H1`);
      assert.deepEqual(state.brokenImages, [], `${route} broken images`);
      assert.equal(state.gaScripts, 0, `${route} no preview analytics`);
      findings.push({ width, route, ...state });
      if (width !== 768 && ["/", "/urunler/cafe/cheesecake", "/rehber", "/rehber/tedarikci-secimi"].includes(route)) {
        const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
        await page.screenshot({ path: path.join(output, `${name}-${width}.png`), fullPage: true });
      }
    }
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${origin}/urunler/cafe`);
  await page.locator('.category-tabs a[href="/urunler/cafe/cheesecake"]').click();
  await page.waitForURL("**/urunler/cafe/cheesecake");
  await page.waitForFunction(() => document.querySelectorAll(".product-card").length === 8);
  await page.locator('.category-tabs a[href="/urunler/cafe/fransiz-ekler"]').click();
  await page.waitForURL("**/urunler/cafe/fransiz-ekler");
  await page.waitForFunction(() => document.querySelector("h1")?.textContent.includes("Fransız Ekler"));
  await page.goBack();
  await page.waitForURL("**/urunler/cafe/cheesecake");
  await page.waitForFunction(() => document.querySelector("h1")?.textContent.includes("Cheesecake"));
  await page.getByRole("searchbox").fill("Lotus");
  await page.waitForFunction(() => document.querySelectorAll(".product-card").length === 1);
  assert.match(await page.locator(".product-card h3").innerText(), /Lotuslu Cheesecake/);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin);
  await page.getByRole("button", { name: "Menüyü aç veya kapat" }).click();
  await page.locator('header nav a[href="/rehber"]').click();
  await page.waitForURL("**/rehber");
  assert.equal(await page.locator('header .menu-button').getAttribute("aria-expanded"), "false");

  await page.getByRole("button", { name: "Çerez tercihleri", exact: true }).click();
  await page.getByRole("button", { name: "Analitiğe izin ver", exact: true }).click();
  assert.equal(await page.locator('script[src*="googletagmanager.com"]').count(), 0, "even consent cannot enable localhost tracking");
  assert.equal(googleRequests.length, 0);
  assert.deepEqual(consoleErrors, [], "browser runtime errors");
  assert.deepEqual(failedRequests, [], "failed local resources");
  await context.close();

  // Isolated production-host simulation: serve the local build, stub Google,
  // and never send any request or measurement to real production services.
  const production = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await stubMaps(production);
  let tagLoads = 0;
  await production.route("https://bestgourmet.online/**", async (route) => {
    const url = new URL(route.request().url());
    await route.fulfill({ response: await route.fetch({ url: `${origin}${url.pathname}${url.search}` }) });
  });
  await production.route("https://www.googletagmanager.com/**", async (route) => {
    tagLoads++;
    await route.fulfill({ contentType: "text/javascript", body: "window.__qaGoogleTagStub = true;" });
  });
  await production.route(/https:\/\/[^/]*google-analytics\.com\//, (route) => route.abort());
  const prodPage = await production.newPage();
  await prodPage.goto("https://bestgourmet.online/?email=private@example.com#private");
  await prodPage.getByRole("button", { name: "Analitiği reddet", exact: true }).click();
  assert.equal(tagLoads, 0);
  await prodPage.reload();
  assert.equal(await prodPage.getByRole("button", { name: "Analitiğe izin ver", exact: true }).count(), 0, "saved denial persists");
  await prodPage.getByRole("button", { name: "Çerez tercihleri", exact: true }).click();
  await prodPage.getByRole("button", { name: "Analitiğe izin ver", exact: true }).click();
  await prodPage.waitForFunction(() => window.__qaGoogleTagStub);
  assert.equal(tagLoads, 1);
  const queue = () => prodPage.evaluate(() => (window.dataLayer || []).map((item) => Array.from(item)));
  let events = (await queue()).filter((item) => item[0] === "event");
  assert.equal(events.filter((item) => item[1] === "page_view").length, 1);
  assert.equal(events[0][2].page_location, "https://bestgourmet.online/");
  assert.equal(JSON.stringify(events).includes("private@example.com"), false);

  await prodPage.evaluate(() => document.addEventListener("click", (event) => {
    if (event.target.closest('a[href^="https://wa.me/"], a[href^="tel:"], a[href^="mailto:"]')) event.preventDefault();
  }, true));
  await prodPage.locator('header a[data-analytics-intent="price_list"]').click();
  await prodPage.locator('a[href="tel:+905015740522"]').first().click();
  events = (await queue()).filter((item) => item[0] === "event");
  assert.equal(events.filter((item) => item[1] === "price_list_click").length, 1);
  assert.deepEqual(events.find((item) => item[1] === "price_list_click")[2], {
    contact_method: "whatsapp", placement: "header",
    page_location: "https://bestgourmet.online/", page_referrer: "",
  });
  assert.equal(events.filter((item) => item[1] === "contact_click").length, 1);

  await prodPage.locator('header a[href="/rehber"]').click();
  await prodPage.waitForURL("https://bestgourmet.online/rehber");
  await prodPage.waitForFunction(() => (window.dataLayer || []).filter((item) => item[0] === "event" && item[1] === "page_view").length >= 2);
  events = (await queue()).filter((item) => item[0] === "event" && item[1] === "page_view");
  assert.equal(events.length, 2, "one manual pageview per route");
  assert.equal(events[1][2].page_location, "https://bestgourmet.online/rehber");

  await prodPage.locator('.guide-intro-actions a[data-analytics-intent="price_list"]').click();
  const guidePriceRequest = (await queue()).filter((item) => item[0] === "event" && item[1] === "price_list_click").at(-1);
  assert.deepEqual(guidePriceRequest[2], {
    contact_method: "whatsapp", placement: "content",
    page_location: "https://bestgourmet.online/rehber", page_referrer: "",
  }, "new introductory CTA tracks a price request on the current guide page, without message text");

  await prodPage.locator('.guide-contact-actions a[href="https://wa.me/905015740522"]').click();
  const guideContact = (await queue()).filter((item) => item[0] === "event" && item[1] === "contact_click").at(-1);
  assert.equal(guideContact[2].page_location, "https://bestgourmet.online/rehber", "contact after SPA navigation uses current clean page URL");
  assert.deepEqual(guideContact[2], {
    contact_method: "whatsapp", placement: "content",
    page_location: "https://bestgourmet.online/rehber", page_referrer: "",
  }, "contact payload contains only safe fields, without target URL, query, fragment or PII");
  assert.equal(JSON.stringify(await queue()).includes("private@example.com"), false);

  await production.addCookies([
    { name: "_ga", value: "test", domain: ".bestgourmet.online", path: "/" },
    { name: "_ga_M251PGJTLK", value: "test", domain: ".bestgourmet.online", path: "/" },
    { name: "unrelated_preference", value: "keep", domain: ".bestgourmet.online", path: "/" },
  ]);
  await prodPage.reload();
  await prodPage.waitForFunction(() => window.__qaGoogleTagStub);
  assert.equal(tagLoads, 2, "saved granted consent loads the tag on reload");
  assert.equal(await prodPage.evaluate(() => window["ga-disable-G-M251PGJTLK"]), false, "saved grant keeps analytics enabled after hydration");
  events = (await queue()).filter((item) => item[0] === "event" && item[1] === "page_view");
  assert.equal(events.length, 1, "saved grant reload emits exactly one pageview");
  const grantedCookies = await production.cookies();
  assert.equal(grantedCookies.find((cookie) => cookie.name === "_ga")?.value, "test", "hydration preserves existing GA cookie with saved consent");
  assert.equal(grantedCookies.find((cookie) => cookie.name === "_ga_M251PGJTLK")?.value, "test", "hydration preserves existing GA session cookie with saved consent");
  await prodPage.getByRole("button", { name: "Çerez tercihleri", exact: true }).click();
  await prodPage.getByRole("button", { name: "Analitiği reddet", exact: true }).click();
  assert.equal(await prodPage.evaluate(() => window["ga-disable-G-M251PGJTLK"]), true);
  const cookies = await production.cookies();
  assert.equal(cookies.some((cookie) => cookie.name.startsWith("_ga")), false, "revocation clears analytics cookies");
  assert.equal(cookies.some((cookie) => cookie.name === "unrelated_preference"), true);
  await prodPage.reload();
  assert.equal(await prodPage.locator('script[src*="googletagmanager.com"]').count(), 0);
  await production.close();

  const restricted = await browser.newContext();
  await stubMaps(restricted);
  await restricted.addInitScript(() => Object.defineProperty(window, "localStorage", { get() { throw new Error("QA storage unavailable"); } }));
  const restrictedPage = await restricted.newPage();
  await restrictedPage.goto(origin);
  await restrictedPage.getByRole("button", { name: "Analitiği reddet", exact: true }).click();
  assert.equal(await restrictedPage.locator(".analytics-banner").count(), 0, "choice works without storage");
  await restricted.close();

  await writeFile(path.join(output, "browser-report.json"), JSON.stringify({ findings, consoleErrors, failedRequests, googleRequests, analyticsSimulation: "pass; Google tag and Maps embed stubbed, no real data sent", maps: "real third-party loading tested separately with browser-map-qa.mjs", interactions: "category navigation/back/search, mobile nav, consent/persistence/revocation/storage fallback passed" }, null, 2));
  console.log(`PASS: ${findings.length} responsive page checks, navigation/search, no broken assets or runtime errors, consent and production-host Analytics simulation. Screenshots: ${output}`);
} finally {
  await browser.close();
}
