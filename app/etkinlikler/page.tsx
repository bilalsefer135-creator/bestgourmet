import type { Metadata } from "next";
import { EventFooter } from "@/components/events/event-footer";
import { EventHeader } from "@/components/events/event-header";
import { EventInquiryForm } from "@/components/events/event-inquiry-form";
import { eventCategoryList, eventProcess } from "@/lib/event-data";

export const metadata: Metadata = {
  title: "Etkinlik Hizmetleri | Best Gourmet",
  description: "Düğün, doğum günü, özel gün ve kurumsal etkinlikler için Best Gourmet tatlı, pasta, sunum ve servis planlaması.",
};

export default function EventsPage() {
  return (
    <main className="event-page event-hub-page">
      <EventHeader />
      <section className="event-hub-hero">
        <p className="eyebrow"><span /> Best Gourmet etkinlikleri</p>
        <h1>Her kutlamanın<br />kendine ait bir <em>ritmi</em> var.</h1>
        <p>Menüden sunuma, üretimden servis akışına kadar etkinliğinizi tek bir özenli plan içinde ele alıyoruz.</p>
        <a className="button button-primary" href="#kategoriler">Etkinliğini seç <span>↓</span></a>
        <div className="event-hub-visuals" aria-label="Etkinlik kategorilerinden konsept görseller">
          {eventCategoryList.map((item) => <figure key={item.slug}><img src={item.cover} alt={`${item.eyebrow} konsept görseli`} /><figcaption>{item.navLabel}</figcaption></figure>)}
        </div>
      </section>

      <section className="event-detail-section event-hub-categories" id="kategoriler">
        <div className="event-section-heading"><p className="section-index">01 / Etkinlik kategorileri</p><h2>Doğru başlangıç,<br /><em>doğru kategori.</em></h2><p>Etkinliğinizi seçerek hizmet kapsamını, planlama adımlarını, örnek menü yaklaşımını ve sık sorulan soruları inceleyin.</p></div>
        <div className="event-category-card-grid">
          {eventCategoryList.map((item) => (
            <a href={`/etkinlikler/${item.slug}`} key={item.slug}>
              <img src={item.cover} alt={`${item.eyebrow} konsept görseli`} loading="lazy" />
              <span>{item.number} / Etkinlik</span>
              <h2>{item.eyebrow}</h2>
              <p>{item.short}</p>
              <strong>Detayları incele ↗</strong>
            </a>
          ))}
        </div>
      </section>

      <section className="event-hub-process">
        <div><p className="section-index light">02 / Planlı ilerleyiş</p><h2>Sekiz adımda<br /><em>tek bir akış.</em></h2><p>Her etkinlik farklıdır; ancak iyi bir operasyonun temel adımları nettir. Kapsam, onay ve uygulama sürecini şeffaf bir sırada yürütürüz.</p></div>
        <ol>{eventProcess.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol>
      </section>

      <section className="event-hub-note">
        <p>Geçmiş etkinliklere ait doğrulanmış müşteri yorumu veya referans paylaşımı bu içerikte kullanılmamıştır.</p>
        <h2>Önce ihtiyacı anlayalım;<br /><em>sonra en iyi planı kuralım.</em></h2>
      </section>
      <section className="event-form-section" id="teklif"><EventInquiryForm /></section>
      <EventFooter />
    </main>
  );
}
