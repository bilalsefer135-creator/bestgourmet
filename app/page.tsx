"use client";

import { useMemo, useState } from "react";

const products = [
  { name: "San Sebastian", category: "Cheesecake", detail: "10 dilim · bütün", image: "/products/san-sebastian.jpeg" },
  { name: "Limonlu Cheesecake", category: "Cheesecake", detail: "10 dilim · bütün", image: "/products/limonlu-cheesecake.jpg" },
  { name: "Frambuazlı Cheesecake", category: "Cheesecake", detail: "10 dilim · bütün", image: "/products/frambuazli-cheesecake.jpg" },
  { name: "Lotuslu Cheesecake", category: "Cheesecake", detail: "10 dilim · bütün", image: "/products/lotus-cheesecake.jpeg" },
  { name: "Muzlu Magnolya", category: "Cup Tatlılar", detail: "270 cc · kapaklı", image: "/products/muzlu-magnolia.jpg" },
  { name: "Çilekli Magnolya", category: "Cup Tatlılar", detail: "270 cc · kapaklı", image: "/products/cilekli-magnolia.jpeg" },
  { name: "Lotuslu Magnolya", category: "Cup Tatlılar", detail: "270 cc · kapaklı", image: "/products/lotuslu-magnolia.jpeg" },
  { name: "Profiterollü Magnolya", category: "Cup Tatlılar", detail: "270 cc · kapaklı", image: "/products/profiterollu-magnolia.jpg" },
  { name: "Rulo Çikolatalı Pasta", category: "Pastalar", detail: "12 dilim", image: "/products/rulo-cikolatali.jpeg" },
  { name: "Sade Brownie", category: "Pastalar", detail: "9 adet", image: "/products/brownie.jpeg" },
  { name: "Mozaik Pasta", category: "Pastalar", detail: "10 dilim", image: "/products/mozaik-pasta.jpg" },
  { name: "Çikolatalı Cookie", category: "Cookie", detail: "6 adet · 80 gr", image: "/products/cookie.jpeg" },
];

