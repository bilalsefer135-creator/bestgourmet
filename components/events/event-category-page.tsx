import { EventCategory, eventCategoryList, eventProcess } from "@/lib/event-data";
import { EventFooter } from "./event-footer";
import { EventHeader } from "./event-header";
import { EventInquiryForm } from "./event-inquiry-form";

export function EventCategoryPage({ category }: { category: EventCategory }) {
  const whatsapp = `https://wa.me/905301344525?text=${encodeURIComponent(`Merhaba, ${category.eyebrow} için bilgi ve teklif almak istiyorum.`)}`;

  return (
    <main className="event-page">
      <EventHeader />
      <section className="event-category-hero">
        <div className="event-category-hero-copy">
          <p className="eyebrow"><span /> {category.eyebrow}</p>
          <h1>{category.title}</h1>
          <p>{category.lead}</p>
          <div className="event-category-actions">
            <a className="button button-primary" href="#teklif">Teklif iste <span>↓</span></a>
            <a className="text-link" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp <span>↗</span></a>
          </div>
        </div>
        <figure className="event-category-cover">
          <img src={category.cover} alt={`${category.eyebrow} için Best Gourmet konsept görseli`} />
          <figcaption>Best Gourmet etkinlik yaklaşımı · Konsept görsel</figcaption>
        </figure>
      </section>

      <nav className="event-category-nav" aria-label="Etkinlik kategorileri">
        {eventCategoryList.map((item) => <a key={item.slug} className={item.slug === category.slug ? "is-active" : ""} href={`/etkinlikler/${item.slug}`}><span>{item.number}</span>{item.navLabel}</a>)}
      </nav>

      <section className="event-detail-section event-services">
        <div className="event-section-heading"><p className="section-index">01 / Hizmet kapsamı</p><h2>İhtiyacınıza göre<br /><em>tek bir bütün.</em></h2></div>
        <div className="event-service-grid">
          {category.services.map((service, index) => <article key={service}><span>{String(index + 1).padStart(2, "0")}</span><h3>{service}</h3></article>)}
        </div>
      </section>

      <section className="event-fit-section">
        <div className="event-fit-copy">
          <p className="section-index light">02 / Kimin için?</p>
          <h2>İyi bir etkinlik,<br />sizi <em>yansıtır.</em></h2>
          <p>Hazır bir paketi dayatmak yerine, davetin amacını ve misafir deneyimini anlayarak işe başlarız.</p>
        </div>
        <div className="event-fit-lists">
          <div><h3>Bu hizmet size uygunsa</h3><ul>{category.whoFor.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>Kişiselleştirilebilir alanlar</h3><ul>{category.customizations.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </section>

      <section className="event-detail-section event-process-section">
        <div className="event-section-heading"><p className="section-index">03 / Organizasyon süreci</p><h2>İlk fikirden<br /><em>son servise.</em></h2></div>
        <ol className="event-process-grid">
          {eventProcess.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.body}</p></li>)}
        </ol>
      </section>

      <section className="event-advantages">
        <p className="section-index light">04 / Best Gourmet yaklaşımı</p>
        <div className="event-advantage-grid">{category.benefits.map((benefit) => <article key={benefit.title}><h3>{benefit.title}</h3><p>{benefit.body}</p></article>)}</div>
      </section>

      <section className="event-detail-section event-gallery-section">
        <div className="event-section-heading"><p className="section-index">05 / Menü ve atmosfer</p><h2>Lezzet, sunum ve<br /><em>mekân aynı dilde.</em></h2></div>
        <div className="event-gallery">
          {category.gallery.map((image, index) => <figure key={image.src} className={index === 0 ? "is-wide" : ""}><img src={image.src} alt={image.alt} loading={index === 0 ? "eager" : "lazy"} /><figcaption>{image.label}</figcaption></figure>)}
        </div>
        <p className="event-gallery-disclaimer">Etkinlik atmosferi görselleri temsilî konsept çalışmalarıdır. Ürün görselleri seçkiyi örnekler; nihai menü ve sunum teklif kapsamında netleşir.</p>
      </section>

      <section className="event-detail-section event-faq-section">
        <div className="event-section-heading"><p className="section-index">06 / Merak edilenler</p><h2>Kısa ve<br /><em>net cevaplar.</em></h2></div>
        <div className="event-faq-list">{category.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <section className="event-form-section" id="teklif"><EventInquiryForm defaultEvent={category.eyebrow.replace("etkinlikleri", "Etkinlikleri")} /></section>
      <EventFooter />
    </main>
  );
}
