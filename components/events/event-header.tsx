"use client";

import { useState } from "react";
import Link from "next/link";

export function EventHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header event-site-header">
      <Link className="brand" href="/" aria-label="Best Gourmet ana sayfa">
        <img className="brand-logo" src="/brand/best-gourmet-logo.jpeg" alt="Best Gourmet" />
      </Link>
      <button className="menu-button" type="button" aria-label="Menüyü aç veya kapat" aria-expanded={open} onClick={() => setOpen((value) => !value)}><span /><span /></button>
      <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Ana menü">
        <Link href="/#urunler" onClick={() => setOpen(false)}>Ürünler</Link>
        <Link href="/hikayemiz" onClick={() => setOpen(false)}>Hikâyemiz</Link>
        <Link href="/referanslar" onClick={() => setOpen(false)}>Referanslarımız</Link>
        <Link href="/#uretim" onClick={() => setOpen(false)}>Üretim</Link>
        <Link href="/etkinlikler" onClick={() => setOpen(false)}>Etkinlikler</Link>
        <Link href="/rehber" onClick={() => setOpen(false)}>Rehber</Link>
        <Link className="nav-cta" href="/#iletisim" onClick={() => setOpen(false)}>Teklif al</Link>
      </nav>
    </header>
  );
}
