"use client";

import { useMemo, useState } from "react";
import { InteractivePastryGallery } from "@/components/ui/interactive-pastry-gallery";

type Product = {
  name: string;
  category: string;
  detail: string;
  image: string;
};

const sku = (file: string) => `/products-studio/sku/${file}.webp`;
const makeProducts = (
  category: string,
  detail: string,
  items: Array<[string, string]>,
): Product[] => items.map(([name, file]) => ({ name, category, detail, image: sku(file) }));

const products: Product[] = [
  ...makeProducts("Trileçe", "Tek porsiyon", [
    ["Karamel Trileçe", "karamel-trilece"],
    ["Frambuazlı Trileçe", "frambuazli-trilece"],
    ["Lotuslu Trileçe", "lotuslu-trilece"],
  ]),
  ...makeProducts("Adet Pastalar", "Tek porsiyon", [
    ["Lotuslu", "adet-lotuslu"],
    ["Fıstık Drajeli", "adet-fistik-drajeli"],
    ["Frambuazlı", "adet-frambuazli"],
    ["Çilekli", "adet-cilekli"],
    ["Meyveli", "adet-meyveli"],
    ["Antep Fıstıklı", "adet-antep-fistikli"],
    ["Beyaz Çikolatalı", "adet-beyaz-cikolatali"],
  ]),
  ...makeProducts("Pasta Çeşitleri", "1 no · bütün pasta", [
    ["Çikolatalı Ganaj", "pasta-cikolatali-ganaj"],
    ["Orman Meyveli", "pasta-orman-meyveli"],
    ["Muz Karamel Çikolata", "pasta-muz-karamel-cikolata"],
    ["Profiterollü", "pasta-profiterollu"],
    ["Çilek Çikolata", "pasta-cilek-cikolata"],
    ["Meyveli", "pasta-meyveli"],
    ["Lotus", "pasta-lotus"],
    ["Antep Fıstıklı", "pasta-antep-fistikli"],
    ["Beyaz Çikolatalı", "pasta-beyaz-cikolatali"],
  ]),
  ...makeProducts("Magnolia", "Porsiyonluk cup", [
    ["Çilekli Magnolia", "magnolia-cilekli"],
    ["Lotuslu Magnolia", "magnolia-lotuslu"],
    ["Oreolu Magnolia", "magnolia-oreolu"],
    ["Muzlu Magnolia", "magnolia-muzlu"],
    ["Profiterollü Magnolia", "magnolia-profiterollu"],
    ["Supangle", "magnolia-supangle"],
    ["Orman Meyveli Magnolia", "magnolia-orman-meyveli"],
    ["Yaban Mersinli Magnolia", "magnolia-yaban-mersinli"],
    ["Frambuazlı Magnolia", "magnolia-frambuazli"],
    ["Spoonful", "magnolia-spoonful"],
  ]),
  ...makeProducts("Ekler", "Fransız ekleri", [
    ["Orman Meyveli", "ekler-orman-meyveli"],
    ["Vanilyalı", "ekler-vanilyali"],
    ["Tiramisulu", "ekler-tiramisulu"],
    ["Çikolatalı", "ekler-cikolatali"],
    ["Çilekli", "ekler-cilekli"],
    ["Lotuslu", "ekler-lotuslu"],
    ["Hindistan Cevizli", "ekler-hindistan-cevizli"],
    ["Karışık Mix Ekler", "ekler-karisik-mix"],
  ]),
  ...makeProducts("Rulo", "Dilim servis", [
    ["Muzlu Rulo", "rulo-muzlu"],
    ["Çikolatalı Rulo", "rulo-cikolatali"],
    ["Çilekli Rulo", "rulo-cilekli"],
    ["İbiza Muzlu", "ibiza-muzlu"],
    ["İbiza Çilekli", "ibiza-cilekli"],
  ]),
  ...makeProducts("Tart", "Tek porsiyon", [
    ["Çilekli Tart", "tart-cilekli"],
    ["Orman Meyveli Tart", "tart-orman-meyveli"],
    ["Lotuslu Tart", "tart-lotuslu"],
    ["Oreolu Tart", "tart-oreolu"],
  ]),
  ...makeProducts("Cheesecake", "10 dilim · bütün", [
    ["San Sebastian", "cheesecake-san-sebastian"],
    ["Antep Fıstıklı San Sebastian", "cheesecake-antep-fistikli-san-sebastian"],
    ["Limonlu Cheesecake", "cheesecake-limonlu"],
    ["Frambuazlı Cheesecake", "cheesecake-frambuazli"],
    ["Yaban Mersinli Cheesecake", "cheesecake-yaban-mersinli"],
    ["Lotuslu Cheesecake", "cheesecake-lotuslu"],
    ["Oreolu Cheesecake", "cheesecake-oreolu"],
    ["Orman Meyveli Cheesecake", "cheesecake-orman-meyveli"],
  ]),
  ...makeProducts("Mono Pasta", "8 cm genişlik · 5 cm yükseklik", [
    ["Lotus", "mono-lotus"],
    ["Lime", "mono-lime"],
    ["Frambuaz", "mono-frambuaz"],
    ["Mango Ananas", "mono-mango-ananas"],
    ["Antep Fıstığı Dubai", "mono-antep-fistigi-dubai"],
  ]),
];

