"use client";

import {
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
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
  const categoryTabsRef = useRef<HTMLDivElement>(null);
  const categoryDragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
  });
  const suppressCategoryClickRef = useRef(false);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
    return products.filter((product) => {
      const categoryMatches = activeCategory === "Tümü" || product.category === activeCategory;
      const queryMatches = !normalizedQuery || `${product.name} ${product.category}`.toLocaleLowerCase("tr-TR").includes(normalizedQuery);
      return categoryMatches && queryMatches;
    });
  }, [activeCategory, query]);

  function handleCategoryPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const track = categoryTabsRef.current;
    if (!track || event.button !== 0) return;

    categoryDragRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    };
  }

  function handleCategoryPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const track = categoryTabsRef.current;
    const drag = categoryDragRef.current;
    if (!track || !drag.active) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5 && !drag.moved) {
      drag.moved = true;
      track.setPointerCapture(event.pointerId);
    }
    track.scrollLeft = drag.scrollLeft - distance;
  }

  function finishCategoryDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const track = categoryTabsRef.current;
    const drag = categoryDragRef.current;
    if (!track || !drag.active) return;

    drag.active = false;
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
    if (drag.moved) {
      suppressCategoryClickRef.current = true;
      window.setTimeout(() => {
        suppressCategoryClickRef.current = false;
      }, 0);
    }
  }

  function selectCategory(category: string) {
    if (suppressCategoryClickRef.current) return;
    setActiveCategory(category);
  }

  function scrollCategories(direction: -1 | 1) {
    categoryTabsRef.current?.scrollBy({
      left: direction * 280,
      behavior: "smooth",
    });
  }

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
          <p className="eyebrow"><span /> Profesyonel mutfakların tatlı imzası</p>
          <h1>Lezzetin<br /><em>en zarif</em><br />hâli.</h1>
          <p className="hero-lead">Modern sunum, dengeli reçete ve her serviste aynı özen. Best Gourmet, vitrininize yalnızca tatlı değil; güçlü bir karakter kazandırır.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#urunler">59 lezzeti keşfet <span>↘</span></a>
            <a className="text-link" href="/etkinlikler">Etkinlik planla <span>→</span></a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Best Gourmet imza ürünü">
          <div className="hero-visual-frame">
            <img src={sku("pasta-antep-fistikli")} alt="Best Gourmet Antep fıstıklı pasta" />
            <div className="hero-image-label"><span>İmza seçkisi / 01</span><strong>Antep Fıstıklı Pasta</strong></div>
          </div>
          <p className="hero-visual-side">Best Gourmet · Profesyonel lezzet · 2026</p>
        </div>
        <div className="hero-proof" aria-label="Best Gourmet öne çıkanlar">
          <div><strong>59 özel ürün</strong><span>geniş ürün seçkisi</span></div>
          <div><strong>9 kategori</strong><span>tek üretim standardı</span></div>
          <div><strong>Soğuk zincir</strong><span>güvenli teslimat</span></div>
        </div>
      </section>

      <div className="marquee" aria-label="Marka değerleri"><div><span>Menüne güç kat</span><i>✦</i><span>Sunumu yükselt</span><i>✦</i><span>Lezzeti standartlaştır</span><i>✦</i><span>Menüne güç kat</span><i>✦</i><span>Sunumu yükselt</span></div></div>

      <section className="manifesto" id="hikayemiz">
        <div className="manifesto-topline">
          <p className="section-index">01 / Hikâyemiz</p>
          <p className="manifesto-kicker">Lezzetten önce bir yaklaşım.</p>
        </div>
        <div className="manifesto-heading">
          <h2>Menünüzdeki en güçlü<br />karakter.</h2>
          <div className="manifesto-seal"><span>BG</span> Kaliteyi<br />standartlaştırır.</div>
        </div>
        <div className="manifesto-narrative">
          <p className="manifesto-lead">Best Gourmet, profesyonel mutfakların günlük temposunu anlayan çağdaş bir tatlı üretim yaklaşımıdır. Bizim için iyi ürün yalnızca ilk lokmada değil; vitrinde, serviste ve yeniden tercih edildiğinde de aynı güveni vermelidir.</p>
          <div className="manifesto-copy">
            <p>Bu yüzden lezzeti; reçete disiplini, porsiyon tutarlılığı ve güçlü sunumla birlikte ele alıyoruz. İşletmelerin kendi karakterini korurken menülerini daha çekici ve yönetilebilir hâle getirmeyi amaçlıyoruz.</p>
            <p>Tanıdık aromaları çağdaş dokunuşlarla buluşturuyor; üründen planlamaya kadar sade, anlaşılır ve güven veren bir iş ortaklığı kuruyoruz. Her tabakta bıraktığımız iz, markamızın en gerçek imzası oluyor.</p>
          </div>
        </div>
        <div className="manifesto-values" aria-label="Best Gourmet yaklaşımı">
          <article><span>01</span><h3>Lezzet karakteri</h3><p>Dengeli aromalar, net reçeteler ve hatırlanan bir son dokunuş.</p></article>
          <article><span>02</span><h3>Servis kolaylığı</h3><p>Yoğun operasyonun ritmine uyum sağlayan planlı bir ürün seçkisi.</p></article>
          <article><span>03</span><h3>Sunum gücü</h3><p>Vitrinde merak uyandıran, masada özel hissettiren bir görünüm.</p></article>
        </div>
      </section>

      <section className="products-section" id="urunler">
        <div className="products-heading">
          <div><p className="section-index">02 / Tam seçkimiz</p><h2>Favorini seç,<br /><em>farkını göster.</em></h2></div>
          <p>Dokuz ana kategoride profesyonel servis temposuna hazır, sunumu güçlü ve lezzeti tutarlı 59 ayrı ürün.</p>
        </div>
        <div className="catalog-tools">
          <div className="category-browser">
            <div className="category-browser-meta">
              <span>Tut, sürükle ve keşfet</span>
              <div className="category-arrows" aria-label="Kategorileri kaydır">
                <button type="button" onClick={() => scrollCategories(-1)} aria-label="Önceki kategorileri göster">←</button>
                <button type="button" onClick={() => scrollCategories(1)} aria-label="Sonraki kategorileri göster">→</button>
              </div>
            </div>
            <div className="category-tabs-wrap">
              <div
                className="category-tabs"
                role="group"
                aria-label="Ürün kategorileri"
                ref={categoryTabsRef}
                onPointerDown={handleCategoryPointerDown}
                onPointerMove={handleCategoryPointerMove}
                onPointerUp={finishCategoryDrag}
                onPointerCancel={finishCategoryDrag}
              >
                {categories.map((category) => <button type="button" key={category} className={activeCategory === category ? "is-active" : ""} aria-pressed={activeCategory === category} onClick={() => selectCategory(category)}>{category}</button>)}
              </div>
            </div>
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
        <div className="production-copy">
          <p className="section-index light">03 / Üretim standardı</p>
          <h2>Her servis,<br />aynı <em>iyi his.</em></h2>
          <p>Seçilmiş hammaddeler, kontrollü üretim süreçleri ve soğuk zincir teslimatıyla işletmenize yalnızca ürün değil, güvenilir bir lezzet standardı getiriyoruz.</p>
          <p>Ürün planlamasını işletmenin servis yoğunluğuna, menü yapısına ve sunum beklentisine göre ele alıyoruz. Böylece mutfak ekibi daha öngörülebilir bir akışla çalışırken, misafir her siparişte aynı özenli deneyimle buluşuyor.</p>
          <div className="production-note"><span>Üretimden teslimata</span><p>Doğru ürün; yalnızca iyi bir reçete değil, doğru porsiyonlama, doğru saklama ve doğru zamanda teslim edilen bütünlüklü bir süreçtir.</p></div>
          <ul>
            <li><span>01</span> Seçilmiş hammadde yaklaşımı</li>
            <li><span>02</span> Standart reçete, tutarlı sonuç</li>
            <li><span>03</span> İşletmeye özel ürün planlaması</li>
            <li><span>04</span> Kontrollü saklama ve teslimat akışı</li>
          </ul>
        </div>
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
