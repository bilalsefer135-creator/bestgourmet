"use client";

import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import { InteractivePastryGallery } from "@/components/ui/interactive-pastry-gallery";

import { products, sku, cafeCategories, pastaneCategories, upcomingCategories, productGroups, categoryLabel } from "@/lib/catalog";
import { wholesaleCategories } from "@/lib/catalog-seo";
const whatsapp = (message: string) =>
  `https://wa.me/905015740522?text=${encodeURIComponent(message)}`;

const mapLocation = "https://www.google.com/maps?q=41.09184847445046,28.646867234059656";
const mapEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.951228583527!2d28.641444890154748!3d41.09191224038049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b559f25242ec57%3A0xbe48fb90abd2722!2sBest%20Gourmet%20Patisserie!5e0!3m2!1str!2str!4v1793128201425!5m2!1str!2str";

export default function Home({ productGroup, initialCategory = "Tümü" }: { productGroup?: string; initialCategory?: string } = {}) {
  const activeGroup = productGroup ?? null;
  const [activeCategory, setActiveCategory] = useState(initialCategory);
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
  const groupCategories = productGroups.find((group) => group.name === activeGroup)?.categories;
  const groupSlug = productGroup === "Cafe Ürünleri" ? "cafe" : "pastane";
  const categoryPage = wholesaleCategories.find((entry) => entry.group === groupSlug && entry.category === initialCategory);
  const categories = ["Tümü", ...(groupCategories ?? [...cafeCategories, ...pastaneCategories])];

  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
  const visibleProducts = products.filter((product) => {
    const categoryMatches = activeCategory === "Tümü" || product.category === activeCategory;
    const queryMatches = !normalizedQuery || `${product.name} ${product.category} ${categoryLabel(product.category)}`.toLocaleLowerCase("tr-TR").includes(normalizedQuery);
    const groupMatches = !groupCategories || groupCategories.includes(product.category);
    return groupMatches && categoryMatches && queryMatches;
  });

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
    <main className={productGroup ? "catalog-page" : undefined}>
      <header className="site-header">
        <a className="brand" href={productGroup ? "/" : "#top"} aria-label="Best Gourmet ana sayfa">
          <img className="brand-logo" src="/brand/best-gourmet-logo.jpeg" alt="Best Gourmet" />
        </a>
        <button className="menu-button" type="button" aria-label="Menüyü aç veya kapat" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><span /><span /></button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Ana menü">
          <a href={productGroup ? "/#urunler" : "#urunler"} onClick={() => setMenuOpen(false)}>Ürünler</a>
          <a href="/hikayemiz" onClick={() => setMenuOpen(false)}>Hikâyemiz</a>
          <a href="/referanslar" onClick={() => setMenuOpen(false)}>Referanslarımız</a>
          <a href={productGroup ? "/#uretim" : "#uretim"} onClick={() => setMenuOpen(false)}>Üretim</a>
          <a href="/etkinlikler" onClick={() => setMenuOpen(false)}>Etkinlikler</a>
          <Link href="/rehber" onClick={() => setMenuOpen(false)}>Rehber</Link>
          <a href={productGroup ? "/#iletisim" : "#iletisim"} onClick={() => setMenuOpen(false)}>İletişim</a>
          <a href={whatsapp("Merhaba, Best Gourmet fiyat listesini almak istiyorum.")} data-analytics-intent="price_list" target="_blank" rel="noreferrer">Fiyat Listesi</a>
          <a className="nav-cta" href={whatsapp("Merhaba, Best Gourmet ürünleri hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer">Teklif al</a>
        </nav>
      </header>

      {!productGroup && <>
      <section className="hero-campaign" id="top" aria-label="Best Gourmet ana sayfa kapağı">
        <img src="/brand/home-hero-studio-v3.webp" alt="Best Gourmet San Sebastian, Supangle, çikolatalı ekler ve Antep fıstıklı pasta seçkisi" />
        <div className="hero-campaign-copy">
          <p className="hero-campaign-kicker">Profesyonel mutfaklara özel</p>
          <img className="hero-campaign-logo" src="/brand/best-gourmet-logo.jpeg" alt="Best Gourmet Pâtisserie & Sweets" />
          <h1>İstanbul’da toptan tatlı <em>üretimi ve satışı.</em></h1>
          <p className="hero-campaign-slogan">Lezzette güven, sunumda kalite.</p>
          <p className="hero-campaign-lead">Kafe, restoran ve pastaneler için özenle hazırlanan, servise hazır premium tatlı çözümleri.</p>
          <div className="hero-campaign-actions">
            <a className="hero-campaign-cta" href="#urunler">{products.length} lezzeti keşfet <span>↓</span></a>
            <a className="hero-campaign-link" href="/hikayemiz">Bizi tanıyın <span>↗</span></a>
          </div>
        </div>
        <p className="hero-campaign-note"><span>İstanbul</span>Toptan tatlı üretimi</p>
      </section>

      <div className="marquee" aria-label="Marka değerleri"><div><span>Menüne güç kat</span><i>✦</i><span>Sunumu yükselt</span><i>✦</i><span>Lezzeti standartlaştır</span><i>✦</i><span>Menüne güç kat</span><i>✦</i><span>Sunumu yükselt</span></div></div>
      </>}

      <section className="products-section" id="urunler">
        {productGroup && <Link className="catalog-back" href="/#urunler">← Ürün gruplarına dön</Link>}
        <div className="products-heading">
          <div><p className="section-index">{productGroup ? "Ürün seçkimiz" : "01 / Tam seçkimiz"}</p>{productGroup ? <h1 className="catalog-page-title">{categoryPage?.title ?? productGroup}</h1> : <h2>Favorini seç,<br /><em>farkını göster.</em></h2>}</div>
          <p>{categoryPage?.intro ?? (productGroup ? `${productGroup} seçkimizden işletmenize uygun lezzetleri keşfedin. Kategori seçerek veya ürün adıyla arayarak inceleyebilirsiniz.` : "Kafe ve pastanelerin servis temposuna hazır, sunumu güçlü ve lezzeti tutarlı seçkin bir ürün yelpazesi.")}</p>
        </div>
        {categoryPage && <div className="catalog-category-intro" aria-label="Kategori ve sipariş bilgisi">
          <nav className="catalog-breadcrumb" aria-label="İçerik yolu"><Link href="/">Ana sayfa</Link><span aria-hidden="true">/</span><Link href={`/urunler/${groupSlug}`}>{productGroup}</Link><span aria-hidden="true">/</span><span>{categoryLabel(categoryPage.category)}</span></nav>
          <div>{categoryPage.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <a className="catalog-information-link" href={whatsapp(`Merhaba, ${categoryLabel(categoryPage.category)} ürünleri ve İstanbul ve çevresi için sipariş koşulları hakkında bilgi almak istiyorum.`)} target="_blank" rel="noreferrer">Ürün ve sipariş bilgisi al <span aria-hidden="true">↗</span></a>
        </div>}
        {!productGroup && <div className="product-group-panels" role="group" aria-label="Ürün grubu seçimi">
          {productGroups.map((group, index) => (
            <a className="product-group-panel" key={group.name} href={group.href}>
              <img className="product-group-background" src={group.image} alt="" aria-hidden="true" loading="lazy" width="1536" height="1024" />
              <span className="product-group-index">0{index + 1} / Ürün grubu</span>
              <strong>{group.name}</strong>
              <span className="product-group-categories">{group.categories.map(categoryLabel).join(" · ")}</span>
              <span className="product-group-action">Ürünleri keşfet <span aria-hidden="true">↗</span></span>
            </a>
          ))}
        </div>}
        {productGroup && <div id="group-catalog">
        <div className="catalog-results" role="region" aria-label={`${activeGroup} ürün listesi`}>
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
                onClickCapture={(event) => { if (suppressCategoryClickRef.current) { event.preventDefault(); event.stopPropagation(); } }}
              >
                {categories.map((category) => {
                  const href = category === "Tümü" ? `/urunler/${groupSlug}` : wholesaleCategories.find((entry) => entry.group === groupSlug && entry.category === category)?.href;
                  return href ? <Link key={category} href={href} draggable={false} className={activeCategory === category ? "is-active" : ""} aria-current={activeCategory === category ? "page" : undefined}>{categoryLabel(category)}</Link> : <button type="button" key={category} className={activeCategory === category ? "is-active" : ""} aria-pressed={activeCategory === category} onClick={() => selectCategory(category)}>{categoryLabel(category)}</button>;
                })}
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
                <a className="product-action" href={whatsapp(`Merhaba, ${product.name} (${categoryLabel(product.category)}) için bilgi ve fiyat almak istiyorum.`)} data-analytics-placement="product_card" target="_blank" rel="noreferrer" aria-label={`${product.name} için WhatsApp'tan bilgi al`}>↗</a>
              </div>
              <div className="product-info"><p>{categoryLabel(product.category)}</p><h3>{product.name}</h3><span>{product.detail}</span></div>
            </article>
          ))}
          {visibleProducts.length === 0 && <p className="empty-state">{!query.trim() && upcomingCategories.includes(activeCategory) ? `${categoryLabel(activeCategory)} ürünlerimiz yakında burada yer alacak.` : "Aramana uygun ürün bulunamadı. Başka bir lezzet deneyebilirsin."}</p>}
        </div>
        </div>
        <aside className="price-list-cta" aria-label="Fiyat listesi talebi">
          <div><p className="price-list-kicker">Güncel fiyat listesi</p><h3>Listeyi iste,<br /><em>biz gönderelim.</em></h3></div>
          <div className="price-list-action">
            <div className="price-category-groups"><p><strong>{productGroup}</strong>{groupCategories?.map(categoryLabel).join(" · ")}</p></div>
            <p>Menü kapsamına ve sipariş adedine göre güncellenen fiyat listemizi WhatsApp&apos;tan talep edin.</p>
            <a href={whatsapp(`Merhaba, Best Gourmet ${productGroup} fiyat listesini almak istiyorum.`)} data-analytics-intent="price_list" target="_blank" rel="noreferrer">Fiyat listesini iste <span>↗</span></a>
          </div>
        </aside>
        </div>}
      </section>

      {!productGroup && <>
      <section className="wholesale-service" aria-labelledby="wholesale-service-title">
        <div><p className="section-index">İşletmeniz için</p><h2 id="wholesale-service-title">İstanbul ve çevresine<br /><em>toptan tatlı çözümleri.</em></h2></div>
        <div><p>Best Gourmet, İstanbul ve çevresindeki kafe, restoran ve pastaneler için toptan tatlı üretimi ve satışı yapar. Cafe ve pastane kataloglarından işletmenizin menüsüne uygun ürünleri inceleyebilirsiniz.</p><p>Sipariş planlamak için ilgilendiğiniz ürünleri, tahmini ihtiyacınızı ve işletmenizin konumunu bizimle paylaşın. Güncel fiyatları, minimum sipariş koşullarını, saklama bilgilerini ve adresinize teslimat uygunluğunu birlikte netleştirelim.</p><Link href="/rehber">Tedarik ve menü planlama rehberlerini okuyun <span aria-hidden="true">↗</span></Link></div>
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
              <a href="mailto:bestgourmet22@gmail.com" className="contact-item">
                <span>03 / E-posta</span>
                <strong>bestgourmet22@gmail.com</strong>
                <small>E-posta gönderin</small>
              </a>
            </div>
            <a className="button button-dark contact-whatsapp" href={whatsapp("Merhaba, Best Gourmet ürünleri hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer">WhatsApp’tan yaz <span>↗</span></a>
          </div>
          <div className="contact-map" aria-label="Best Gourmet üretim noktası konumu">
            <iframe src={mapEmbed} title="Best Gourmet Patisserie konumu — Google Maps"
              width="600" height="450" loading="lazy" allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin" />
            <div className="contact-map-footer">
              <span>Best Gourmet Patisserie · Google Maps</span>
              <a href={mapLocation} target="_blank" rel="noreferrer">Haritada aç <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </section>

      </>}
      <footer><a className="brand footer-brand" href={productGroup ? "/" : "#top"}><img className="brand-logo footer-logo" src="/brand/best-gourmet-logo.jpeg" alt="Best Gourmet" /></a><div className="catalog-footer-links"><p>Premium tatlılar · Etkinlik üretimi · Güçlü sunum</p><Link href="/rehber">İşletmeler için rehber</Link></div><p>© {new Date().getFullYear()} Best Gourmet</p></footer>
    </main>
  );
}
