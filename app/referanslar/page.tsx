import type { Metadata } from "next";
import { EventFooter } from "@/components/events/event-footer";
import { EventHeader } from "@/components/events/event-header";

export const metadata: Metadata = {
  title: "Referanslarımız | Best Gourmet",
  description: "Best Gourmet’in kafe, restoran, otel ve etkinlik iş birlikleri için referans alanı.",
};

const referenceGroups = [
  { number: "07", title: "Kafe", body: "Vitrin seçkisi, porsiyon planı ve servis hızına uygun ürün çözümleri." },
  { number: "01", title: "Pastane", body: "Ürün çeşitliliği, günlük üretim ritmi ve güçlü vitrin sunumu için birlikte çalışıyoruz." },
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
          <p>Şu anda 7 kafe ve 1 pastane ile çalışıyor; her işletmenin ritmine uygun, düzenli ve güçlü bir tatlı seçkisi oluşturuyoruz.</p>
          <a className="text-link" href="#alanlar">İş ortaklıklarını gör <span>↓</span></a>
        </div>
      </section>

      <section className="reference-stage" id="alanlar">
        <div className="reference-stage-heading">
          <p className="section-index">01 / Şu an birlikte çalıştıklarımız</p>
          <h2>Farklı işletmeler,<br /><em>aynı iyi standart.</em></h2>
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
        <p className="section-index light">02 / Çalışma yaklaşımımız</p>
        <div><h2>İsimlerden önce,<br /><em>sağlam iş</em> gelir.</h2><p>Her işletmenin servis temposu ve vitrini farklıdır. Best Gourmet seçkisini; menü yapısına, satış ritmine ve sunum ihtiyacına göre birlikte planlarız. Ortak noktamız ise değişmez: her serviste aynı güveni veren ürünler.</p></div>
      </section>

      <section className="brand-page-cta">
        <p className="section-index">03 / Yeni iş birlikleri</p>
        <h2>Sıradaki güzel işi<br /><em>birlikte üretelim.</em></h2>
        <a className="button button-dark" href="https://wa.me/905015740522?text=Merhaba%2C%20Best%20Gourmet%20ile%20iş%20birliği%20hakkında%20görüşmek%20istiyorum." target="_blank" rel="noreferrer">İş birliği konuşalım <span>↗</span></a>
      </section>
      <EventFooter />
    </main>
  );
}
