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
  assert.match(html, /<title>İstanbul’da Toptan Tatlı \| Best Gourmet<\/title>/i);
  assert.match(html, /home-hero-studio-v3\.webp/);
  assert.match(html, /Lezzette güven/);
  assert.match(html, /Fiyat Listesi/);
  assert.match(html, /aria-label="Ürün grubu seçimi"/);
  assert.match(html, /href="\/urunler\/cafe"/);
  assert.match(html, /href="\/urunler\/pastane"/);
  assert.doesNotMatch(html, /class="product-card"|id="group-catalog"/);
  assert.match(html, /Cafe Ürünleri/);
  assert.match(html, /Pastane Ürünleri/);
  assert.match(html, /cafe-products-panel-v2\.webp/);
  assert.match(html, /pastane-products-panel-v2\.webp/);
  assert.match(html, /KG’lık Ekler/);
  assert.match(html, /KG’lık Mini Rulo/);
  assert.match(html, /Mini Tartolet/);
  assert.doesNotMatch(html, /Vişne Beyaz|Frambuaz Hindistan Cevizi|Sütlü Çikolata Karamel/);
  assert.match(html, /Etkinlik üretimi/);
  assert.match(html, /wa\.me\/905015740522/);
  assert.match(html, /Bir kahve kadar/);
  assert.match(html, /tel:\+905015740522/);
  assert.match(html, /mailto:info@gourmetbest\.tr/);
  assert.match(html, /41\.09184847445046,28\.646867234059656/);
  assert.doesNotMatch(html, /Oreolu Tart|Velvet Frambuaz|Çilek Antep Fıstığı Kat/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("opens separate group catalogs with only the selected products", async () => {
  const cafeResponse = await render("/urunler/cafe");
  const pastaneResponse = await render("/urunler/pastane");
  assert.equal(cafeResponse.status, 200);
  assert.equal(pastaneResponse.status, 200);
  const cafe = await cafeResponse.text();
  const pastane = await pastaneResponse.text();
  assert.match(cafe, /<title>Cafe Ürünleri \| Best Gourmet<\/title>/);
  assert.match(pastane, /<title>Pastane Ürünleri \| Best Gourmet<\/title>/);
  assert.match(cafe, /<strong>51<\/strong> ürün gösteriliyor/);
  assert.match(pastane, /<strong>26<\/strong> ürün gösteriliyor/);
  assert.equal((cafe.match(/class="product-card"/g) ?? []).length, 51);
  assert.equal((pastane.match(/class="product-card"/g) ?? []).length, 26);
  const categoryTabs = (html) => {
    const tabs = html.split('aria-label="Ürün kategorileri"')[1]?.split("</div>")[0] ?? "";
    return [...tabs.matchAll(/<(?:button|a)\b[^>]*>([^<]+)<\/(?:button|a)>/g)].map((match) => match[1]);
  };
  assert.deepEqual(categoryTabs(cafe), ["Tümü", "Cheesecake Çeşitleri", "Tartlar", "Fransız Ekler", "Magnolia", "Rulo Çeşitleri", "Tek Pastalar", "Mono Pastalar"]);
  assert.deepEqual(categoryTabs(pastane), ["Tümü", "Pasta Çeşitleri", "Trileçe", "KG’lık Ekler", "KG’lık Mini Rulo", "Adet Pastalar", "Mini Tartolet"]);
  assert.match(pastane, /Red Velvet Pasta/);
  assert.match(pastane, /Karamel Trileçe/);
  assert.match(pastane, /products-studio\/sku\/adet-lotuslu\.webp/);
  assert.doesNotMatch(pastane, /Lotus Bomba|San Sebastian|Çilekli Rulo/);
  assert.doesNotMatch(cafe, /Red Velvet Pasta|Karamel Trileçe|Adet Pastalar|KG’lık|Mini Tartolet/);
  for (const html of [cafe, pastane]) {
    assert.doesNotMatch(html, /product-info"><p>(?:KG’lık Ekler|KG’lık Mini Rulo|Mini Tartolet)<\/p>/);
  }
  for (const name of ["Lotus Bomba", "Beyaz Çikolatalı Browni", "Paris Brest", "Antepistan", "Oreolu Cheesecake", "Oreolu Magnolia"]) {
    assert.ok(cafe.includes(name), `missing product: ${name}`);
  }
  for (const file of ["mono-antep-fistikli-dubai-v2.png", "ibiza-muzlu.webp", "ibiza-cilekli.webp", "rulo-cilekli.webp", "rulo-cikolatali.webp"]) {
    assert.ok(cafe.includes(file), `missing image: ${file}`);
  }
  for (const html of [cafe, pastane]) {
    assert.match(html, /Ürün gruplarına dön/);
    assert.match(html, /href="\/#urunler"/);
    assert.doesNotMatch(html, /aria-label="Ürün grubu seçimi"/);
    assert.doesNotMatch(html, /Vişne Beyaz|Frambuaz Hindistan Cevizi|Sütlü Çikolata Karamel|Oreolu Tart|Velvet Frambuaz|Çilek Antep Fıstığı Kat/);
  }
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
    assert.match(html, /905015740522/, pathname);
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

test("ships the image resources for every catalog product", async () => {
  const [files, page, layout] = await Promise.all([
    readdir(new URL("../public/products-studio/sku/", import.meta.url)),
    readFile(new URL("../lib/catalog.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  const productBlock = page.slice(page.indexOf("const products"), page.indexOf("const cafeCategories"));
  const catalogFiles = [...productBlock.matchAll(/\[\s*"[^"]+",\s*"([a-z0-9.-]+)"\s*\]/g)].map((match) => match[1].includes(".") ? match[1] : `${match[1]}.webp`);
  assert.equal(catalogFiles.length, 77);
  for (const file of catalogFiles) assert.ok(files.includes(file), `missing catalog image: ${file}`);
  assert.match(page, /const products: Product\[\]/);
  assert.match(page, /Pasta Çeşitleri/);
  assert.match(page, /Rulo Pastalar/);
  assert.match(page, /Tartlar/);
  assert.doesNotMatch(page, /Tartoletler/);
  assert.match(page, /Cheesecake/);
  assert.match(page, /Cafe Ürünleri/);
  assert.match(page, /Antep Fıstığı Dubai/);
  assert.doesNotMatch(productBlock, /tart-oreolu|tek-angel|tek-cilek-antep-fistikli-kat/);
  const seo = await readFile(new URL("../lib/seo.ts", import.meta.url), "utf8");
  assert.match(layout, /metadataBase: new URL\(SITE_URL\)/);
  assert.match(seo, /https:\/\/bestgourmet\.online/);
  assert.match(seo, /og\.png/);
});