const categories = ["Tümü", ...Array.from(new Set(products.map((product) => product.category)))];
const whatsapp = (message: string) =>
  `https://wa.me/905301344525?text=${encodeURIComponent(message)}`;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
    return products.filter((product) => {
      const categoryMatches = activeCategory === "Tümü" || product.category === activeCategory;
      const queryMatches = !normalizedQuery || `${product.name} ${product.category}`.toLocaleLowerCase("tr-TR").includes(normalizedQuery);
      return categoryMatches && queryMatches;
    });
  }, [activeCategory, query]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Best Gourmet ana sayfa">
          <span className="brand-mark">BG</span>
          <span className="brand-type"><strong>Best Gourmet</strong><small>Profesyonel lezzet</small></span>
        </a>
        <button className="menu-button" type="button" aria-label="Menüyü aç veya kapat" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><span /><span /></button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Ana menü">
          <a href="#urunler" onClick={() => setMenuOpen(false)}>Ürünler</a>
          <a href="#hikayemiz" onClick={() => setMenuOpen(false)}>Hikâyemiz</a>
          <a href="#uretim" onClick={() => setMenuOpen(false)}>Üretim</a>
          <a href="/etkinlikler" onClick={() => setMenuOpen(false)}>Etkinlikler</a>
          <a className="nav-cta" href={whatsapp("Merhaba, Best Gourmet ürünleri hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer">Teklif al</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Yeni nesil profesyonel mutfaklar için</p>
          <h1>Tatlı değil,<br /><em>imza</em> bırakıyoruz.</h1>
          <p className="hero-lead">İşletmenizin menüsünü sıradanlıktan çıkaran premium tatlılar. Güvenilir üretim, güçlü sunum ve planlı tedarik.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#urunler">59 lezzeti keşfet <span>↘</span></a>
            <a className="text-link" href="/etkinlikler">Etkinlik planla <span>→</span></a>
          </div>
        </div>
        <div className="hero-products" aria-label="Öne çıkan Best Gourmet ürünleri">
          <div className="hero-main-product"><img src={sku("mono-antep-fistigi-dubai")} alt="Antep Fıstığı Dubai mono pasta" /></div>
          <div className="hero-mini hero-mini-one"><img src={sku("karamel-trilece")} alt="Karamel trileçe" /><span>Trileçe</span></div>
          <div className="hero-mini hero-mini-two"><img src={sku("ekler-karisik-mix")} alt="Karışık Fransız ekleri" /><span>Fransız ekleri</span></div>
          <div className="hero-mini hero-mini-three"><img src={sku("tart-orman-meyveli")} alt="Orman meyveli tart" /><span>Tart</span></div>
          <div className="hero-mini hero-mini-four"><img src={sku("pasta-cikolatali-ganaj")} alt="Çikolatalı ganaj pasta" /><span>Bütün pasta</span></div>
          <span className="hero-stamp">Taze üretim<br />• Her gün •</span>
        </div>
        <div className="hero-proof" aria-label="Best Gourmet öne çıkanlar">
          <div><strong>59 özel ürün</strong><span>geniş ürün seçkisi</span></div>
          <div><strong>9 kategori</strong><span>tek üretim standardı</span></div>
          <div><strong>Soğuk zincir</strong><span>güvenli teslimat</span></div>
        </div>
      </section>

      <div className="marquee" aria-label="Marka değerleri"><div><span>Menüne güç kat</span><i>✦</i><span>Sunumu yükselt</span><i>✦</i><span>Lezzeti standartlaştır</span><i>✦</i><span>Menüne güç kat</span><i>✦</i><span>Sunumu yükselt</span></div></div>

      <section className="manifesto" id="hikayemiz">
        <p className="section-index">01 / Yaklaşımımız</p>
        <div><h2>Menünüzdeki en güçlü<br />karakter.</h2><p>Best Gourmet, profesyonel mutfakların hızını iyi bilir. Her ürünü yalnızca lezzetli değil; kolay servis edilen, tutarlı ve vitrinde ilk bakışta fark edilen bir deneyim olarak tasarlarız.</p></div>
        <div className="manifesto-seal"><span>BG</span> Kaliteyi<br />standartlaştırır.</div>
      </section>

      <section className="products-section" id="urunler">
        <div className="products-heading">
          <div><p className="section-index">02 / Tam seçkimiz</p><h2>Favorini seç,<br /><em>farkını göster.</em></h2></div>
          <p>Dokuz ana kategoride profesyonel servis temposuna hazır, sunumu güçlü ve lezzeti tutarlı 59 ayrı ürün.</p>
        </div>
        <div className="catalog-tools">
          <div className="category-tabs" role="group" aria-label="Ürün kategorileri">
            {categories.map((category) => <button type="button" key={category} className={activeCategory === category ? "is-active" : ""} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          <label className="product-search"><span>Ürün ara</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Lotus, frambuaz, mono…" /></label>
        </div>
        <div className="catalog-status"><strong>{visibleProducts.length}</strong> ürün gösteriliyor</div>
        <div className="product-grid" aria-live="polite">
          {visibleProducts.map((product, index) => (
            <article className="product-card" key={`${product.category}-${product.name}`}>
              <div className="product-image-wrap">
                <img src={product.image} alt={product.name} loading={index > 7 ? "lazy" : "eager"} />
                <span className="product-number">{String(index + 1).padStart(2, "0")}</span>
                <a className="product-action" href={whatsapp(`Merhaba, ${product.name} (${product.category}) için bilgi ve fiyat almak istiyorum.`)} target="_blank" rel="noreferrer" aria-label={`${product.name} için WhatsApp'tan bilgi al`}>↗</a>
              </div>
              <div className="product-info"><p>{product.category}</p><h3>{product.name}</h3><span>{product.detail}</span></div>
            </article>
          ))}
          {visibleProducts.length === 0 && <p className="empty-state">Aramana uygun ürün bulunamadı. Başka bir lezzet deneyebilirsin.</p>}
        </div>
      </section>

      <section className="production" id="uretim">
        <div className="production-photo"><img src={sku("magnolia-lotuslu")} alt="Best Gourmet üretiminden Lotuslu Magnolia" /></div>
        <div className="production-copy"><p className="section-index light">03 / Üretim standardı</p><h2>Her servis,<br />aynı <em>iyi his.</em></h2><p>Seçilmiş hammaddeler, kontrollü üretim süreçleri ve soğuk zincir teslimatıyla işletmenize yalnızca ürün değil, güvenilir bir lezzet standardı getiriyoruz.</p><ul><li><span>01</span> Günlük ve planlı üretim</li><li><span>02</span> Standart reçete, tutarlı sonuç</li><li><span>03</span> İşletmeye özel ürün planlaması</li></ul></div>
      </section>

      <section className="events" id="etkinlik">
        <div className="events-intro"><p className="section-index">04 / Etkinlik üretimi</p><h2>Her kutlamaya özel,<br /><em>tek bir iyi standart.</em></h2><p>Düğünden doğum gününe, özel davetten kurumsal buluşmaya; menüyü, sunumu ve servis akışını etkinliğinizin ihtiyacına göre tek bir planda buluşturuyoruz.</p><a className="button button-primary" href="/etkinlikler">Tüm etkinlikleri keşfet <span>↗</span></a></div>
        <InteractivePastryGallery
          collectionName="Etkinlik seçkisi"
          items={[
            { id: "frambuaz", image: sku("mono-frambuaz"), title: "Frambuaz Mono", category: "Mono Pasta" },
            { id: "fistik", image: sku("adet-fistik-drajeli"), title: "Fıstık Drajeli", category: "Adet Pasta" },
            { id: "magnolia", image: sku("magnolia-yaban-mersinli"), title: "Yaban Mersinli", category: "Magnolia" },
            { id: "ekler", image: sku("ekler-karisik-mix"), title: "Karışık Mix", category: "Fransız Ekleri" },
            { id: "tart", image: sku("tart-orman-meyveli"), title: "Orman Meyveli", category: "Tart" },
          ]}
        />
        <div className="event-cards">
          <article><span>01</span><h3>Düğün Etkinlikleri</h3><p>Düğün, nişan, kına ve nikâh davetlerine menü, sunum ve servis planı.</p><a href="/etkinlikler/dugun">Detayları incele ↗</a></article>
          <article><span>02</span><h3>Doğum Günü</h3><p>Çocuk, yetişkin ve temalı kutlamalara kişiye özel pasta ve ikram kurgusu.</p><a href="/etkinlikler/dogum-gunu">Detayları incele ↗</a></article>
          <article><span>03</span><h3>Özel Günler</h3><p>Yıldönümü, mezuniyet ve butik davetler için esnek lezzet ve sunum seçenekleri.</p><a href="/etkinlikler/ozel-gun">Detayları incele ↗</a></article>
          <article><span>04</span><h3>Kurumsal Etkinlikler</h3><p>Toplantı, lansman, açılış ve fuarlar için ölçeklenebilir servis çözümleri.</p><a href="/etkinlikler/kurumsal">Detayları incele ↗</a></article>
        </div>
        <div className="event-flow"><span>İhtiyacı dinleme</span><i>→</i><span>Menü & sunum planı</span><i>→</i><span>Üretim, kurulum & servis</span></div>
      </section>

      <section className="contact" id="iletisim">
        <p className="section-index">05 / Birlikte büyüyelim</p><h2>Vitrininizi birlikte<br /><em>unutulmaz</em> yapalım.</h2>
        <div className="contact-row"><p>Ürün kataloğu, etkinlik üretimi, fiyatlandırma ve işletmenize özel seçenekler için bize ulaşın.</p><div><a className="button button-dark" href={whatsapp("Merhaba, Best Gourmet ürünleri için teklif almak istiyorum.")} target="_blank" rel="noreferrer">WhatsApp’tan yaz <span>↗</span></a><a className="phone-link" href="tel:+905301344525">+90 530 134 45 25</a><a className="mail-link" href="mailto:info@gourmetbest.tr">info@gourmetbest.tr</a></div></div>
      </section>

      <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">BG</span><span className="brand-type"><strong>Best Gourmet</strong><small>Profesyonel lezzet</small></span></a><p>Premium tatlılar · Etkinlik üretimi · Güçlü sunum</p><p>© {new Date().getFullYear()} Best Gourmet</p></footer>
    </main>
  );
}
