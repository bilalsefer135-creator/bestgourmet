"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  GA_ID, canTrack, cleanPageUrl, contactEvent, isProductionHost,
  readConsent, saveConsent, subscribeConsent,
} from "@/lib/analytics";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    __bestGourmetAnalytics?: boolean;
    "ga-disable-G-M251PGJTLK"?: boolean;
  }
}

const subscribeReady = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
const serverConsent = () => null;
const deniedAds = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };

function enableAnalytics() {
  window["ga-disable-G-M251PGJTLK"] = false;
  if (window.__bestGourmetAnalytics) {
    window.gtag?.("consent", "update", { ...deniedAds, analytics_storage: "granted" });
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // Match Google's documented gtag queue protocol.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag("consent", "default", { ...deniedAds, analytics_storage: "granted" });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: cleanPageUrl(window.location.href),
    page_referrer: cleanPageUrl(document.referrer),
  });
  window.__bestGourmetAnalytics = true;

  const script = document.createElement("script");
  script.id = "best-gourmet-google-tag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function disableAnalytics() {
  window["ga-disable-G-M251PGJTLK"] = true;
  window.gtag?.("consent", "update", { ...deniedAds, analytics_storage: "denied" });
  const domains = ["", window.location.hostname, `.${window.location.hostname}`, ".bestgourmet.online"];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.trim().split("=")[0];
    if (name === "_ga" || name.startsWith("_ga_")) {
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; Path=/${domain ? `; Domain=${domain}` : ""}; SameSite=Lax`;
      }
    }
  }
}

function contactPlacement(anchor: HTMLAnchorElement) {
  if (anchor.dataset.analyticsPlacement) return anchor.dataset.analyticsPlacement;
  if (anchor.closest("header")) return "header";
  if (anchor.closest("footer")) return "footer";
  if (anchor.closest(".product-card")) return "product_card";
  if (anchor.closest(".price-list-cta")) return "price_list";
  if (anchor.closest("#iletisim")) return "contact";
  return "content";
}

export default function AnalyticsConsent() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, serverConsent);
  const ready = useSyncExternalStore(subscribeReady, clientReady, serverReady);
  const pathname = usePathname();
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const preferencesButton = useRef<HTMLButtonElement>(null);
  const lastPage = useRef("");
  const visible = ready && (consent === null || preferencesOpen);

  useEffect(() => {
    if (!ready) return;
    if (!canTrack(consent, window.location.hostname)) {
      if (consent !== "granted") disableAnalytics();
      lastPage.current = "";
      return;
    }
    enableAnalytics();
    const pageLocation = cleanPageUrl(window.location.href);
    if (lastPage.current !== pageLocation) {
      window.gtag?.("event", "page_view", {
        page_location: pageLocation,
        page_title: document.title,
        page_referrer: cleanPageUrl(document.referrer),
      });
      lastPage.current = pageLocation;
    }

    function onClick(event: MouseEvent) {
      if (!canTrack(readConsent(), window.location.hostname) || !(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      const measurement = contactEvent(anchor.href, contactPlacement(anchor), anchor.dataset.analyticsIntent);
      if (measurement) window.gtag?.("event", measurement.name, measurement.params);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent, pathname, ready]);

  function choose(choice: "granted" | "denied") {
    if (choice === "denied") disableAnalytics();
    saveConsent(choice);
    setPreferencesOpen(false);
    preferencesButton.current?.focus();
  }

  return (
    <>
      <button className="analytics-preferences" type="button" ref={preferencesButton}
        aria-expanded={visible} aria-controls="analytics-preferences-panel"
        onClick={() => setPreferencesOpen((open) => !open)}>Çerez tercihleri</button>
      {visible && <aside className="analytics-banner" id="analytics-preferences-panel"
        aria-label="Analitik çerez tercihleri">
        <div>
          <strong>Ölçüm tercihi size ait.</strong>
          <p>İzin verirseniz Google Analytics ile ziyaretleri ve iletişim düğmelerine tıklamaları ölçeriz.
            Formlara yazdığınız bilgileri ölçüm olaylarına eklemeyiz. Reklam kişiselleştirmesi kullanmayız.
            Reddetseniz de siteyi kullanabilirsiniz; tercihinizi bu düğmeden değiştirebilirsiniz.</p>
          <a href="https://policies.google.com/privacy?hl=tr" target="_blank" rel="noreferrer">Google gizlilik açıklaması ↗</a>
          {!isProductionHost(window.location.hostname) && <p className="analytics-preview-note">Bu önizlemede Analytics ölçümü devre dışıdır.</p>}
        </div>
        <div className="analytics-actions">
          <button type="button" onClick={() => choose("denied")}>Analitiği reddet</button>
          <button type="button" onClick={() => choose("granted")}>Analitiğe izin ver</button>
          {consent !== null && <button className="analytics-close" type="button" onClick={() => setPreferencesOpen(false)}>Kapat</button>}
        </div>
      </aside>}
    </>
  );
}
