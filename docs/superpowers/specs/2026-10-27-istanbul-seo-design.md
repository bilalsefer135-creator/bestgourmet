# Best Gourmet — İstanbul SEO ve ölçüm tasarımı

Kullanıcı, 27 Ekim 2026 tarihinde önceki konuşmada sunulan teknik SEO, İstanbul ve çevresi odaklı içerik, ürün kategorileri ve üç rehber planını “tamam başla” diyerek onayladı. Yeni bir görsel kimlik veya katalog değişikliği istenmedi.

## Amaç ve sınırlar

- Ana alan adı https://bestgourmet.online; İstanbul ve çevresindeki kafe ve pastanelere toptan tatlı üretimi ve satışı.
- Mevcut krem/kahverengi/karamel renkler, Georgia/Arial yazılar, görseller, 77 ürün ve iki ürün grubu korunur.
- Minimum sipariş, teslimat günü, kesin hizmet ilçeleri, raf ömrü, sertifika, fiyat veya müşteri yorumu uydurulmaz. Bu konular için iletişimle doğrulama önerilir.
- Aynı kelimelerin varyasyonları için kopya sayfalar veya ilçelere göre çoğaltılmış sayfalar oluşturulmaz.
- GA4 ölçüm kimliği G-M251PGJTLK. Ölçüm yalnızca açık Analytics tercihi sonrası üretim alan adında etkinleşir; iletişim tıklamaları gerçek satış veya gönderilmiş teklif olarak raporlanmaz. İsim, telefon, e-posta ve serbest metin Analytics olaylarına gönderilmez.
- Kullanıcıya önce yerel önizleme gösterilir. Bu çalışma sırasında canlıya dağıtım veya Search Console hesabında değişiklik yapılmaz.

## İçerik ve mimari

1. Merkezi SEO yardımcısı sayfaya özel title, description, canonical, Open Graph ve Twitter bilgilerini oluşturur. Kuruluş yapılandırılmış verisi yalnızca doğrulanmış marka, web adresi, telefon, e-posta ve genel hizmet alanını içerir; sahte adres veya değerlendirme içermez.
2. XML sitemap, robots.txt ve mevcut tüm normal sayfalarda doğru canonical. Yeni rehberler ve yalnızca ürünü bulunan katalog kategorileri sitemap'e girer; filtre/arama URL'leri ve boş gelecek kategorileri girmez.
3. Ürün verisi ortak lib/catalog.ts dosyasına taşınır. Mevcut iki katalog sayfası korunur. Ürünü bulunan kategoriler /urunler/cafe/[category] ve /urunler/pastane/[category] adreslerinden sunucu HTML'inde açılır. Boş kategoriler mevcut yakında durumunu korur ve yeni boş SEO sayfası oluşturmaz.
4. Ana sayfanın görünür H1 başlığı İstanbul'da toptan tatlı üretim ve satışını anlatır; eski slogan yardımcı metin olarak korunabilir. Sipariş süreci, hizmet alanı ve rehber bağlantıları tasarımla uyumlu kısa bölümlerle eklenir.
5. /rehber dizini ve üç özgün Türkçe rehber: tedarikçi seçimi, fiyatı belirleyen unsurlar, kafe menüsünde tatlı seçimi. Her biri ilgili katalog/kategori bağlantıları, gerçek editoryal marka atfı ve WhatsApp CTA içerir. Henüz yayınlanmadığı için hayali yayın tarihi kullanılmaz.
6. Analitik bileşeni ortak layout'ta bulunur. Tercih saklanamazsa reddetme/izin verme davranışı yine güvenli çalışır. İzin geri alınabilir. Önizleme ve localhost trafiği üretim Analytics'ine gönderilmez.

## Doğrulama ve geri dönüş

Önceki sürüm a7ad95d, yerel etiket before-seo-2026-10-27 ile korunur. Değişiklikler codex/seo-istanbul-2026-10-27 dalında hazırlanır. Eski katalog testleri, yeni sitemap/metadata/kategori/rehber testleri ve Analytics birim/tarayıcı testleri uygulanır. Masaüstü ve mobil görünümde gezinme, arama ve taşma kontrol edilir. Canlı yayın öncesinde ayrı onay alınır; geri dönüşte yalnızca bu SEO değişiklikleri geri alınır, sonraki ilgisiz çalışmalar silinmez.
