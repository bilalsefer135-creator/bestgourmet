import Link from "next/link";

export function EventFooter() {
  return (
    <footer>
      <Link className="brand footer-brand" href="/">
        <img className="brand-logo footer-logo" src="/brand/best-gourmet-logo.jpeg" alt="Best Gourmet" />
      </Link>
      <div className="event-footer-copy">
        <p>Premium tatlılar · Etkinlik üretimi · Güçlü sunum</p>
        <nav className="event-footer-links" aria-label="Alt menü"><Link href="/urunler/cafe">Cafe ürünleri</Link><Link href="/urunler/pastane">Pastane ürünleri</Link><Link href="/rehber">Rehber</Link></nav>
      </div>
      <p>© {new Date().getFullYear()} Best Gourmet</p>
    </footer>
  );
}
