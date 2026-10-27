# İstanbul SEO — yerel önizleme

## Yayın durumu ve geri dönüş

Bu çalışma **yerelde hazırlanmıştır; canlıya dağıtım yapılmamıştır**. Search Console ve Analytics yönetim hesaplarında ayar değiştirilmemiştir.

Başlangıç sürümü: `a7ad95d`. Korunan Git etiketi: `before-seo-2026-10-27`.
Çalışma dalı: `codex/seo-istanbul-2026-10-27`.

Beğenilmeyen içerik veya tasarım bölümleri ayrı ayrı düzeltilebilir. Tam geri dönüş gerektiğinde bu dalın SEO commit'leri `git revert` ile tersine çevrilebilir; daha sonra yapılan ilgisiz değişiklikler korunmalıdır. Canlı yayınlanırsa geri alınan sürümün ayrıca yeniden dağıtılması gerekir. Sadece Git'te geri almak canlı yayını değiştirmez. Analytics'e daha önce ulaşmış geçmiş veriler kod geri dönüşüyle silinmez.

## Hazırlanan içerik ve teknik yapı

- İstanbul ve çevresine yönelik görünür ana sayfa başlığı ve kısa tedarik açıklaması.
- Ürünü bulunan 10 kategori için gerçek adres ve kategoriye özel sunucu HTML'i. İki katalog ve 77 ürün korunur; gelecek kategorileri boş SEO sayfasına dönüştürülmez.
- /rehber altında üç yazı: tedarikçi seçimi, fiyat karşılaştırma ve kafe menüsü için tatlı seçimi.
- 24 normal sayfalık /sitemap.xml ve /robots.txt. Sitemap'te uydurma güncelleme tarihleri kullanılmaz.
- Sayfaya özel canonical, açıklama, Open Graph ve Twitter metadata. Resmî site adresi https://bestgourmet.online olarak birleştirildi; doğrulanmış iletişim e-postası info@gourmetbest.tr olarak korundu.
- Doğrulanmış kuruluş verisi; rehberlerde Article/BreadcrumbList. Uydurma değerlendirme, sertifika, adres veya yazar niteliği yoktur.

## Analytics davranışı

GA4 kimliği: `G-M251PGJTLK`. Google etiketi, ziyaretçi açıkça izin vermeden indirilmez. Tercih reddedilebilir ve sabit Çerez tercihleri düğmesinden geri alınabilir. Ret, site özelliklerini kapatmaz. Tercih saklanamıyorsa aynı sayfa oturumunda uygulanır. Yerel önizleme/Workers önizleme alan adlarında izin verilse bile üretim Analytics'ine veri gönderilmez.

Manuel olaylar:

| Olay | Anlamı | Parametreler |
| --- | --- | --- |
| page_view | Açılan normal sayfa | Sorgu ve hash içermeyen sayfa/referrer adresi, sayfa başlığı |
| contact_click | WhatsApp, telefon veya e-posta bağlantısına tıklama | contact_method, izinli sabit placement, sorgu/hash içermeyen güncel sayfa/referrer adresi |
| price_list_click | Fiyat listesi bağlantısına tıklama | contact_method, izinli sabit placement, sorgu/hash içermeyen güncel sayfa/referrer adresi |

Tıklamalar gönderilmiş teklif, gerçek görüşme veya satış değildir. Manuel olaylara form bilgileri, mesaj metni, e-posta, telefon veya WhatsApp hedef adresi eklenmez. Reklam kişiselleştirmesi ve Google signals kapalıdır.

### Canlıya almadan / aldıktan sonra hesap kontrolü

1. Kullanıcı yerel önizlemeyi ve üç rehberi onaylamalıdır. Kesin minimum sipariş, teslimat günleri/ilçeleri ve ürün saklama bilgileri ancak işletme doğrularsa eklenir.
2. **GA4 web veri akışında Enhanced Measurement > Page views > “Page changes based on browser history events” seçeneğini kapatın.** Kod manuel sayfa görüntüleme gönderir; bu hesap ayarı açık kalırsa SPA geçişleri çift sayılabilir. `send_page_view: false` bu ayrı hesap ayarını tek başına kapatmaz. [Google dokümanı](https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag).
3. Enhanced Measurement otomatik dış bağlantı/form ölçümlerini de gözden geçirin: manuel iletişim olaylarıyla ayrı yorumlanmalı; kişisel veri toplamamalıdır. Etkinlik formu WhatsApp özeti hazırlar; gönderimin tamamlandığını site doğrulamaz.
4. İzinli üretim ziyaretinde Google Tag Assistant + GA4 Realtime/DebugView ile doğru ölçüm kimliği, bir sayfa görüntüleme, fiyat listesi/iletişim olayları ve ret/geri alma davranışını doğrulayın. Yerel test Google servisini taklit eder; GA hesabına gerçek veri ulaştığını doğrulamaz.
5. Dağıtım onayından sonra Search Console'un doğru alan adı mülküne `https://bestgourmet.online/sitemap.xml` gönderin; durumunu ve önemli sayfaları URL Denetimi ile izleyin. Yerel dosyanın hazırlanması Search Console'a gönderildiği anlamına gelmez.

