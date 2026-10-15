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

const sku = (file: string) => `/products-studio/sku/${file.includes(".") ? file : `${file}.webp`}`;
const makeProducts = (
  category: string,
  detail: string,
  items: Array<[string, string]>,
): Product[] => items.map(([name, file]) => ({ name, category, detail, image: sku(file) }));

const products: Product[] = [
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
  ...makeProducts("Rulo Pastalar", "Dilim servis · rulo seçkisi", [
    ["Muzlu Rulo", "rulo-muzlu"],
    ["Çikolatalı Rulo", "rulo-cikolatali"],
    ["Çilekli Rulo", "rulo-cilekli"],
    ["İbiza Muzlu", "ibiza-muzlu"],
    ["İbiza Çilekli", "ibiza-cilekli"],
  ]),
  ...makeProducts("Tartlar", "Dilim servis · cafe seçkisi", [
    ["Çilekli Tart", "tart-cilekli"],
    ["Orman Meyveli Tart", "tart-orman-meyveli"],
    ["Lotuslu Tart", "tart-lotuslu"],
  ]),
  ...makeProducts("Cheesecake", "Dilim servis · cafe seçkisi", [
    ["San Sebastian", "cheesecake-san-sebastian"],
    ["Antep Fıstıklı San Sebastian", "cheesecake-antep-fistikli-san-sebastian"],
    ["Limonlu Cheesecake", "cheesecake-limonlu"],
    ["Frambuazlı Cheesecake", "cheesecake-frambuazli"],
    ["Yaban Mersinli Cheesecake", "cheesecake-yaban-mersinli"],
    ["Lotuslu Cheesecake", "cheesecake-lotuslu"],
    ["Oreolu Cheesecake", "cheesecake-oreolu"],
    ["Orman Meyveli Cheesecake", "cheesecake-orman-meyveli"],
  ]),
  ...makeProducts("Tek Pastalar", "Tek porsiyon · modern vitrin", [
    ["Lotus Bomba", "tek-lotus-bomba"],
    ["Beyaz Çikolatalı Browni", "tek-beyaz-cikolatali-browni"],
    ["Paris Brest", "tek-paris-brest"],
    ["Antepistan", "tek-antepistan"],
    ["Fındık Pralin Baton", "tek-ferrero-stick"],
    ["Passion Lime Baton", "tek-passion-coconut-stick"],
    ["KitKat & Altın Çilek", "tek-kitkat-altin-cilek.png"],
    ["Portakallı Balkabağı", "tek-portakalli-balkabagi.png"],
    ["Çilekli Mousse", "tek-cilekli-mousse.png"],
    ["Tahinli", "tek-tahinli.png"],
  ]),
  ...makeProducts("Magnolia", "330 cc kare cam kase", [
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
    ["Dubai Magnolia", "magnolia-dubai"],
  ]),
  ...makeProducts("Mono Pasta", "8 cm genişlik · 7–8 cm yükseklik", [
    ["Lotus", "mono-lotus-v2.png"],
    ["Lime", "mono-lime-v2.png"],
    ["Frambuaz", "mono-frambuaz-v2.png"],
    ["Mango Ananas", "mono-mango-ananas-v2.png"],
    ["Antep Fıstığı Dubai", "mono-antep-fistikli-dubai-v2.png"],
    ["Oreo", "mono-oreo.png"],
  ]),
  ...makeProducts("Adet Pastalar", "Yaklaşık 10 cm · tam sıvalı", [
    ["Lotuslu Pasta", "adet-lotuslu"],
    ["Orman Meyveli", "adet-orman-meyveli"],
    ["Çilek Çikolatalı", "adet-cilek-cikolata"],
    ["Karışık Meyveli", "adet-karisik-meyveli"],
    ["Antep Fıstıklı", "adet-antep-fistikli"],
    ["Beyaz Çikolatalı", "adet-beyaz-cikolatali"],
    ["Ganaj Çikolatalı", "adet-ganaj-cikolatali"],
  ]),
  ...makeProducts("Pasta Çeşitleri", "1 no · bütün pasta", [
    ["Lotuslu Pasta", "pasta-lotus"],
    ["Orman Meyveli", "pasta-orman-meyveli"],
    ["Çilek Çikolatalı", "pasta-cilek-cikolata"],
    ["Karışık Meyveli", "pasta-karisik-meyveli"],
    ["Antep Fıstıklı", "pasta-antep-fistikli"],
    ["Beyaz Çikolatalı", "pasta-beyaz-cikolatali"],
    ["Ganaj Çikolatalı", "pasta-cikolatali-ganaj"],
    ["Karamelli Pasta", "pasta-karamelli-v2.png"],
    ["Red Velvet Pasta", "pasta-red-velvet"],
    ["Devil’s Pasta", "pasta-devils"],
  ]),
  ...makeProducts("Pasta Çeşitleri", "Dilim pasta · beşli seri", [
    ["Devil’s Dilim Pasta", "dilim-devils-v2.png"],
    ["Red Velvet Dilim Pasta", "dilim-red-velvet-v2.png"],
    ["Karamelli Dilim Pasta", "dilim-karamelli-v2.png"],
    ["Beyaz Çikolatalı Dilim Pasta", "dilim-beyaz-cikolatali-v2.png"],
    ["Antep Fıstıklı Dilim Pasta", "dilim-antep-fistikli-v2.png"],
  ]),
  ...makeProducts("Trileçe", "Tek porsiyon", [
    ["Karamel Trileçe", "karamel-trilece"],
    ["Frambuazlı Trileçe", "frambuazli-trilece"],
    ["Lotuslu Trileçe", "lotuslu-trilece"],
    ["Çikolatalı Islak Kek", "islak-kek"],
  ]),
];

