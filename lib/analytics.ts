export const GA_ID = "G-M251PGJTLK";
export const CONSENT_KEY = "best-gourmet:analytics-consent:v1";
export const CONSENT_EVENT = "best-gourmet:analytics-consent";

export type AnalyticsConsent = "granted" | "denied" | null;
export type ContactEvent = {
  name: "contact_click" | "price_list_click";
  params: {
    contact_method: "whatsapp" | "phone" | "email";
    placement: string;
  };
};

export function isProductionHost(hostname: string) {
  return hostname === "bestgourmet.online" || hostname === "www.bestgourmet.online";
}

export function parseConsent(value: unknown): AnalyticsConsent {
  return value === "granted" || value === "denied" ? value : null;
}

export function canTrack(consent: AnalyticsConsent, hostname: string) {
  return consent === "granted" && isProductionHost(hostname);
}

export function cleanPageUrl(value: string) {
  try {
    const url = new URL(value);
    return /^https?:$/.test(url.protocol) ? `${url.origin}${url.pathname}` : "";
  } catch {
    return "";
  }
}

const safePlacements = ["header", "footer", "product_card", "content", "contact", "price_list"];

export function contactEvent(href: string, placement: string, intent?: string): ContactEvent | null {
  let method: ContactEvent["params"]["contact_method"];
  try {
    const url = new URL(href);
    if (url.protocol === "tel:") method = "phone";
    else if (url.protocol === "mailto:") method = "email";
    else if (url.protocol === "https:" && url.hostname === "wa.me") method = "whatsapp";
    else return null;
  } catch {
    return null;
  }
  return {
    name: intent === "price_list" ? "price_list_click" : "contact_click",
    params: {
      contact_method: method,
      placement: safePlacements.includes(placement) ? placement : "content",
    },
  };
}

let sessionConsent: AnalyticsConsent = null;
let sessionOnly = false;

export function readConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return null;
  if (sessionOnly) return sessionConsent;
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_KEY));
  } catch {
    return sessionConsent;
  }
}

export function saveConsent(value: Exclude<AnalyticsConsent, null>) {
  sessionConsent = value;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
    sessionOnly = false;
  } catch {
    // Storage can be unavailable; retain the choice for this page session.
    sessionOnly = true;
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function subscribeConsent(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
