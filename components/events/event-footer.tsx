import Link from "next/link";

export function EventFooter() {
  return (
    <footer>
      <Link className="brand footer-brand" href="/">
        <img className="brand-logo footer-logo" src="/brand/best-gourmet-logo.jpeg" alt="Best Gourmet" />
      </Link>
      <p>Premium tatlılar · Etkinlik üretimi · Güçlü sunum</p>
      <p>© {new Date().getFullYear()} Best Gourmet</p>
    </footer>
  );
}
