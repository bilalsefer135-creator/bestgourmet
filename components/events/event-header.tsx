"use client";

import { useState } from "react";
import Link from "next/link";

export function EventHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header event-site-header">
      <Link className="brand" href="/" aria-label="Best Gourmet ana sayfa">
        <span className="brand-mark">BG</span>
        <span className="brand-type"><strong>Best Gourmet</strong><small>Profesyonel lezzet</small></span>
      </Link>
      <button className="menu-button" type="button" aria-label="Menüyü aç veya kapat" aria-expanded={open} onClick={() => setOpen((value) => !value)}><span /><span /></button>
      <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Etkinlik menüsü">
        <a href="/etkinlikler" onClick={() => setOpen(false)}>Tüm etkinlikler</a>
        <a href="/etkinlikler/dugun" onClick={() => setOpen(false)}>Düğün</a>
        <a href="/etkinlikler/dogum-gunu" onClick={() => setOpen(false)}>Doğum günü</a>
        <a href="/etkinlikler/ozel-gun" onClick={() => setOpen(false)}>Özel gün</a>
        <a href="/etkinlikler/kurumsal" onClick={() => setOpen(false)}>Kurumsal</a>
        <a className="nav-cta" href="#teklif" onClick={() => setOpen(false)}>Teklif al</a>
      </nav>
    </header>
  );
}
