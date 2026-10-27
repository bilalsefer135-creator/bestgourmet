export type WholesaleCategory = {
  group: "cafe" | "pastane";
  category: string;
  slug: string;
  href: string;
  title: string;
  description: string;
  intro: string;
  paragraphs: string[];
};

export const wholesaleCategories: WholesaleCategory[] = [
  {
    group: "cafe", category: "Cheesecake", slug: "cheesecake", href: "/urunler/cafe/cheesecake",
    title: "İstanbul’da Toptan Cheesecake Çeşitleri",
    description: "İstanbul ve çevresindeki kafeler için Best Gourmet cheesecake seçkisi. San Sebastian ve diğer çeşitleri inceleyin, işletmeniz için güncel bilgi isteyin.",
    intro: "Kahve menüsüne eşlik edecek cheesecake seçeneklerini, işletmenizin servis biçimine göre karşılaştırın. San Sebastian, meyveli ve bisküvili seçenekler aynı seçkide yer alır.",
    paragraphs: ["Dilim sunumunda porsiyon görünümü, tabak eşlikçileri ve beklenen satış temposunu birlikte değerlendirmek seçimi kolaylaştırır. Mevcut vitrininizde hangi tat profillerinin eksik kaldığını belirleyerek başlayabilirsiniz.", "İstanbul ve çevresi için ürün bulunurluğunu, saklama koşullarını ve teslimat uygunluğunu sipariş öncesinde ekibimizle netleştirin. Güncel fiyat listesi ve ürün bilgisi için bize ulaşın."],
  },
  {
    group: "cafe", category: "Tartlar", slug: "tartlar", href: "/urunler/cafe/tartlar",
    title: "İstanbul’da Toptan Tart Çeşitleri",
    description: "Best Gourmet çilekli, orman meyveli ve Lotuslu tart seçkisini keşfedin. İstanbul ve çevresindeki işletmeniz için toptan tart bilgisi ve fiyat listesi isteyin.",
    intro: "Meyveli veya Lotuslu tartlar, kafe vitrininizde farklı bir tat ve sunum seçeneği oluşturur. Mevcut üç çeşidi menünüzün dengesi ve servis düzeniyle birlikte değerlendirin.",
    paragraphs: ["Tart seçiminde yalnızca dolgu lezzetine değil, dilimin tabakta nasıl sunulacağına da karar verin. Meyveli seçeneklerle diğer yoğun tatlılar arasında kuracağınız denge, daha anlaşılır bir menü hazırlamanıza yardımcı olur.", "İstanbul ve çevresi için talep ettiğiniz çeşitleri ve öngördüğünüz sipariş ihtiyacını paylaşın. Paketleme, saklama ve teslimat koşullarını güncel ürün bilgisiyle birlikte sorabilirsiniz."],
  },
  {
    group: "cafe", category: "Ekler", slug: "fransiz-ekler", href: "/urunler/cafe/fransiz-ekler",
    title: "İstanbul’da Toptan Fransız Ekler",
    description: "Kafeler için Best Gourmet Fransız ekler çeşitleri: vanilyalı, çikolatalı, meyveli ve diğer seçenekler. İstanbul ve çevresi için ürün ve sipariş bilgisi alın.",
    intro: "Fransız ekler seçkisinde klasik kremalar ve farklı aroma seçeneklerini bir arada inceleyin. Tek lezzet odağı veya karışık bir vitrin düzeni için mevcut ürünleri karşılaştırabilirsiniz.",
    paragraphs: ["Ekler planlamasında lezzet dağılımı kadar vitrinde ayıracağınız alanı ve servis sırasında kullanılacak sunumu belirlemek de önemlidir. Karışık Mix Ekler ile tek lezzet seçeneklerini menünüzdeki talebe göre değerlendirin.", "İstanbul ve çevresindeki işletmeniz için çeşit bulunurluğunu ve sipariş koşullarını görüşelim. Ürün ölçüleri, saklama bilgisi ve teslimat uygunluğu gibi ayrıntıları siparişten önce teyit edin."],
  },
  {
    group: "cafe", category: "Magnolia", slug: "magnolia", href: "/urunler/cafe/magnolia",
    title: "İstanbul’da Toptan Magnolia ve Kase Tatlıları",
    description: "Best Gourmet magnolia, supangle ve kase tatlılarını inceleyin. İstanbul ve çevresindeki kafeler için mevcut çeşitler, ürün bilgisi ve güncel fiyat listesi.",
    intro: "Magnolia ve kase tatlıları seçkisi; meyveli, bisküvili ve çikolatalı seçenekleri bir araya getirir. Kataloğumuzdaki 330 cc kare cam kase sunumlarını işletmenizin menüsü için inceleyin.",
    paragraphs: ["Kase tatlısı seçerken servis alanınız, soğuk muhafaza kapasiteniz ve menüdeki diğer tatlılarla lezzet dengesi birlikte ele alınmalıdır. Çeşit sayısını belirlerken vitrininizi ve gerçek satış ihtiyacınızı esas alın.", "İstanbul ve çevresi için kase sunumu, ürün bulunurluğu ve teslimat koşullarına ilişkin sorularınızı paylaşın. Saklama talimatlarını ve güncel sipariş ayrıntılarını ekibimizden isteyebilirsiniz."],
  },
  {
    group: "cafe", category: "Rulo Pastalar", slug: "rulo-pastalar", href: "/urunler/cafe/rulo-pastalar",
    title: "İstanbul’da Toptan Rulo Pasta Çeşitleri",
    description: "Muzlu, çikolatalı, çilekli rulo ve İbiza seçeneklerini Best Gourmet kataloğunda inceleyin. İstanbul ve çevresindeki kafeler için toptan ürün bilgisi alın.",
    intro: "Rulo pasta seçkimizde muzlu, çilekli ve çikolatalı seçeneklerle İbiza çeşitleri bulunur. Dilim servise yönelik bu ürünleri kahve eşlikçisi veya vitrininizin tamamlayıcısı olarak değerlendirebilirsiniz.",
    paragraphs: ["Menünüz için rulo pasta seçerken dilim sunumu ile bütün ürün planlamasını birlikte düşünün. Mevcut tatlılarınızın yanında meyveli ve çikolatalı seçeneklere ayıracağınız yeri belirlemek, sipariş listesini sadeleştirir.", "İstanbul ve çevresi için ihtiyacınızı paylaşarak çeşitlerin bulunurluğunu, ürün bilgilerini ve teslimat uygunluğunu öğrenin. Porsiyonlama ve muhafaza ayrıntılarını sipariş öncesinde doğrulayın."],
  },
  {
    group: "cafe", category: "Tek Pastalar", slug: "tek-pastalar", href: "/urunler/cafe/tek-pastalar",
    title: "İstanbul’da Toptan Tek Porsiyon Pastalar",
    description: "Lotus Bomba, Paris Brest ve diğer Best Gourmet tek pasta çeşitlerini keşfedin. İstanbul ve çevresindeki kafeler için vitrin seçkisi ve toptan bilgi talebi.",
    intro: "Tek porsiyon pastalar, farklı lezzet ve formları aynı vitrin içinde sunmak isteyen kafeler için bir seçki oluşturur. Lotus Bomba, Paris Brest, Antepistan ve diğer ürünleri birlikte inceleyin.",
    paragraphs: ["Tek pasta seçiminde vitrinde oluşacak renk ve form dengesi kadar servis tabağınızın ölçüsü de önem taşır. Menüdeki yoğun çikolatalı tatlarla meyveli veya farklı aromalı ürünlerin dağılımını planlayabilirsiniz.", "İstanbul ve çevresindeki işletmeniz için ilgilendiğiniz ürünleri belirterek bilgi alın. Ürün içeriği, alerjen bilgisi, saklama koşulları ve sipariş uygunluğunu ekibimizle teyit edin."],
  },
  {
    group: "cafe", category: "Mono Pasta", slug: "mono-pastalar", href: "/urunler/cafe/mono-pastalar",
    title: "İstanbul’da Toptan Mono Pasta Çeşitleri",
    description: "Best Gourmet mono pasta seçkisini Lotus, Lime, Frambuaz ve diğer aromalarla inceleyin. İstanbul ve çevresindeki işletmeler için toptan sipariş bilgisi.",
    intro: "Mono pasta koleksiyonunda her ürünü tek porsiyon sunum yaklaşımıyla değerlendirebilirsiniz. Lotus, Lime, Frambuaz, Mango Ananas, Antep Fıstığı Dubai ve Oreo seçenekleri katalogda yer alır.",
    paragraphs: ["Katalogdaki mono pastalar 8 cm genişlik ve 7–8 cm yükseklik bilgisiyle sunulur. Vitrin yerleşimi ve tabak seçiminizi bu ölçülerle birlikte gözden geçirerek sunum düzeninizi planlayın.", "İstanbul ve çevresi için mono pasta bulunurluğu ve sipariş bilgilerini talep edebilirsiniz. Taşıma, muhafaza ve servis hazırlığına ilişkin koşulları ürün bazında görüşmek faydalıdır."],
  },
  {
    group: "pastane", category: "Pasta Çeşitleri", slug: "pasta-cesitleri", href: "/urunler/pastane/pasta-cesitleri",
    title: "İstanbul’da Pastaneler İçin Toptan Pasta",
    description: "Best Gourmet bütün ve dilim pasta çeşitlerini keşfedin. İstanbul ve çevresindeki pastaneler için mevcut ürünler, toptan fiyat listesi ve sipariş bilgisi.",
    intro: "Pastane seçkimizde 1 no bütün pastalar ve dilim pasta serisi birlikte yer alır. Bütün pasta talepleri ile tek dilim satışınızı ayrı ayrı değerlendirerek işletmenize uygun ürünleri belirleyin.",
    paragraphs: ["Bütün ve dilim pasta planlaması farklı servis ihtiyaçlarına yanıt verir. Lotuslu, meyveli ve çikolatalı çeşitlerin yanında Red Velvet, Devil’s ve karamelli seçenekleri de vitrininizdeki dağılıma göre karşılaştırabilirsiniz.", "İstanbul ve çevresindeki pastaneniz için güncel çeşitleri ve sipariş koşullarını görüşelim. Bütün ürün ölçüleri, dilim sunumu ve teslimat uygunluğu hakkındaki ayrıntıları siparişten önce netleştirin."],
  },
  {
    group: "pastane", category: "Trileçe", slug: "trilece", href: "/urunler/pastane/trilece",
    title: "İstanbul’da Toptan Trileçe ve Islak Kek",
    description: "Karamel, frambuazlı ve Lotuslu trileçe ile çikolatalı ıslak kek seçkisi. İstanbul ve çevresindeki pastaneler için Best Gourmet toptan ürün bilgisi alın.",
    intro: "Trileçe kategorisinde karamel, frambuazlı ve Lotuslu seçeneklerin yanında çikolatalı ıslak kek bulunur. Tek porsiyon ürünleri pastanenizin günlük satış düzenine göre değerlendirin.",
    paragraphs: ["Sos ve aroma seçimini menünüzdeki diğer ürünlerle birlikte ele almak, benzer tatların gereğinden fazla tekrarını önleyebilir. Trileçe ve ıslak keki aynı ürün gibi değerlendirmek yerine içerik ve sunum bilgilerini ayrı ayrı inceleyin.", "İstanbul ve çevresi için mevcut çeşitler, muhafaza talimatları ve sipariş uygunluğu hakkında bilgi isteyin. Talep ettiğiniz ürün ve adetleri belirterek güncel fiyat listesini alabilirsiniz."],
  },
  {
    group: "pastane", category: "Adet Pastalar", slug: "adet-pastalar", href: "/urunler/pastane/adet-pastalar",
    title: "İstanbul’da Toptan Adet Pasta Çeşitleri",
    description: "Best Gourmet yaklaşık 10 cm, tam sıvalı adet pasta çeşitlerini inceleyin. İstanbul ve çevresindeki pastaneler için ürün seçimi ve toptan sipariş bilgisi.",
    intro: "Yaklaşık 10 cm, tam sıvalı adet pastalarımızı pastane vitrininiz için inceleyin. Lotuslu, meyveli ve çikolatalı çeşitler arasından işletmenizin taleplerine uygun seçenekleri belirleyebilirsiniz.",
    paragraphs: ["Adet pasta planlarken vitrinde ayıracağınız yer, ambalaj ihtiyacı ve müşterilerinizin aradığı aroma çeşitliliği birlikte düşünülmelidir. Katalogdaki ürünleri daha büyük bütün pasta seçenekleriyle karıştırmadan ölçü ve sunum bilgileri üzerinden karşılaştırın.", "İstanbul ve çevresindeki pastaneniz için ürün bulunurluğunu, paketleme seçeneklerini ve teslimat uygunluğunu görüşebilirsiniz. Güncel fiyat ve sipariş koşullarını ekibimizden talep edin."],
  },
];

export function getWholesaleCategory(group: string, slug: string) {
  return wholesaleCategories.find((entry) => entry.group === group && entry.slug === slug);
}
