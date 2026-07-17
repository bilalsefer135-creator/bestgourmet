import Link from "next/link";

export function EventFooter() {
  return (
    <footer>
      <Link className="brand footer-brand" href="/">
        <span className="brand-mark">BG</span>
        <span className="brand-type"><strong>Best Gourmet</strong><small>Profesyonel lezzet</small></span>
      </Link>
      <p>Premium tatlılar · Etkinlik üretimi · Güçlü sunum</p>
      <p>© {new Date().getFullYear()} Best Gourmet</p>
    </footer>
  );
}
