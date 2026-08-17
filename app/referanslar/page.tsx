import type { Metadata } from "next";
import { EventFooter } from "@/components/events/event-footer";
import { EventHeader } from "@/components/events/event-header";

export const metadata: Metadata = {
  title: "Referanslarımız | Best Gourmet",
  description: "Best Gourmet’in kafe, restoran, otel ve etkinlik iş birlikleri için referans alanı.",
};

const referenceGroups = [
  { number: "01", title: "Kafe & Coffee Shop", body: "Vitrin seçkisi, porsiyon planı ve servis hızına uygun ürün çözümleri." },
  { number: "02", title: "Restoran & Otel", body: "Menü karakterine uyum sağlayan, sunumu ve gramajı standart tatlı üretimi." },
  { number: "03", title: "Etkinlik & Organizasyon", body: "Davet ölçeğine göre planlanan üretim, sunum ve kontrollü teslimat akışı." },
];

export default function ReferencesPage() {
  return (
    <main className="brand-page references-page">
      <EventHeader />
      <section className="brand-page-hero reference-hero">
        <div>
          <p className="eyebrow"><span /> Birlikte ürettiklerimiz</p>
          <h1>Her iyi iş birliği,<br />vitrinde kalıcı bir<br /><em>iz bırakır.</em></h1>
        </div>
        <div className="brand-page-hero-copy">
          <p>Referanslarımızı, birlikte çalıştığımız markaların onayı ve güncel proje bilgileriyle burada paylaşacağız. Şimdilik iş birliği alanlarımızı ve çalışma yaklaşımımızı inceleyebilirsiniz.</p>
          <a className="text-link" href="#alanlar">Çalışma alanları <span>↓</span></a>
        </div>
      </section>

      <section className="reference-stage" id="alanlar">
        <div className="reference-stage-heading">
          <p className="section-index">01 / İş birliği alanları</p>
          <h2>İhtiyaca göre şekillenen,<br /><em>tek bir kalite anlayışı.</em></h2>
        </div>
        <div className="reference-grid">
          {referenceGroups.map((group) => (
            <article key={group.number}>
              <span>{group.number}</span>
              <div className="reference-placeholder"><i>BG</i><small>Referans alanı</small></div>
              <h3>{group.title}</h3>
              <p>{group.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reference-note">
        <p className="section-index light">02 / Yakında</p>
        <div><h2>İsimleri değil,<br /><em>gerçek işleri</em> paylaşacağız.</h2><p>Bu sayfa; onaylanan marka logoları, proje fotoğrafları ve kısa iş birliği notları geldikçe güncellenecek. Böylece burada yalnızca doğrulanmış ve güncel referanslar yer alacak.</p></div>
      </section>

      <section className="brand-page-cta">
        <p className="section-index">03 / Yeni iş birlikleri</p>
        <h2>Sıradaki güzel işi<br /><em>birlikte üretelim.</em></h2>
        <a className="button button-dark" href="https://wa.me/905301344525?text=Merhaba%2C%20Best%20Gourmet%20ile%20iş%20birliği%20hakkında%20görüşmek%20istiyorum." target="_blank" rel="noreferrer">İş birliği konuşalım <span>↗</span></a>
      </section>
      <EventFooter />
    </main>
  );
}