const categories = ["Tümü", ...Array.from(new Set(products.map((product) => product.category)))];
const cafeCategories = ["Ekler", "Rulo Pastalar", "Tartlar", "Cheesecake", "Tek Pastalar", "Magnolia", "Mono Pasta"];
const pastaneCategories = ["Adet Pastalar", "Pasta Çeşitleri", "Trileçe"];
const whatsapp = (message: string) =>
  `https://wa.me/905015740522?text=${encodeURIComponent(message)}`;

const mapLocation = "https://www.google.com/maps?q=41.09184847445046,28.646867234059656";

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
          <img className="brand-logo" src="/brand/best-gourmet-logo.jpeg" alt="Best Gourmet" />
        </a>
        <button className="menu-button" type="button" aria-label="Menüyü aç veya kapat" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><span /><span /></button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Ana menü">
          <a href="#urunler" onClick={() => setMenuOpen(false)}>Ürünler</a>
          <a href="/hikayemiz" onClick={() => setMenuOpen(false)}>Hikâyemiz</a>
          <a href="/referanslar" onClick={() => setMenuOpen(false)}>Referanslarımız</a>
          <a href="#uretim" onClick={() => setMenuOpen(false)}>Üretim</a>
          <a href="/etkinlikler" onClick={() => setMenuOpen(false)}>Etkinlikler</a>
          <a href="#iletisim" onClick={() => setMenuOpen(false)}>İletişim</a>
          <a href={whatsapp("Merhaba, Best Gourmet fiyat listesini almak istiyorum.")} target="_blank" rel="noreferrer">Fiyat Listesi</a>
          <a className="nav-cta" href={whatsapp("Merhaba, Best Gourmet ürünleri hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer">Teklif al</a>
        </nav>
      </header>

      <section className="hero-campaign" id="top" aria-label="Best Gourmet ana sayfa kapağı">
        <img src="/brand/home-hero-studio-v3.webp" alt="Best Gourmet San Sebastian, Supangle, çikolatalı ekler ve Antep fıstıklı pasta seçkisi" />
        <div className="hero-campaign-copy">
          <p className="hero-campaign-kicker">Profesyonel mutfaklara özel</p>
          <img className="hero-campaign-logo" src="/brand/best-gourmet-logo.jpeg" alt="Best Gourmet Pâtisserie & Sweets" />
          <h1>Lezzette güven, <em>sunumda kalite.</em></h1>
          <p className="hero-campaign-lead">Kafe, restoran ve işletmeler için özenle hazırlanan, servise hazır premium tatlı çözümleri.</p>
          <div className="hero-campaign-actions">
            <a className="hero-campaign-cta" href="#urunler">{products.length} lezzeti keşfet <span>↓</span></a>
            <a className="hero-campaign-link" href="/hikayemiz">Bizi tanıyın <span>↗</span></a>
          </div>
        </div>
        <p className="hero-campaign-note"><span>İstanbul</span>Toptan tatlı üretimi</p>
      </section>

      <div className="marquee" aria-label="Marka değerleri"><div><span>Menüne güç kat</span><i>✦</i><span>Sunumu yükselt</span><i>✦</i><span>Lezzeti standartlaştır</span><i>✦</i><span>Menüne güç kat</span><i>✦</i><span>Sunumu yükselt</span></div></div>

      <section className="products-section" id="urunler">
        <div className="products-heading">
          <div><p className="section-index">01 / Tam seçkimiz</p><h2>Favorini seç,<br /><em>farkını göster.</em></h2></div>
          <p>Kafe ve pastanelerin servis temposuna hazır, sunumu güçlü ve lezzeti tutarlı seçkin bir ürün yelpazesi.</p>
        </div>
        <aside className="price-list-cta" aria-label="Fiyat listesi talebi">
          <div>
            <p className="price-list-kicker">Güncel fiyat listesi</p>
            <h3>Listeyi iste,<br /><em>biz gönderelim.</em></h3>
          </div>
          <div className="price-list-action">
            <div className="price-category-groups">
              <p><strong>Kafe ürünleri</strong>{cafeCategories.join(" · ")}</p>
              <p><strong>Pastane grubu</strong>{pastaneCategories.join(" · ")}</p>
            </div>
            <p>Menü kapsamına ve sipariş adedine göre güncellenen fiyat listemizi WhatsApp&apos;tan talep edin.</p>
            <a href={whatsapp("Merhaba, Best Gourmet fiyat listesini almak istiyorum.")} target="_blank" rel="noreferrer">Fiyat listesini iste <span>↗</span></a>
          </div>
        </aside>
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
                <img
                  className={product.name.startsWith("İbiza ") ? "product-image-contain" : undefined}
                  src={product.image}
                  alt={product.name}
                  loading={index > 7 ? "lazy" : "eager"}
                />
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
        <div className="production-photo production-collage">
          <img className="production-main-image" src="/production/uretim-studio.png" alt="Best Gourmet üretim mutfağı ve günlük tatlı hazırlığı" />
          <div className="production-sample-card"><img src="/production/numune-kutusu-01.jpg" alt="Best Gourmet numune paketi" /><span>Numune paketi</span></div>
        </div>
        <div className="production-copy">
          <p className="section-index light">02 / Üretim standardı</p>
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
        <div className="events-intro"><p className="section-index">03 / Etkinlik üretimi</p><h2>Her kutlamaya özel,<br /><em>tek bir iyi standart.</em></h2><p>Düğünden doğum gününe, özel davetten kurumsal buluşmaya; menüyü, sunumu ve servis akışını etkinliğinizin ihtiyacına göre tek bir planda buluşturuyoruz.</p><a className="button button-primary" href="/etkinlikler">Tüm etkinlikleri keşfet <span>↗</span></a></div>
        <InteractivePastryGallery
          collectionName="Etkinlik seçkisi"
          items={[
            { id: "ekler", image: sku("ekler-karisik-mix"), title: "Karışık Mix", category: "Fransız Ekleri" },
            { id: "rulo", image: sku("rulo-cilekli"), title: "Çilekli Rulo", category: "Rulo Pastalar", imageFit: "contain" },
            { id: "tart", image: sku("tart-orman-meyveli"), title: "Orman Meyveli", category: "Tartlar" },
            { id: "cheesecake", image: sku("cheesecake-san-sebastian"), title: "San Sebastian", category: "Cheesecake" },
            { id: "tek", image: sku("tek-kitkat-altin-cilek.png"), title: "KitKat & Altın Çilek", category: "Tek Pastalar" },
            { id: "magnolia", image: sku("magnolia-dubai"), title: "Dubai Magnolia", category: "Magnolia" },
            { id: "mono", image: sku("mono-frambuaz"), title: "Frambuaz Mono", category: "Mono Pasta" },
            { id: "adet-pasta", image: sku("adet-orman-meyveli"), title: "Orman Meyveli", category: "Adet Pastalar" },
            { id: "pasta", image: sku("pasta-red-velvet"), title: "Red Velvet", category: "Pasta Çeşitleri" },
            { id: "trilece", image: sku("karamel-trilece"), title: "Karamel Trileçe", category: "Trileçe" },
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
        <p className="section-index">04 / İletişim</p>
        <div className="contact-heading">
          <h2>Bir kahve kadar<br /><em>yakınız.</em></h2>
          <p>Ürün kataloğu, etkinlik üretimi, fiyatlandırma ve işletmenize özel seçenekler için bize ulaşın. Mesajınıza en kısa sürede dönüş yapalım.</p>
        </div>
        <div className="contact-layout">
          <div className="contact-panel">
            <div className="contact-list">
              <a href={mapLocation} target="_blank" rel="noreferrer" className="contact-item">
                <span>01 / Konum</span>
                <strong>Best Gourmet üretim noktası</strong>
                <small>41.091848, 28.646867 · Yol tarifi al ↗</small>
              </a>
              <a href="tel:+905015740522" className="contact-item">
                <span>02 / Telefon</span>
                <strong>+90 501 574 05 22</strong>
                <small>Aramak için dokunun</small>
              </a>
              <a href="mailto:info@gourmetbest.tr" className="contact-item">
                <span>03 / E-posta</span>
                <strong>info@gourmetbest.tr</strong>
                <small>E-posta gönderin</small>
              </a>
            </div>
            <a className="button button-dark contact-whatsapp" href={whatsapp("Merhaba, Best Gourmet ürünleri hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer">WhatsApp’tan yaz <span>↗</span></a>
          </div>
          <div className="contact-map" aria-label="Best Gourmet üretim noktası konumu">
            <div className="contact-map-visual" aria-hidden="true"><span>BG</span></div>
            <div className="contact-map-copy">
              <span>41.091848 N · 28.646867 E</span>
              <strong>Best Gourmet</strong>
              <p>Üretim noktası · İstanbul</p>
            </div>
            <a href={mapLocation} target="_blank" rel="noreferrer">Haritada aç <span>↗</span></a>
          </div>
        </div>
      </section>

      <footer><a className="brand footer-brand" href="#top"><img className="brand-logo footer-logo" src="/brand/best-gourmet-logo.jpeg" alt="Best Gourmet" /></a><p>Premium tatlılar · Etkinlik üretimi · Güçlü sunum</p><p>© {new Date().getFullYear()} Best Gourmet</p></footer>
    </main>
  );
}
