import type { Metadata } from "next";
import Link from "next/link";
import { EventFooter } from "@/components/events/event-footer";
import { EventHeader } from "@/components/events/event-header";

export const metadata: Metadata = {
  title: "Hikâyemiz | Best Gourmet",
  description: "Best Gourmet’in üretim yaklaşımı, vizyonu ve profesyonel mutfaklara verdiği lezzet sözü.",
};

export default function StoryPage() {
  return (
    <main className="brand-page story-page">
      <EventHeader />
      <section className="brand-page-hero">
        <div>
          <p className="eyebrow"><span /> Bizi biz yapan hikâye</p>
          <h1>Önce iyi ürüne<br />inandık. Sonra onu<br /><em>her gün aynı özenle</em> yaptık.</h1>
        </div>
        <div className="brand-page-hero-copy">
          <p>Best Gourmet’i kurarken aklımızda çok basit bir düşünce vardı: Bir tatlı yalnızca güzel görünmemeli; ilk lokmadan son servise kadar insana aynı güveni vermeli.</p>
          <Link className="text-link" href="/#urunler">Seçkiyi keşfet <span>↘</span></Link>
        </div>
      </section>

      <section className="story-editorial">
        <div className="story-photo"><img src="/products-studio/sku/pasta-orman-meyveli.webp" alt="Best Gourmet Orman Meyveli Pasta" /></div>
        <div className="story-editorial-copy">
          <p className="section-index">01 / Bizim için mesele</p>
          <h2>Lezzeti biraz daha<br /><em>kişisel</em> hâle getirmek.</h2>
          <p>Biz tatlıya sadece reçete olarak bakmıyoruz. Bir vitrinde ilk bakışı, masada ilk heyecanı ve bittikten sonra akılda kalan o küçük duyguyu da düşünüyoruz. O yüzden her üründe tanıdık aromaları koruyor, sunumu ise bugünün enerjisiyle yeniden yorumluyoruz.</p>
          <p>Profesyonel mutfakların hızını biliyoruz. Ürünün iyi olması kadar doğru porsiyonda gelmesi, servis sırasında formunu koruması ve her siparişte aynı standardı vermesi gerektiğini de biliyoruz. Best Gourmet’in asıl sözü burada başlıyor: Gösterişli laflardan önce düzgün iş, güçlü lezzet ve güvenilir bir üretim düzeni.</p>
          <p>İş ortaklarımızın menüsüne kendi imzamızı zorla atmak yerine, onların karakterini daha görünür hâle getiren ürünler tasarlıyoruz. Bazen klasik bir lezzeti sadeleştiriyor, bazen de yeni bir dokunuşla vitrinin en merak edilen parçasına dönüştürüyoruz.</p>
        </div>
      </section>

      <section className="purpose-grid">
        <article>
          <span>Vizyonumuz</span>
          <h2>İyi tatlıyı, iyi işletmenin doğal standardı yapmak.</h2>
          <p>Best Gourmet’i; çağdaş sunumu, tutarlı reçetesi ve güvenilir hizmet anlayışıyla profesyonel tatlı üretiminde referans gösterilen bir marka hâline getirmek istiyoruz.</p>
        </article>
        <article>
          <span>Misyonumuz</span>
          <h2>Her serviste aynı kaliteyi, her vitrinde ayrı bir karakteri korumak.</h2>
          <p>Seçilmiş hammaddeden soğuk zincire, porsiyon planından satış sonrası iletişime kadar bütün süreci sade, dürüst ve özenli yönetiyoruz.</p>
        </article>
      </section>

      <section className="story-values">
        <p className="section-index light">02 / Çalışma biçimimiz</p>
        <div>
          <article><span>01</span><h3>Samimiyet</h3><p>Ne yapabileceğimizi açıkça söyler, iletişimi gereksiz yere zorlaştırmayız.</p></article>
          <article><span>02</span><h3>Tutarlılık</h3><p>Bugün sevilen ürünün yarın da aynı güveni vermesi için standardı koruruz.</p></article>
          <article><span>03</span><h3>Merak</h3><p>Yeni tatları, sunumları ve servis ihtiyaçlarını dinler; kendimizi sürekli geliştiririz.</p></article>
          <article><span>04</span><h3>Özen</h3><p>Küçük bir üst süslemeden büyük bir etkinlik planına kadar her ayrıntıyı önemseriz.</p></article>
        </div>
      </section>

      <section className="brand-page-cta">
        <p className="section-index">03 / Tanışalım</p>
        <h2>Bizim hikâyemizin en güzel tarafı,<br /><em>birlikte büyüdüğümüz insanlar.</em></h2>
        <a className="button button-dark" href="https://wa.me/905015740522?text=Merhaba%2C%20Best%20Gourmet%20ile%20tanışmak%20istiyorum." target="_blank" rel="noreferrer">Bize yaz <span>↗</span></a>
      </section>
      <EventFooter />
    </main>
  );
}
