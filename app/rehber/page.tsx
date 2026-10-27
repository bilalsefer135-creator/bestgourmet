import Link from "next/link";
import { EventFooter } from "@/components/events/event-footer";
import { EventHeader } from "@/components/events/event-header";
import { guides, serializeGuideJsonLd } from "@/lib/guides";
import { pageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = pageMetadata(
  "Kafe ve Pastaneler için Tatlı Rehberi | Best Gourmet",
  "İstanbul ve çevresindeki kafe ve pastaneler için tatlı tedarikçisi seçimi, toptan fiyat karşılaştırması ve menü planlama rehberleri.",
  "/rehber",
);

export default function GuidesPage() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana sayfa", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Rehber", item: `${SITE_URL}/rehber` },
    ],
  };

  return (
    <main className="guide-page">
      <EventHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeGuideJsonLd(breadcrumbs) }} />
      <div className="guide-container">
        <nav className="guide-breadcrumbs" aria-label="İçerik yolu"><ol><li><Link href="/">Ana sayfa</Link></li><li aria-current="page">Rehber</li></ol></nav>
        <header className="guide-hub-intro">
          <p className="eyebrow"><span /> İşletmeler için rehber</p>
          <h1>Kafe ve pastaneler için tatlı rehberi</h1>
          <p className="guide-lead">Doğru ürünü seçmek, iyi sorularla başlar. İstanbul ve çevresindeki işletmeler için tedarik, maliyet ve menü kararlarını birlikte düşünmeye yardımcı olan notlar.</p>
          <p className="guide-byline">Best Gourmet editoryal</p>
        </header>
        <section className="guide-card-grid" aria-label="Tatlı satın alma ve menü rehberleri">
          {guides.map((guide, index) => (
            <Link className="guide-card" href={`/rehber/${guide.slug}`} key={guide.slug}>
              <span className="guide-card-index">0{index + 1} / Rehber</span>
              <h2>{guide.title}</h2>
              <p>{guide.description}</p>
              <span className="guide-card-action">Rehberi okuyun <span aria-hidden="true">↗</span></span>
            </Link>
          ))}
        </section>
        <section className="guide-contact" aria-labelledby="guide-contact-title">
          <div><p className="section-index">İşletmeniz için sonraki adım</p><h2 id="guide-contact-title">Ürünleri birlikte değerlendirelim.</h2><p>İlgilendiğiniz çeşitleri, servis biçiminizi ve bulunduğunuz bölgeyi paylaşın. Güncel ürün bilgisi ve sipariş koşullarını görüşmede netleştirelim.</p></div>
          <div className="guide-contact-actions"><a className="button button-primary" href="https://wa.me/905015740522">WhatsApp ile görüşün <span aria-hidden="true">↗</span></a><Link className="text-link" href="/urunler/cafe">Cafe ürünlerini inceleyin</Link><Link className="text-link" href="/urunler/pastane">Pastane ürünlerini inceleyin</Link></div>
        </section>
      </div>
      <EventFooter />
    </main>
  );
}