const categories = ["Tümü", "Cheesecake", "Cup Tatlılar", "Pastalar", "Cookie"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProducts = useMemo(
    () => activeCategory === "Tümü" ? products : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Best Gourmet ana sayfa">
          <span className="brand-mark">BG</span>
          <span className="brand-type"><strong>Best Gourmet</strong><small>Profesyonel lezzet</small></span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label="Menüyü aç veya kapat"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /> <span />
        </button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Ana menü">
          <a href="#urunler" onClick={() => setMenuOpen(false)}>Ürünler</a>
          <a href="#hikayemiz" onClick={() => setMenuOpen(false)}>Hikâyemiz</a>
          <a href="#uretim" onClick={() => setMenuOpen(false)}>Üretim</a>
          <a className="nav-cta" href="#iletisim" onClick={() => setMenuOpen(false)}>Teklif al</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Yeni nesil profesyonel mutfaklar için</p>
          <h1>Tatlı değil,<br /><em>imza</em> bırakıyoruz.</h1>
          <p className="hero-lead">İşletmenizin menüsünü sıradanlıktan çıkaran premium tatlılar. Güvenilir üretim, güçlü sunum ve hızlı tedarik.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#urunler">Kataloğu keşfet <span>↘</span></a>
            <a className="text-link" href="#iletisim">İş ortağımız olun <span>→</span></a>
          </div>
          <div className="hero-proof" aria-label="Best Gourmet öne çıkanlar">
            <div><strong>40+</strong><span>seçkin ürün</span></div>
            <div><strong>Her gün</strong><span>taptaze üretim</span></div>
            <div><strong>Soğuk zincir</strong><span>güvenli teslimat</span></div>
          </div>
        </div>

        <div className="hero-gallery" aria-label="Öne çıkan Best Gourmet ürünleri">
          <div className="hero-photo hero-photo-main">
            <img src="/products/san-sebastian.jpeg" alt="Best Gourmet San Sebastian cheesecake" />
          </div>
          <div className="hero-photo hero-photo-small">
            <img src="/products/frambuazli-cheesecake.jpg" alt="Best Gourmet frambuazlı cheesecake" />
          </div>
          <div className="hero-photo hero-photo-round">
            <img src="/products/muzlu-magnolia.jpg" alt="Best Gourmet muzlu magnolya" />
          </div>
          <span className="hero-stamp">Taze üretim<br />• Her gün •</span>
          <p className="gallery-note">Görünüşüyle merak,<br />lezzetiyle sadakat.</p>
        </div>
      </section>

      <div className="marquee" aria-label="Marka değerleri">
        <div>
          <span>Menüne güç kat</span><i>✦</i><span>Sunumu yükselt</span><i>✦</i><span>Lezzeti standartlaştır</span><i>✦</i><span>Menüne güç kat</span><i>✦</i><span>Sunumu yükselt</span>
        </div>
      </div>

      <section className="manifesto" id="hikayemiz">
        <p className="section-index">01 / Yaklaşımımız</p>
        <div>
          <h2>Menünüzdeki en güçlü<br />karakter.</h2>
          <p>Best Gourmet, profesyonel mutfakların hızını iyi bilir. Bu yüzden her ürünü yalnızca lezzetli değil; kolay servis edilen, tutarlı ve vitrinde fark edilen bir deneyim olarak tasarlarız.</p>
        </div>
        <div className="manifesto-seal"><span>BG</span> Kaliteyi<br />standartlaştırır.</div>
      </section>

      <section className="products-section" id="urunler">
        <div className="products-heading">
          <div>
            <p className="section-index">02 / Seçkimiz</p>
            <h2>Favorini seç,<br /><em>farkını göster.</em></h2>
          </div>
          <p>Her biri profesyonel servis temposuna hazır; sunumu güçlü, lezzeti tutarlı bir seçki.</p>
        </div>

        <div className="category-tabs" role="group" aria-label="Ürün kategorileri">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={activeCategory === category ? "is-active" : ""}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid" aria-live="polite">
          {visibleProducts.map((product, index) => (
            <article className="product-card" key={product.name}>
              <div className="product-image-wrap">
                <img src={product.image} alt={product.name} loading={index > 3 ? "lazy" : "eager"} />
                <span className="product-number">{String(index + 1).padStart(2, "0")}</span>
                <a className="product-action" href="#iletisim" aria-label={`${product.name} için teklif al`}>↗</a>
              </div>
              <div className="product-info">
                <p>{product.category}</p>
                <h3>{product.name}</h3>
                <span>{product.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="production" id="uretim">
        <div className="production-photo">
          <img src="/products/lotuslu-magnolia.jpeg" alt="Best Gourmet üretiminden Lotuslu Magnolya" />
        </div>
        <div className="production-copy">
          <p className="section-index light">03 / Üretim standardı</p>
          <h2>Her servis,<br />aynı <em>iyi his.</em></h2>
          <p>Seçilmiş hammaddeler, kontrollü üretim süreçleri ve soğuk zincir teslimatıyla işletmenize yalnızca ürün değil, güvenilir bir lezzet standardı getiriyoruz.</p>
          <ul>
            <li><span>01</span> Günlük ve planlı üretim</li>
            <li><span>02</span> Standart reçete, tutarlı sonuç</li>
            <li><span>03</span> İşletmeye özel ürün planlaması</li>
          </ul>
        </div>
      </section>

      <section className="contact" id="iletisim">
        <p className="section-index">04 / Birlikte büyüyelim</p>
        <h2>Vitrininizi birlikte<br /><em>unutulmaz</em> yapalım.</h2>
        <div className="contact-row">
          <p>Ürün kataloğu, fiyatlandırma ve işletmenize özel seçenekler için bize ulaşın.</p>
          <div>
            <a className="button button-dark" href="tel:+905301344525">+90 530 134 45 25 <span>↗</span></a>
            <a className="mail-link" href="mailto:info@gourmetbest.tr">info@gourmetbest.tr</a>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">BG</span>
          <span className="brand-type"><strong>Best Gourmet</strong><small>Profesyonel lezzet</small></span>
        </a>
        <p>Premium tatlılar · Güvenilir üretim · Güçlü sunum</p>
        <p>© {new Date().getFullYear()} Best Gourmet</p>
      </footer>
    </main>
  );
}
