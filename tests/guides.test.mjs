import assert from "node:assert/strict";
import test from "node:test";

const cases = [
  ["tedarikci-secimi", "Kafe ve pastaneler için tatlı tedarikçisi seçimi", "Numuneyi kendi servis koşullarınızda değerlendirin", "/urunler/cafe/cheesecake"],
  ["toptan-tatli-fiyatlari", "Toptan tatlı fiyatlarını karşılaştırma rehberi", "Birim fiyatı servis edilen porsiyona çevirin", "/urunler/pastane"],
  ["kafe-menusu-tatli-secimi", "Kafe menüsü için tatlı seçimi", "Menüyü tat profilleri ve servis biçimiyle kurun", "/urunler/cafe/fransiz-ekler"],
];

async function render(pathname) {
  const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} });
}

function jsonLd(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((match) => {
    const value = JSON.parse(match[1]);
    return value["@graph"] ?? [value];
  });
}

test("guide directory renders useful descriptions and all three crawlable article links", async () => {
  const response = await render("/rehber");
  assert.equal(response.status, 200, "/rehber must be a public page");
  const html = await response.text();
  assert.match(html, /<h1[^>]*>Kafe ve pastaneler için tatlı rehberi<\/h1>/);
  assert.match(html, /İstanbul ve çevresi/);
  assert.match(html, /rel="canonical" href="https:\/\/bestgourmet\.online\/rehber"/);
  for (const [slug, title] of cases) {
    assert.ok(html.includes(`href="/rehber/${slug}"`));
    assert.ok(html.includes(title));
  }
  assert.ok(jsonLd(html).some((value) => value["@type"] === "BreadcrumbList"));
});

for (const [slug, title, heading, category] of cases) {
  test(`guide ${slug} has readable content, metadata, related links and truthful structured data`, async () => {
    const path = `/rehber/${slug}`;
    const response = await render(path);
    assert.equal(response.status, 200, `${path} must render on the server`);
    const html = await response.text();
    assert.ok(html.includes(`<title>${title} | Best Gourmet</title>`));
    assert.match(html, /property="og:type" content="article"/);
    assert.ok(html.includes(`href="https://bestgourmet.online${path}"`));
    assert.ok(html.includes(`<h1>${title}</h1>`));
    assert.ok(html.includes(heading));
    assert.ok(html.includes(`href="${category}"`));
    assert.match(html, /href="\/rehber"/);
    assert.match(html, /href="https:\/\/wa\.me\/905015740522/);
    assert.match(html, /Best Gourmet editoryal/);
    const articleHtml = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1] ?? "";
    const words = articleHtml.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean);
    assert.ok(words.length >= 320, `${words.length} words is too little for a useful guide`);
    assert.ok((articleHtml.match(/<h2\b/g) ?? []).length >= 4);
    const data = jsonLd(html);
    const article = data.find((value) => value["@type"] === "Article");
    assert.equal(article?.headline, title);
    assert.equal(article?.author?.name, "Best Gourmet");
    assert.equal(article?.author?.["@type"], "Organization");
    assert.equal(article?.mainEntityOfPage, `https://bestgourmet.online${path}`);
    assert.equal(article?.datePublished, undefined);
    assert.equal(article?.dateModified, undefined);
    const breadcrumb = data.find((value) => value["@type"] === "BreadcrumbList");
    assert.deepEqual(breadcrumb?.itemListElement.map((item) => item.position), [1, 2, 3]);
    assert.equal(breadcrumb?.itemListElement.at(-1).item, `https://bestgourmet.online${path}`);
  });
}

test("unknown guides return a real 404", async () => {
  assert.equal((await render("/rehber/bilinmeyen-rehber")).status, 404);
});

test("shared event navigation exposes the guide directory", async () => {
  const response = await render("/etkinlikler");
  assert.equal(response.status, 200);
  const html = await response.text();
  const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0] ?? "";
  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] ?? "";
  assert.match(header, /href="\/rehber"/);
  assert.match(footer, /href="\/rehber"/);
});
