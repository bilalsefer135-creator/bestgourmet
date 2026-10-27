import Link from "next/link";

export function GuideActions({ context = "İşletmeler için tatlı rehberi" }: { context?: string }) {
  const message = `Merhaba, Best Gourmet ${context} yazısını inceledim. İşletmem için güncel fiyat listesini ve sipariş koşullarını öğrenmek istiyorum.`;

  return (
    <div className="guide-intro-actions" aria-label="Ürün ve fiyat bilgisi">
      <a className="button button-primary" href={`https://wa.me/905015740522?text=${encodeURIComponent(message)}`}
        data-analytics-intent="price_list" data-analytics-placement="content" target="_blank" rel="noreferrer">
        Güncel fiyat listesini iste <span aria-hidden="true">↗</span>
      </a>
      <Link className="button guide-products-button" href="/#urunler">
        Ürünleri incele <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
