import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventFooter } from "@/components/events/event-footer";
import { EventHeader } from "@/components/events/event-header";
import { getGuide, guides, serializeGuideJsonLd } from "@/lib/guides";
import { pageMetadata, SITE_URL } from "@/lib/seo";

type GuidePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const metadata = pageMetadata(`${guide.title} | Best Gourmet`, guide.description, `/rehber/${guide.slug}`);
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article" } };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const url = `${SITE_URL}/rehber/${guide.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        inLanguage: "tr-TR",
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: "Best Gourmet", url: SITE_URL },
        publisher: { "@type": "Organization", name: "Best Gourmet", url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Rehber", item: `${SITE_URL}/rehber` },
          { "@type": "ListItem", position: 3, name: guide.title, item: url },
        ],
      },
    ],
  };

  return (
    <main className="guide-page">
      <EventHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeGuideJsonLd(structuredData) }} />
      <div className="guide-container">
        <nav className="guide-breadcrumbs" aria-label="İçerik yolu"><ol><li><Link href="/">Ana sayfa</Link></li><li><Link href="/rehber">Rehber</Link></li><li aria-current="page">{guide.title}</li></ol></nav>
        <article>
          <header className="guide-article-intro">
            <p className="eyebrow"><span /> İşletmeler için rehber</p>
            <h1>{guide.title}</h1>
            <p className="guide-lead">{guide.intro}</p>
            <p className="guide-byline">Best Gourmet editoryal</p>
          </header>
          <div className="guide-reading-layout">
            <aside className="guide-contents">
              <nav aria-label="Rehberin bölümleri"><p className="section-index">Bu rehberde</p><ol>{guide.sections.map((section, index) => <li key={section.heading}><a href={`#bolum-${index + 1}`}>{section.heading}</a></li>)}</ol></nav>
            </aside>
            <div className="guide-body">
              {guide.sections.map((section, index) => (
                <section id={`bolum-${index + 1}`} key={section.heading}>
                  <p className="guide-section-index" aria-hidden="true">0{index + 1}</p>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                </section>
              ))}
            </div>
          </div>
        </article>
        <section className="guide-related" aria-labelledby="guide-products-title"><div><p className="section-index">Katalogdan devam edin</p><h2 id="guide-products-title">İlgili ürün grupları</h2></div><ul>{guide.relatedLinks.map((link) => <li key={link.href}><Link href={link.href}>{link.label}<span aria-hidden="true">↗</span></Link></li>)}</ul></section>
        <section className="guide-contact" aria-labelledby="guide-contact-title"><div><p className="section-index">İşletmeniz için sonraki adım</p><h2 id="guide-contact-title">Sorularınızı birlikte netleştirelim.</h2><p>İlgilendiğiniz ürünleri ve bulunduğunuz bölgeyi paylaşın. Fiyat, sipariş miktarı ve teslimat kapsamını işletmenizin ihtiyacına göre görüşelim.</p></div><a className="button button-primary" href="https://wa.me/905015740522">WhatsApp ile görüşün <span aria-hidden="true">↗</span></a></section>
        <nav className="guide-more" aria-label="Diğer rehberler"><p className="section-index">Okumaya devam edin</p>{guides.filter((item) => item.slug !== guide.slug).map((item) => <Link href={`/rehber/${item.slug}`} key={item.slug}>{item.title}<span aria-hidden="true">↗</span></Link>)}<Link href="/rehber">Tüm rehberler<span aria-hidden="true">←</span></Link></nav>
      </div>
      <EventFooter />
    </main>
  );
}
