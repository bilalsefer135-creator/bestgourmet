"use client";

import { useMemo, useState } from "react";

type Product = { name: string; category: string; detail: string; image: string };

const studio = (file: string) => `/products-studio/${file}`;
const group = (category: string, detail: string, image: string, names: string[]): Product[] =>
  names.map((name) => ({ name, category, detail, image: studio(image) }));

const products: Product[] = [
  ...group("Trileçe", "Tek porsiyon", "category-trilece.png", ["Karamel Trileçe", "Frambuazlı Trileçe", "Lotuslu Trileçe"]),
  ...group("Adet Pastalar", "Tek porsiyon", "category-adet-pasta.png", ["Lotuslu", "Fıstık Drajeli", "Frambuazlı", "Çilekli", "Meyveli", "Antep Fıstıklı", "Beyaz Çikolatalı"]),
  ...group("Pasta Çeşitleri", "1 no · bütün pasta", "category-butun-pasta.png", ["Çikolatalı Ganaj", "Orman Meyveli", "Muz Karamel Çikolata", "Profiterollü", "Çilek Çikolata", "Meyveli", "Lotus", "Antep Fıstıklı", "Beyaz Çikolatalı"]),
  ...group("Magnolia", "270 cc · kapaklı", "muzlu-magnolia.png", ["Çilekli Magnolia", "Lotuslu Magnolia", "Oreolu Magnolia", "Muzlu Magnolia", "Profiterollü Magnolia", "Supangle", "Orman Meyveli Magnolia", "Yaban Mersinli Magnolia", "Frambuazlı Magnolia", "Spoonful"]),
  ...group("Ekler", "Fransız ekleri", "category-ekler.png", ["Orman Meyveli", "Vanilyalı", "Tiramisulu", "Çikolatalı", "Çilekli", "Lotuslu", "Hindistan Cevizli", "Karışık Mix Ekler"]),
  ...group("Rulo", "Dilim servis", "rulo-cikolatali.png", ["Muzlu Rulo", "Çikolatalı Rulo", "Çilekli Rulo", "İbiza Muzlu", "İbiza Çilekli"]),
  ...group("Tart", "Tek porsiyon", "category-tart.png", ["Çilekli Tart", "Orman Meyveli Tart", "Lotuslu Tart", "Oreolu Tart"]),
  ...group("Cheesecake", "10 dilim · bütün", "san-sebastian.png", ["San Sebastian", "Antep Fıstıklı San Sebastian", "Limonlu Cheesecake", "Frambuazlı Cheesecake", "Yaban Mersinli Cheesecake", "Lotuslu Cheesecake", "Oreolu Cheesecake", "Orman Meyveli Cheesecake"]),
  ...group("Mono Pasta", "8 cm genişlik · 5 cm yükseklik", "category-mono-pasta.png", ["Lotus", "Lime", "Frambuaz", "Mango Ananas", "Antep Fıstığı Dubai"]),
];

const imageOverrides: Record<string, string> = {
  "Çilekli Magnolia": studio("cilekli-magnolia.png"),
  "Lotuslu Magnolia": studio("lotuslu-magnolia.png"),
  "Profiterollü Magnolia": studio("profiterollu-magnolia.png"),
  "Limonlu Cheesecake": studio("limonlu-cheesecake.png"),
  "Frambuazlı Cheesecake": studio("frambuazli-cheesecake.png"),
  "Lotuslu Cheesecake": studio("lotus-cheesecake.png"),
};

products.forEach((product) => { if (imageOverrides[product.name]) product.image = imageOverrides[product.name]; });

