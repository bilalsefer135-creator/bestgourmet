import assert from "node:assert/strict";
import test from "node:test";

test("contact area embeds the supplied business map with a separate directions fallback", async () => {
  const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url).href);
  const response = await worker.fetch(new Request("http://localhost/"),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200);
  const html = await response.text();
  const contact = html.split('id="iletisim"')[1]?.split("</section>")[0] ?? "";
  const iframe = contact.match(/<iframe\b([^>]*)><\/iframe>/)?.[1];
  assert.ok(iframe, "contact must contain a real Google Maps iframe");
  const attributes = Object.fromEntries([...iframe.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [name.toLowerCase(), value]));
  const src = new URL(attributes.src);
  assert.equal(src.origin, "https://www.google.com");
  assert.equal(src.pathname, "/maps/embed");
  const payload = src.searchParams.get("pb");
  assert.ok(payload.includes("0x14b559f25242ec57:0xbe48fb90abd2722"), "supplied business identity preserved");
  assert.ok(payload.includes("Best Gourmet Patisserie"));
  assert.equal(attributes.loading, "lazy");
  assert.equal(attributes.referrerpolicy, "strict-origin-when-cross-origin");
  assert.match(attributes.title, /Best Gourmet Patisserie.*Google Maps/);
  assert.equal(attributes.width, "600");
  assert.equal(attributes.height, "450");
  assert.match(contact, /class="contact-map-footer"/);
  assert.match(contact, /Haritada aç/);
  assert.match(contact, /href="https:\/\/www.google.com\/maps\?q=41\.09184847445046,28\.646867234059656"/);
  assert.doesNotMatch(contact, /contact-map-visual|contact-map-copy/);
});
