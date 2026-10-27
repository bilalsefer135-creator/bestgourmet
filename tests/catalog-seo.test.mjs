import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const expected = [
  ["cafe", "cheesecake", "Cheesecake", 8],
  ["cafe", "tartlar", "Tartlar", 3],
  ["cafe", "fransiz-ekler", "Ekler", 8],
  ["cafe", "magnolia", "Magnolia", 11],
  ["cafe", "rulo-pastalar", "Rulo Pastalar", 5],
  ["cafe", "tek-pastalar", "Tek Pastalar", 10],
  ["cafe", "mono-pastalar", "Mono Pasta", 6],
  ["pastane", "pasta-cesitleri", "Pasta Çeşitleri", 15],
  ["pastane", "trilece", "Trileçe", 4],
  ["pastane", "adet-pastalar", "Adet Pastalar", 7],
];

async function sourceModule(path) {
  const source = await readFile(new URL(path, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

async function render(pathname) {
  const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url).href);
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  return { status: response.status, html: await response.text() };
}

test("publishes every populated category as a filtered server-rendered page", async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const [group, slug, , count] of expected) {
    const pathname = `/urunler/${group}/${slug}`;
    const { status, html } = await render(pathname);
    assert.equal(status, 200, `${pathname} must be a crawlable category`);
    assert.equal((html.match(/class="product-card"/g) ?? []).length, count, pathname);
    assert.match(html, new RegExp(`<strong>${count}</strong> ürün gösteriliyor`));
    assert.match(html, new RegExp(`<link[^>]+rel="canonical"[^>]+href="https://bestgourmet.online${pathname}"`));
    assert.match(html, /İstanbul ve çevresi/);
    assert.match(html, /href="https:\/\/wa.me\/905015740522/);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(title && !titles.has(title), `unique title for ${pathname}`);
    assert.ok(description && !descriptions.has(description), `unique description for ${pathname}`);
    titles.add(title);
    descriptions.add(description);
  }
});

test("rejects unknown, wrong-group and upcoming category routes", async () => {
  for (const pathname of ["/urunler/cafe/bilinmeyen", "/urunler/cafe/trilece", "/urunler/pastane/cheesecake", "/urunler/pastane/ekler-kg", "/urunler/pastane/rulo-kg", "/urunler/pastane/mini-tartolet"]) {
    assert.equal((await render(pathname)).status, 404, pathname);
  }
});

test("home explains İstanbul wholesale service while keeping the two catalog panels", async () => {
  const { html, status } = await render("/");
  assert.equal(status, 200);
  assert.match(html, /<h1>İstanbul’da toptan tatlı <em>üretimi ve satışı\.<\/em><\/h1>/);
  assert.match(html, /Lezzette güven, sunumda kalite\./);
  assert.match(html, /İstanbul ve çevresi/);
  assert.match(html, /href="\/rehber"/);
  assert.equal((html.match(/class="product-group-panel"/g) ?? []).length, 2);
  assert.doesNotMatch(html, /class="product-card"|id="group-catalog"/);
});

test("shared catalog preserves all products and exact populated category membership", async () => {
  const catalog = await sourceModule("../lib/catalog.ts");
  const seo = await sourceModule("../lib/catalog-seo.ts");
  assert.equal(catalog.products.length, 77);
  assert.equal(catalog.products.filter((p) => catalog.cafeCategories.includes(p.category)).length, 51);
  assert.equal(catalog.products.filter((p) => catalog.pastaneCategories.includes(p.category)).length, 26);
  assert.deepEqual(seo.wholesaleCategories.map(({ group, slug, category }) => [group, slug, category]), expected.map(([group, slug, category]) => [group, slug, category]));
  for (const [group, slug, category, count] of expected) {
    const entry = seo.getWholesaleCategory(group, slug);
    assert.equal(entry.href, `/urunler/${group}/${slug}`);
    assert.equal(catalog.products.filter((p) => p.category === category).length, count);
    const { html } = await render(entry.href);
    const grid = html.split('class="product-grid"')[1]?.split('</aside>')[0] ?? "";
    for (const product of catalog.products) {
      assert.equal(grid.includes(`src="${product.image}"`), product.category === category, `${entry.href}: ${product.image}`);
    }
  }
  assert.equal(seo.getWholesaleCategory("pastane", "cheesecake"), undefined);
  assert.equal(seo.getWholesaleCategory("pastane", "ekler-kg"), undefined);
  assert.ok(catalog.products.every((p) => !/tart-oreolu|tek-angel|tek-cilek-antep-fistikli-kat/.test(p.image)));
});

test("group category controls expose links and keep upcoming categories as buttons", async () => {
  for (const group of ["cafe", "pastane"]) {
    const { html } = await render(`/urunler/${group}`);
    const tabs = html.split('aria-label="Ürün kategorileri"')[1]?.split('</div>')[0] ?? "";
    for (const [entryGroup, slug] of expected) {
      if (group === entryGroup) assert.ok(tabs.includes(`href="/urunler/${group}/${slug}"`));
    }
    assert.match(tabs, new RegExp(`href="/urunler/${group}"`));
    if (group === "pastane") {
      for (const label of ["KG’lık Ekler", "KG’lık Mini Rulo", "Mini Tartolet"]) assert.match(tabs, new RegExp(`<button[^>]*>${label}</button>`));
    }
  }
});
