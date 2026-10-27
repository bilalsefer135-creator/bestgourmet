import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const runtimeRequire = process.env.BEST_GOURMET_QA_MODULES
  ? createRequire(path.join(process.env.BEST_GOURMET_QA_MODULES, "package.json"))
  : createRequire(import.meta.url);
const { chromium } = runtimeRequire("playwright");
const origin = process.env.BEST_GOURMET_QA_ORIGIN || "http://localhost:3001";
const output = path.resolve("outputs/contact-map-2026-10-27");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const thirdPartyFailures = [];
const applicationErrors = [];
const findings = [];
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  page.on("pageerror", (error) => applicationErrors.push(error.message));
  page.on("requestfailed", (request) => {
    if (!request.url().startsWith(origin)) {
      const url = new URL(request.url());
      thirdPartyFailures.push({ url: `${url.origin}${url.pathname}`, error: request.failure()?.errorText });
    }
  });
  await page.goto(origin, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Analitiği reddet", exact: true }).click();
  const iframe = page.locator(".contact-map iframe");
  const mapResponse = page.waitForResponse((response) => response.url().startsWith("https://www.google.com/maps/embed?"), { timeout: 30000 });
  await iframe.scrollIntoViewIfNeeded();
  const response = await mapResponse;
  assert.equal(response.status(), 200, "real Google Maps embed response");
  const frame = page.frameLocator(".contact-map iframe");
  // Google can paint the business card without exposing its text to DOM locators.
  // Assert the actual interactive map/attribution, then inspect the screenshots.
  await frame.locator('[aria-label="Harita"]').first().waitFor({ state: "visible", timeout: 20000 });
  await frame.getByText(/Harita verileri/).first().waitFor({ state: "visible", timeout: 20000 });

  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.locator(".contact-map").scrollIntoViewIfNeeded();
    const frameBox = await iframe.boundingBox();
    const footerBox = await page.locator(".contact-map-footer").boundingBox();
    assert.ok(frameBox.width <= width && frameBox.width > 250, `${width} responsive iframe width`);
    assert.ok(frameBox.height >= 350, `${width} usable iframe height`);
    assert.ok(footerBox.y >= frameBox.y + frameBox.height - 1, `${width} fallback does not overlay map controls`);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `${width} no horizontal overflow`);
    await page.locator(".contact-map").screenshot({ path: path.join(output, `google-map-${width}.png`) });
    findings.push({ width, frameBox, footerBox, mapRegionVisible: true, attributionVisible: true });
  }
  assert.deepEqual(applicationErrors, []);
  assert.equal(await page.locator('script[src*="googletagmanager.com"]').count(), 0, "Analytics remains disabled despite Maps loading");
  await writeFile(path.join(output, "map-report.json"), JSON.stringify({ embedStatus: response.status(), findings, applicationErrors, thirdPartyFailures,
    note: "Real Maps was requested explicitly for this smoke test, independently of the rejected site Analytics preference." }, null, 2));
  console.log(`PASS: actual Google Maps 200, interactive map and attribution visible, desktop/tablet/mobile layout and separate directions fallback. Third-party failed requests: ${thirdPartyFailures.length}. Screenshots: ${output}`);
} finally {
  await browser.close();
}