const categories = ["Tümü", "Trileçe", "Adet Pastalar", "Pasta Çeşitleri", "Magnolia", "Ekler", "Rulo", "Tart", "Cheesecake", "Mono Pasta"];

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
        <a className="brand" href="#top" aria-label="Best Gourmet ana sayfa"><span className="brand-mark">BG</span><span className="brand-type"><strong>Best Gourmet</strong><small>Profesyonel lezzet</small></span></a>
        <button className="menu-button" type="button" aria-label="Menüyü aç veya kapat" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><span /><span /></button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Ana menü">
          <a href="#urunler" onClick={() => setMenuOpen(false)}>Ürünler</a>
          <a href="#hikayemiz" onClick={() => setMenuOpen(false)}>Hikâyemiz</a>
          <a href="#uretim" onClick={() => setMenuOpen(false)}>Üretim</a>
          <a href="#etkinlik" onClick={() => setMenuOpen(false)}>Etkinlik Üretimi</a>
          <a className="nav-cta" href="#iletisim" onClick={() => setMenuOpen(false)}>Teklif al</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Yeni nesil profesyonel mutfaklar için</p>
          <h1>Tatlı değil,<br /><em>imza</em> bırakıyoruz.</h1>
          <p className="hero-lead">İşletmenizin menüsünü sıradanlıktan çıkaran premium tatlılar. Güvenilir üretim, güçlü sunum ve hızlı tedarik.</p>
          <div className="hero-actions"><a className="button button-primary" href="#urunler">Kataloğu keşfet <span>↗</span></a><a className="text-link" href="#etkinlik">Etkinlik planla <span>→</span></a></div>
        </div>
        <div className="hero-products" aria-label="Öne çıkan Best Gourmet ürünleri">
          <div className="hero-main-product"><img src="/products-studio/category-mono-pasta.png" alt="Antep fıstığı Dubai mono pasta" /></div>
          <div className="hero-mini hero-mini-one"><img src="/products-studio/category-trilece.png" alt="Karamel trileçe" /><span>Trileçe</span></div>
          <div className="hero-mini hero-mini-two"><img src="/products-studio/category-ekler.png" alt="Fransız ekleri" /><span>Fransız ekleri</span></div>
          <div className="hero-mini hero-mini-three"><img src="/products-studio/category-tart.png" alt="Meyveli tart" /><span>Tart</span></div>
          <div className="hero-mini hero-mini-four"><img src="/products-studio/category-butun-pasta.png" alt="Bütün pasta" /><span>Bütün pasta</span></div>
          <span className="hero-stamp">Taze üretim<br />• Her gün •</span>
        </div>
        <div className="hero-proof" aria-label="Best Gourmet öne çıkanlar"><div><strong>{products.length} ürün</strong><span>geniş ürün seçkisi</span></div><div><strong>Her gün</strong><span>taptaze üretim</span></div><div><strong>Soğuk zincir</strong><span>güvenli teslimat</span></div></div>
      </section>

      <div className="marquee" aria-label="Marka değerleri"><div><span>Menüne güç kat</span><i>✦</i><span>Sunumu yükselt</span><i>✦</i><span>Lezzeti standartlaştır</span><i>✦</i><span>Menüne güç kat</span><i>✦</i><span>Sunumu yükselt</span></div></div>

      <section className="manifesto" id="hikayemiz">
        <p className="section-index">01 / Yaklaşımımız</p><div><h2>Menünüzdeki en güçlü<br />karakter.</h2><p>Best Gourmet, profesyonel mutfakların hızını iyi bilir. Bu yüzden her ürünü yalnızca lezzetli değil; kolay servis edilen, tutarlı ve vitrinde fark edilen bir deneyim olarak tasarlarız.</p></div><div className="manifesto-seal"><span>BG</span> Kaliteyi<br />standartlaştırır.</div>
      </section>

      <section className="products-section" id="urunler">
        <div className="products-heading"><div><p className="section-index">02 / Tam seçkimiz</p><h2>Favorini seç,<br /><em>farkını göster.</em></h2></div><p>Dokuz ana kategoride profesyonel servis temposuna hazır, sunumu güçlü ve lezzeti tutarlı ürünler.</p></div>
        <div className="catalog-tools">
          <div className="category-tabs" role="group" aria-label="Ürün kategorileri">{categories.map((category) => <button type="button" key={category} className={activeCategory === category ? "is-active" : ""} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
          <label className="product-search"><span>Ürün ara</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Lotus, frambuaz, mono…" /></label>
        </div>
        <div className="catalog-status"><strong>{visibleProducts.length}</strong> ürün gösteriliyor</div>
        <div className="product-grid" aria-live="polite">
          {visibleProducts.map((product, index) => (
            <article className="product-card" key={`${product.category}-${product.name}`}>
              <div className="product-image-wrap">
                <img src={product.image} alt={product.name} loading={index > 3 ? "lazy" : "eager"} />
                <span className="product-number">{String(index + 1).padStart(2, "0")}</span>
                <a className="product-action" href="#iletisim" aria-label={`${product.name} için teklif al`}>↗</a>
              </div>
              <div className="product-info"><p>{product.category}</p><h3>{product.name}</h3><span>{product.detail}</span></div>
            </article>
          ))}
          {visibleProducts.length === 0 && <p className="empty-state">Aramana uygun ürün bulunamadı. Başka bir lezzet deneyebilirsin.</p>}
        </div>
      </section>

      <section className="production" id="uretim"><div className="production-photo"><img src="/products-studio/lotuslu-magnolia.png" alt="Best Gourmet üretiminden Lotuslu Magnolia" /></div><div className="production-copy"><p className="section-index light">03 / Üretim standardı</p><h2>Her servis,<br />aynı <em>iyi his.</em></h2><p>Seçilmiş hammaddeler, kontrollü üretim süreçleri ve soğuk zincir teslimatıyla işletmenize yalnızca ürün değil, güvenilir bir lezzet standardı getiriyoruz.</p><ul><li><span>01</span> Günlük ve planlı üretim</li><li><span>02</span> Standart reçete, tutarlı sonuç</li><li><span>03</span> İşletmeye özel ürün planlaması</li></ul></div></section>

      <section className="events" id="etkinlik">
        <div className="events-intro"><p className="section-index">04 / Etkinlik üretimi</p><h2>Kalabalıklar için<br /><em>tek bir iyi standart.</em></h2><p>Marka lansmanından düğün davetine; konuk sayınıza, servis akışınıza ve etkinlik dilinize uygun tatlı seçkisini birlikte tasarlıyor, planlı üretim ve zamanında teslimatla tamamlıyoruz.</p><a className="button button-primary" href="#iletisim">Etkinliği planlayalım <span>↗</span></a></div>
        <div className="event-cards">
          <article><span>01</span><h3>Kurumsal Etkinlikler</h3><p>Toplantı, bayi buluşması ve şirket davetleri için porsiyon kontrollü, markanıza uyarlanabilir sunumlar.</p></article>
          <article><span>02</span><h3>Düğün & Davet</h3><p>Konuk sayısına göre planlanan mono tatlılar, cup servisler ve paylaşım masaları.</p></article>
          <article><span>03</span><h3>Lansman & Açılış</h3><p>Fotojenik ürün kurgusu, hızlı servis akışı ve ilk bakışta akılda kalan tatlı deneyimi.</p></article>
        </div>
        <div className="event-flow"><span>Kişi sayısına göre planlama</span><i>→</i><span>Özel menü & sunum</span><i>→</i><span>Zamanında soğuk teslimat</span></div>
      </section>

      <section className="contact" id="iletisim"><p className="section-index">05 / Birlikte büyüyelim</p><h2>Vitrininizi birlikte<br /><em>unutulmaz</em> yapalım.</h2><div className="contact-row"><p>Ürün kataloğu, etkinlik üretimi, fiyatlandırma ve işletmenize özel seçenekler için bize ulaşın.</p><div><a className="button button-dark" href="tel:+905301344525">+90 530 134 45 25 <span>↗</span></a><a className="mail-link" href="mailto:info@gourmetbest.tr">info@gourmetbest.tr</a></div></div></section>

      <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">BG</span><span className="brand-type"><strong>Best Gourmet</strong><small>Profesyonel lezzet</small></span></a><p>Premium tatlılar · Etkinlik üretimi · Güçlü sunum</p><p>© {new Date().getFullYear()} Best Gourmet</p></footer>
    </main>
  );
}
