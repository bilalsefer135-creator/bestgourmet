import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished Best Gourmet site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="tr">/i);
  assert.match(html, /<title>Best Gourmet \| Profesyonel Lezzet<\/title>/i);
  assert.match(html, /home-hero-studio-v2\.webp/);
  assert.match(html, /Lezzette güven/);
  assert.match(html, /<strong>69<\/strong> ürün gösteriliyor/);
  assert.match(html, /Etkinlik üretimi/);
  assert.match(html, /wa\.me\/905301344525/);
  assert.match(html, /products-studio\/sku\/mono-antep-fistikli-dubai\.webp/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("server-renders the event hub and four category routes", async () => {
  const routes = [
    ["/etkinlikler", /Her kutlamanın/],
    ["/etkinlikler/dugun", /En özel ‘evet’inizi/],
    ["/etkinlikler/dogum-gunu", /Yeni yaşın enerjisini/],
    ["/etkinlikler/ozel-gun", /Hatırlanacak anlara/],
    ["/etkinlikler/kurumsal", /Markanızın ritmine uygun/],
  ];

  for (const [pathname, heading] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, heading, pathname);
    assert.match(html, /Teklif ve rezervasyon/, pathname);
    assert.match(html, /905301344525/, pathname);
  }
});

test("server-renders the story and references pages", async () => {
  for (const [pathname, copy] of [
    ["/hikayemiz", /Önce iyi ürüne/],
    ["/referanslar", /Her iyi iş birliği/],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, copy, pathname);
    assert.match(html, /Best Gourmet/, pathname);
  }
});

test("ships one dedicated image for every catalog product", async () => {
  const [files, page, layout] = await Promise.all([
    readdir(new URL("../public/products-studio/sku/", import.meta.url)),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  const productBlock = page.slice(page.indexOf("const products"), page.indexOf("const categories"));
  const catalogFiles = [...productBlock.matchAll(/\[\s*"[^"]+",\s*"([a-z0-9-]+)"\s*\]/g)].map((match) => `${match[1]}.webp`);
  assert.equal(catalogFiles.length, 69);
  for (const file of catalogFiles) assert.ok(files.includes(file), `missing catalog image: ${file}`);
  assert.match(page, /const products: Product\[\]/);
  assert.match(page, /Pasta Çeşitleri/);
  assert.match(page, /Rulo Pastalar/);
  assert.match(page, /Tartlar/);
  assert.match(page, /Cheesecake/);
  assert.doesNotMatch(page, /Cafe Ürünleri/);
  assert.match(page, /Antep Fıstığı Dubai/);
  assert.match(layout, /https:\/\/gourmetbest\.tr/);
  assert.match(layout, /og\.png/);
});
