import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

const moduleUrl = new URL("../lib/analytics.ts", import.meta.url);

async function analytics() {
  assert.equal(await access(moduleUrl).then(() => true, () => false), true,
    "consent-aware analytics implementation must exist");
  return import(moduleUrl.href);
}

test("only the approved production domains can send analytics", async () => {
  const { isProductionHost, GA_ID } = await analytics();
  assert.equal(GA_ID, "G-M251PGJTLK");
  for (const host of ["bestgourmet.online", "www.bestgourmet.online"]) {
    assert.equal(isProductionHost(host), true, host);
  }
  for (const host of ["localhost", "127.0.0.1", "site-creator-vinext-starter.bilalsefer135.workers.dev", "bestgourmet.online.example.com", "gourmetbest.tr"]) {
    assert.equal(isProductionHost(host), false, host);
  }
});

test("consent defaults to no permission and accepts only explicit saved choices", async () => {
  const { parseConsent, canTrack } = await analytics();
  for (const value of [null, undefined, "true", "yes", "", "unknown"]) assert.equal(parseConsent(value), null);
  assert.equal(parseConsent("granted"), "granted");
  assert.equal(parseConsent("denied"), "denied");
  assert.equal(canTrack("granted", "bestgourmet.online"), true);
  assert.equal(canTrack("denied", "bestgourmet.online"), false);
  assert.equal(canTrack(null, "bestgourmet.online"), false);
  assert.equal(canTrack("granted", "localhost"), false);
});

test("page locations and referrers exclude all query and fragment data", async () => {
  const { cleanPageUrl } = await analytics();
  assert.equal(cleanPageUrl("https://bestgourmet.online/urunler/cafe?email=private@example.com#phone=05000000000"), "https://bestgourmet.online/urunler/cafe");
  assert.equal(cleanPageUrl("https://example.com/search?q=private#message"), "https://example.com/search");
  assert.equal(cleanPageUrl("not a valid URL"), "");
  assert.equal(cleanPageUrl("javascript:alert('private')"), "");
});

test("contact intent events contain no inquiry text, contact data or target URL", async () => {
  const { contactEvent } = await analytics();
  const event = contactEvent("https://wa.me/905015740522?text=private%40example.com%20Private%20Name", "product_card");
  assert.deepEqual(event, { name: "contact_click", params: { contact_method: "whatsapp", placement: "product_card" } });
  assert.equal(JSON.stringify(event).includes("private"), false);
  assert.deepEqual(contactEvent("tel:+905015740522", "contact"), { name: "contact_click", params: { contact_method: "phone", placement: "contact" } });
  assert.deepEqual(contactEvent("mailto:info@gourmetbest.tr?body=private", "footer"), { name: "contact_click", params: { contact_method: "email", placement: "footer" } });
});

test("price list is measured as a click, not a lead or sale", async () => {
  const { contactEvent } = await analytics();
  assert.deepEqual(contactEvent("https://wa.me/905015740522?text=private", "header", "price_list"), {
    name: "price_list_click", params: { contact_method: "whatsapp", placement: "header" },
  });
  assert.equal(contactEvent("https://bestgourmet.online/urunler/cafe", "content"), null);
  assert.equal(contactEvent("https://wa.me.attacker.example/905015740522", "content"), null);
  assert.equal(contactEvent("https://www.google.com/maps?q=41,28", "contact"), null);
});

test("unrecognized placement or intent cannot leak free text into events", async () => {
  const { contactEvent } = await analytics();
  assert.deepEqual(contactEvent("tel:+905015740522", "private@example.com", "Private Name"), {
    name: "contact_click", params: { contact_method: "phone", placement: "content" },
  });
});

test("a choice still works when storage can be read but writing fails", async () => {
  const { readConsent, saveConsent } = await analytics();
  const previousWindow = globalThis.window;
  globalThis.window = {
    localStorage: { getItem: () => null, setItem: () => { throw new Error("quota exceeded"); } },
    dispatchEvent: () => true,
  };
  try {
    saveConsent("denied");
    assert.equal(readConsent(), "denied");
    saveConsent("granted");
    assert.equal(readConsent(), "granted");
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});