## Tekrarlanabilir kontroller

Son yerel doğrulama: derleme başarılı; 27 Node testi geçti; uygulama/bileşen/lib TypeScript kontrolü geçti. Kapsamlı uygulama lint kontrolü sıfır hata ve mevcut img kullanımları için 12 uyarı verdi. Chrome'da 1440, 768 ve 390 px genişliklerde sekiz sayfa için 24 görünüm kontrolü geçti: yatay taşma, kırık görsel, başarısız kaynak veya çalışma zamanı hatası bulunmadı. Kategori geçişi/geri gezinme/arama, mobil menü, izin/ret, saklanan iznin yeniden açılışı, çerezlerin korunması ve izin geri alındığında temizlenmesi, depolama engeli ve SPA geçişi sonrası doğru sayfaya iletişim atfı test edildi. Gerçek Google hizmetlerine veri gönderilmedi. Bu kontroller gerçek kullanıcı Core Web Vitals veya Google sıralama ölçümü değildir.

```powershell
npm run build:vinext
node --test tests/*.test.mjs
npx tsc --project tests/tsconfig.seo.json --pretty false
npx eslint app components/analytics-consent.tsx components/events/event-header.tsx components/events/event-footer.tsx lib/seo.ts lib/catalog.ts lib/catalog-seo.ts lib/guides.ts lib/analytics.ts
npx wrangler dev --config dist/server/wrangler.json --port 3001 --local
```

Vinext'in Node `start` komutu bu Cloudflare projesinde statik ASSETS bağlamaz; görsel ve JS testi için yukarıdaki yerel Wrangler kullanılmalıdır.

Tarayıcı testi ayrı terminalde `node tests/browser-seo-qa.mjs` ile çalışır. Playwright kurulu ortamda çalıştırın; Codex'in paketleri kullanılacaksa `BEST_GOURMET_QA_MODULES` ortam değişkenine yerel runtime node_modules dizinini verin. Chrome gereklidir. Ekran görüntüleri ve JSON rapor outputs/seo-2026-10-27 altında üretilir. Üretim alan adı simülasyonunda bütün site istekleri yerel sunucuya, Google etiketi de test taklidine yönlendirilir; gerçek üretim servisine trafik gönderilmez.

Ana tsconfig ile tüm depo kontrolü, mevcut db/worker Cloudflare tipleri ve work/ içindeki eski dağıtım kopyaları nedeniyle hata verir. tests/tsconfig.seo.json, bu sürümün uygulama/bileşen/lib kaynaklarını kontrol eder; altyapı hataları bu SEO değişikliğinde gizlenerek düzeltilmemiştir. Mevcut img etiketleri için Next lint uyarıları korunur; bunlar bir ölçülmüş performans sonucu değildir.

## Rehber CTA revizyonu

Rehber dizini ve üç yazının girişine güncel fiyat listesi isteme ve ürünleri inceleme düğmeleri eklendi. WhatsApp isteği yalnızca rehberin başlığını ve genel talebi içerir. Fiyat listesi düğmesi mevcut izinli Analytics akışında price_list_click olarak ölçülür; mesaj metni ölçüm olayına eklenmez. Yazı sonundaki WhatsApp çağrısı korunup ürün bağlantısıyla tamamlandı.

Bu revizyonun derlemesi, 28 Node testi, uygulama TypeScript kontrolü ve kapsamlı tarayıcı testi başarılıdır. Üç genişlikte 24 sayfa kontrolü ve yeni CTA'nın SPA geçişinden sonraki fiyat listesi ölçümü geçti. Harita alanı bu revizyonda değiştirilmedi; işletmenin Google Maps yerleştirme kodu veya paylaşım bağlantısı bekleniyor. Canlıya dağıtım yapılmadı.
