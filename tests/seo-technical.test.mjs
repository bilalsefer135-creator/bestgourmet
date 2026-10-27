import assert from "node:assert/strict";
import test from "node:test";

const origin = "https://bestgourmet.online";
const existingPaths = [
  "/", "/urunler/cafe", "/urunler/pastane", "/hikayemiz", "/referanslar",
  "/etkinlikler", "/etkinlikler/dugun", "/etkinlikler/dogum-gunu",
  "/etkinlikler/ozel-gun", "/etkinlikler/kurumsal",
];
const guidePaths = [
  "/rehber", "/rehber/tedarikci-secimi", "/rehber/toptan-tatli-fiyatlari",
  "/rehber/kafe-menusu-tatli-secimi",
];

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("seo-test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(([tag]) =>
    Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value])),
  );
}

test("existing pages declare their own production canonical and social metadata", async () => {
  const descriptions = new Set();
  const titles = new Set();
  for (const pathname of existingPaths) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    const expectedUrl = new URL(pathname, origin).href;
    const meta = tags(html, "meta");
    const canonical = tags(html, "link").filter((tag) => tag.rel === "canonical");
    assert.deepEqual(canonical.map((tag) => tag.href), [expectedUrl], `${pathname} canonical`);
    assert.deepEqual(meta.filter((tag) => tag.property === "og:url").map((tag) => tag.content), [expectedUrl], `${pathname} OG URL`);
    for (const image of meta.filter((tag) => tag.property === "og:image" || tag.name === "twitter:image")) {
      assert.equal(image.content, `${origin}/og.png`, `${pathname} social image`);
    }
    assert.ok(meta.some((tag) => tag.property === "og:image"), `${pathname} OG image`);
    assert.ok(meta.some((tag) => tag.name === "twitter:image"), `${pathname} Twitter image`);
    const description = meta.find((tag) => tag.name === "description")?.content;
    assert.ok(description && description.length > 50, `${pathname} description`);
    descriptions.add(description);
    titles.add(html.match(/<title>([^<]+)<\/title>/)?.[1]);
    const head = html.split("</head>")[0];
    assert.doesNotMatch(head, /https?:\/\/(?:www\.)?gourmetbest\.tr/);
    if (pathname === "/") assert.match(head, /İstanbul.*Toptan Tatlı/);
  }
  assert.equal(descriptions.size, existingPaths.length, "unique descriptions");
  assert.equal(titles.size, existingPaths.length, "unique titles");
});

test("one truthful Organization JSON-LD appears in the shared layout", async () => {
  const html = await (await render("/")).text();
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)]
    .map(([, json]) => JSON.parse(json));
  const organizations = schemas.filter((schema) => schema["@type"] === "Organization");
  assert.equal(organizations.length, 1);
  const organization = organizations[0];
  assert.equal(organization.name, "Best Gourmet");
  assert.equal(organization.url, `${origin}/`);
  assert.equal(organization.telephone, "+905015740522");
  assert.equal(organization.email, "bestgourmet22@gmail.com");
  assert.match(JSON.stringify(organization.areaServed), /İstanbul/);
  for (const property of ["address", "aggregateRating", "review", "priceRange"]) {
    assert.equal(organization[property], undefined, `unverified ${property}`);
  }
});

test("sitemap serves XML with all public pages, populated categories and guides", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /(?:application|text)\/xml/i);
  const xml = await response.text();
  assert.match(xml, /^<\?xml[^>]*\?>\s*<urlset\b[^>]*xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/);
  assert.match(xml, /<\/urlset>\s*$/);
  const locations = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<\/url>/g)].map(([, url]) => url);
  assert.equal(locations.length, 24, "ten existing routes, ten categories, index and three guides");
  assert.equal(new Set(locations).size, locations.length, "no duplicate URLs");
  for (const pathname of [...existingPaths, ...guidePaths]) assert.ok(locations.includes(new URL(pathname, origin).href), pathname);
  assert.equal(locations.filter((url) => /\/urunler\/(?:cafe|pastane)\//.test(url)).length, 10);
  for (const location of locations) {
    const url = new URL(location);
    assert.equal(url.origin, origin);
    assert.equal(url.search, "");
    assert.equal(url.hash, "");
    assert.doesNotMatch(url.pathname, /kg-lik|mini-tartolet/);
  }
  assert.doesNotMatch(xml, /<lastmod>|gourmetbest\.tr/);
});

test("robots permits public crawling and advertises the production sitemap", async () => {
  const response = await render("/robots.txt");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/plain\b/i);
  const robots = await response.text();
  assert.match(robots, /User-agent: \*/i);
  assert.match(robots, /^Allow: \/\s*$/m);
  assert.match(robots, /^Sitemap: https:\/\/bestgourmet\.online\/sitemap\.xml\s*$/m);
  assert.doesNotMatch(robots, /^Disallow: \/\s*$/m);
});
