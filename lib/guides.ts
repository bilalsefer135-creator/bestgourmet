export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: GuideSection[];
  relatedLinks: { href: string; label: string }[];
};

export const guides: Guide[] = [
  {
    slug: "tedarikci-secimi",
    title: "Kafe ve pastaneler için tatlı tedarikçisi seçimi",
    description: "Tatlı tedarikçisi seçerken numune, ürün bilgisi, depolama, sipariş ve teslimat koşullarını işletmenizin ihtiyacına göre değerlendirin.",
    intro: "İyi bir tatlı, ancak işletmenizin günlük akışına uyduğunda doğru satın alma kararına dönüşür. İstanbul ve çevresindeki kafe ve pastaneler için tedarikçi seçimini; lezzet, servis, depolama ve iletişim başlıklarını birlikte ele alan bir değerlendirme olarak düşünün.",
    sections: [
      {
        heading: "Önce işletmenizin ihtiyacını yazın",
        paragraphs: ["Görüşmeye ürün isimlerinden önce işletmenizin çalışma biçimiyle başlayın. Oturarak servis, paket satış ve yoğun saatlerdeki siparişler aynı hazırlık süresini gerektirmeyebilir. Dolap alanınızı, mevcut ekipmanınızı ve ekibin porsiyonlama için ayırabildiği zamanı not edin. Yeni ürünün bu düzene nerede katılacağını tarif etmek, numune listesini daraltır.", "Hafta içi ile hafta sonunu ayrı değerlendirin. Geçmiş satışınız varsa ürün bazında adetleri ve satılmayan porsiyonları inceleyin; yeni açılacak bir işletmede ise ilk seçimi küçük bir menü varsayımıyla planlayın. Tedarikçiye bu varsayımın henüz doğrulanmadığını açıkça söyleyin."],
      },
      {
        heading: "Numuneyi kendi servis koşullarınızda değerlendirin",
        paragraphs: ["Numuneyi yalnızca ilk tadımdaki beğeniyle değerlendirmeyin. Ürün için verilen saklama ve servis talimatlarını izleyerek kendi tabağınızda, kendi porsiyonlama aracınızla deneyin. Kesim kolaylığı, tabağa aktarım, görünüm ve kahve eşliğindeki tat dengesi için kısa bir değerlendirme formu kullanın.", "Aynı ürünü farklı çalışanların hazırlaması, ekip içinde ne kadar tutarlı bir sunum yapılabildiğini gösterir. Pakette servis edecekseniz ürünü uygun ambalajla da değerlendirin. Bu deneme raf ömrü belirlemez; ürünün saklama koşulları ve kullanım süresi için üreticinin yazılı bilgisini isteyin."],
      },
      {
        heading: "Ürün bilgisini satın alma kararının parçası yapın",
        paragraphs: ["İçerik, alerjen, gramaj ve porsiyon bilgileri hem maliyet hesabınızı hem müşteriye vereceğiniz yanıtı etkiler. Ürün adından içerik veya diyet uygunluğu çıkarmayın. Özel bir beslenme talebi varsa uygunluğu ve çapraz temas bilgisini ürün özelinde teyit edin; doğrulanmayan bir özelliği menüye yazmayın."],
        bullets: ["Ürün hangi ambalaj ve satış birimiyle geliyor?", "Saklama, hazırlama ve servis talimatları nereden ediniliyor?", "İçerik veya ürün değişikliğinde işletmeye nasıl bilgi veriliyor?"],
      },
      {
        heading: "Teslimatı kendi adresiniz ve kapasiteniz için konuşun",
        paragraphs: ["İstanbul'da iki işletmenin mesafesi benzer olsa da mal kabul saatleri, bina erişimi ve depolama kapasitesi farklı olabilir. İstanbul ve çevresi için genel bir hizmet ifadesini, belirli adresinize verilmiş teslimat sözü olarak kabul etmeyin. İlçe ve adres bilgisiyle teslimat kapsamını, sipariş zamanlamasını ve taşıma koşullarını ayrıca sorun.", "Teslimatı kim karşılayacak, ürün bilgileri nasıl kontrol edilecek ve uygunsuzluk fark edilirse kime ulaşılacak? Bu soruların yanıtlarını siparişten önce belirleyin. Minimum sipariş, taşıma bedeli, iptal ve iade koşullarını yazılı teklifinizde netleştirin."],
      },
      {
        heading: "Düzenli siparişten önce sonucu kaydedin",
        paragraphs: ["İlk siparişte seçilen ürünleri aynı yöntemle izleyin: gelen miktar, servis edilen porsiyon, hazırlık süresi ve kalan ürün. Satış ekibinin yorumu ile müşteriden gelen geri bildirimi ayrı kaydetmek, kişisel beğeniyle işletme sonucunu birbirine karıştırmanızı önler.", "Tedarikçiye geri bildirim verirken ürün ve sipariş bilgisini somut biçimde paylaşın. Menüdeki yeri netleşen ürünlerle ilerleyin; çeşit artırmayı gerçek satış verisine bağlayın. Best Gourmet ürün gruplarını inceleyip düşündüğünüz ürünleri ve işletmenizin çalışma koşullarını paylaşarak görüşmeye başlayabilirsiniz."],
      },
    ],
    relatedLinks: [
      { href: "/urunler/cafe", label: "Cafe ürünlerini inceleyin" },
      { href: "/urunler/pastane", label: "Pastane ürünlerini inceleyin" },
      { href: "/urunler/cafe/cheesecake", label: "Cheesecake çeşitlerine bakın" },
    ],
  },
  {
    slug: "toptan-tatli-fiyatlari",
    title: "Toptan tatlı fiyatlarını karşılaştırma rehberi",
    description: "Toptan tatlı tekliflerini porsiyon maliyeti, ürün kapsamı, fire, ambalaj ve teslimat koşulları üzerinden karşılaştırmak için işletme rehberi.",
    intro: "Bir fiyat listesindeki en düşük rakam, menünüz için en uygun maliyeti tek başına göstermez. İstanbul ve çevresindeki işletmeler için sağlıklı karşılaştırma; aynı ürün kapsamını, servis edilen porsiyonu ve siparişin toplam koşullarını birlikte görmeyi gerektirir.",
    sections: [
      {
        heading: "Karşılaştırılabilir bir teklif isteyin",
        paragraphs: ["Bir teklif adet, diğeri tepsi veya kilogram üzerinden düzenlenmiş olabilir. Önce satış birimini, ambalaj içeriğini, ürün gramajını ve belirtilen porsiyon bilgisini netleştirin. Aynı adı taşıyan iki tatlının içeriği ve sunum biçimi farklı olabileceğinden yalnızca ürün adına bakarak eşdeğer kabul etmeyin.", "Teklif talebinize ilgilendiğiniz ürünleri, tahmini ihtiyacı ve teslimat adresinin bulunduğu bölgeyi ekleyin. Verginin, ambalajın ve varsa taşıma bedelinin rakama dahil olup olmadığını sorun. Fiyatın geçerliliğini ve ödeme koşullarını yazılı olarak isteyin; bu rehberde güncel ürün fiyatı veya sabit fiyat aralığı verilmez."],
      },
      {
        heading: "Birim fiyatı servis edilen porsiyona çevirin",
        paragraphs: ["Karşılaştırmanın ortak birimi müşteriye sunduğunuz porsiyon olsun. Ürün alış tutarını, o üründen kendi servis standardınıza uygun çıkarabildiğiniz porsiyon sayısına bölün. Porsiyon sayısını tahminle büyütmek yerine numune üzerinde kendi ekipmanınızla kontrol edin. Hazır tek porsiyon üründe de paketteki adet ve gramaj bilgisini teyit edin.", "Bu hesap ürün maliyetini görünür kılar; işletmenin bütün giderlerini içermez. Tabak süslemesi, eşlikçi sos ve paket satışta kullanılan malzeme gibi doğrudan ekleri ayrıca kaydedin. Kendi işletmenizdeki verileri kullanın; başka bir kafenin porsiyon sayısı sizin servis standardınıza uymayabilir."],
      },
      {
        heading: "Fireyi ve hazırlık yükünü hesaba katın",
        paragraphs: ["Satılamayan ürün, servis sırasında dağılan porsiyon ve gereğinden büyük kesim farklı nedenlerle oluşur. Bunları tek bir genel oran altında toplamak yerine ayrı izleyin. İlk siparişte alış miktarını büyütmeden satış hızını görmek, hesapta kullanılan porsiyon sayısının gerçekçi olup olmadığını anlamanıza yardımcı olur.", "Hazırlık için gereken personel zamanı da ürün seçiminde önemlidir. Kesim veya tabaklama işlemi yoğun saatte akışı zorluyorsa satın alma fiyatındaki fark tek başına karar vermeye yetmez. Saklama ve kullanım sürelerini üreticiden doğrulayın; maliyeti düşürmek için ürün talimatlarını değiştirmeyin."],
      },
      {
        heading: "Sipariş koşullarını toplam tutarla birlikte okuyun",
        paragraphs: ["Daha büyük siparişin birim tutarı farklı olabilir; ancak stok için yer ve satış hızı gerekir. Minimum siparişin nasıl uygulandığını, farklı ürünlerin aynı siparişte birleştirilip birleştirilemediğini ve teslimatın hangi koşullarda yapıldığını sorun. Bu koşullar her işletme ve teklif için ayrıca doğrulanmalıdır."],
        bullets: ["Teklifteki satış birimi ve ürün miktarı açık mı?", "Vergi, ambalaj ve taşıma kalemleri ayrı görülebiliyor mu?", "Ödeme, değişiklik, iptal ve uygunsuz ürün bildirimi koşulları yazılı mı?", "Teslimat kapsamı ve sipariş zamanlaması sizin adresiniz için teyit edildi mi?"],
      },
      {
        heading: "Kararı menü verisiyle tamamlayın",
        paragraphs: ["Her ürün için alış birimi, servis porsiyonu, doğrudan ek maliyet ve kalan miktar sütunları olan basit bir karşılaştırma tablosu hazırlayın. Birkaç farklı ürünü aynı yöntemle değerlendirmek, hangi seçeneğin menüde hangi görevi üstlendiğini gösterir. Satış fiyatınızı ve hedeflediğiniz kazancı kendi gider yapınıza göre ayrıca belirleyin.", "Best Gourmet'e fiyat bilgisi için başvururken ürün grubunu ve ilgilendiğiniz çeşitleri belirtin. Güncel teklif ve işletmenize uygulanacak koşullar görüşmede netleşir. Katalog, seçenekleri belirlemek için başlangıçtır; kesin stok veya fiyat taahhüdü yerine geçmez."],
      },
    ],
    relatedLinks: [
      { href: "/urunler/cafe/tek-pastalar", label: "Tek pasta çeşitlerini inceleyin" },
      { href: "/urunler/pastane", label: "Pastane ürünlerini inceleyin" },
      { href: "/urunler/pastane/trilece", label: "Trileçe seçeneklerine bakın" },
    ],
  },
  {
    slug: "kafe-menusu-tatli-secimi",
    title: "Kafe menüsü için tatlı seçimi",
    description: "Kafenizin tatlı menüsünü müşteri talebi, tat dengesi, servis kapasitesi ve satış takibiyle kurun; çeşit sayısını işletmenizin verisine göre belirleyin.",
    intro: "Tatlı menüsü, vitrini dolduran bir çeşit listesi olmanın ötesinde günlük servis kararınızın bir parçasıdır. İstanbul ve çevresinde bir kafe işletiyorsanız ürün seçimini müşteri beklentisi kadar dolap alanı, ekip kapasitesi ve satış hızınızla birlikte planlayın.",
    sections: [
      {
        heading: "Müşterinin ne zaman ve nasıl sipariş verdiğini anlayın",
        paragraphs: ["Kahvenin yanında kısa bir mola için verilen siparişle, paylaşmak veya paket götürmek için seçilen tatlı aynı ihtiyacı karşılamayabilir. Mevcut işletmede günün saatlerine göre satışları ve müşterinin sorduğu ürünleri kaydedin. Yeni bir kafede ise çevredeki işletmelerin menülerini kopyalamak yerine kendi servis biçiminize uygun bir başlangıç seçkisi oluşturun.", "Paket satışın payını ve oturarak servis süresini ayrı düşünün. Bir ürünü menüye almadan önce hangi ihtiyaç için seçtiğinizi bir cümleyle yazın. Aynı görevi üstlenen çok sayıda çeşidi ilk günden eklemek, stok takibini zorlaştırabilir ve hangi ürüne talep olduğunu okumayı güçleştirebilir."],
      },
      {
        heading: "Menüyü tat profilleri ve servis biçimiyle kurun",
        paragraphs: ["Çikolata ağırlıklı, meyveli veya farklı dokular sunan seçenekleri birlikte değerlendirirken ürünlerin gerçek içerik bilgilerini esas alın. Cheesecake, ekler ve tek pasta gibi grupları yalnızca isimlerine göre değil, porsiyon biçimi ve hazırlık gereksinimleriyle de karşılaştırın. Amaç her gruptan ürün bulundurmak değil, seçilen her ürüne menüde anlaşılır bir yer vermektir.", "Tatlıları servis ettiğiniz kahvelerle birlikte deneyin. Yoğunluk, tatlılık ve porsiyon büyüklüğünü ekibinizle aynı form üzerinden değerlendirin. Müşteriye önerilecek eşleşmeleri bu tadıma dayandırın; herkes için geçerli tek bir doğru eşleşme olduğunu varsaymayın."],
      },
      {
        heading: "Vitrin ve ekip kapasitesini seçimden önce kontrol edin",
        paragraphs: ["Seçeneklerin sayısı arttıkça depolama, etiketleme ve servis takibi de artar. Ürün için bildirilen saklama koşullarını dolabınızın kapasitesiyle birlikte kontrol edin. Sunum için ayırdığınız alanın dışında yedek ürünün nerede tutulacağını da planlayın. Bir fotoğraftaki görünümün sizin vitrin koşullarınızda aynı kalacağını varsaymayın.", "Yoğun saatte ürünü hazırlayan kişinin izleyeceği adımları deneyin: paketi açma, gerekiyorsa porsiyonlama, tabağa veya servis ambalajına aktarma. İşlem akışı ekibi zorluyorsa seçimi yeniden değerlendirin. Saklama ve servis talimatları ile ürünün kullanım süresini tedarikçiden ürün özelinde isteyin."],
      },
      {
        heading: "Kısa bir deneme menüsünü aynı ölçütlerle takip edin",
        paragraphs: ["İlk menüyü yönetilebilir bir seçkiyle başlatın ve değerlendirme dönemini kendi satış hacminize göre belirleyin. Bir ürünü sadece tek bir yoğun günün sonucuyla başarılı veya başarısız saymayın. Satış adediyle birlikte stokta kalmadığı saatleri de not edin; ürünün az satılması her zaman talep olmadığı anlamına gelmez."],
        bullets: ["Hangi ürün kaç porsiyon satıldı ve ne kadar kaldı?", "Hazırlama veya paketleme sırasında hangi güçlükler yaşandı?", "Müşteri en çok hangi içerik ve alerjen sorularını sordu?", "Yeni çeşit mevcut ürünün satışını mı paylaştı, farklı bir talebi mi karşıladı?"],
      },
      {
        heading: "Menüyü ve sipariş planını birlikte güncelleyin",
        paragraphs: ["Seçkiyi genişletirken bir seferde sınırlı değişiklik yapmak, sonucun nedenini anlamayı kolaylaştırır. Zayıf satışın ürün seçiminden mi, menüdeki açıklamadan mı, görünürlükten mi kaynaklandığını inceleyin. Menüde içerik ve alerjen konusunda yalnızca doğrulanmış bilgileri kullanın; özel beslenme taleplerine uygunluğu ürün adına bakarak belirtmeyin.", "Best Gourmet kataloğundan ilgilendiğiniz çeşitleri belirleyip servis biçiminizi, tahmini ihtiyacınızı ve adresinizin bulunduğu bölgeyi paylaşın. Ürün bilgisi, bulunabilirlik ve teslimat koşullarını görüşmede teyit edin. Menü kararını tadım ve işletmenizin satış verisiyle tamamlayın."],
      },
    ],
    relatedLinks: [
      { href: "/urunler/cafe/cheesecake", label: "Cheesecake çeşitlerini inceleyin" },
      { href: "/urunler/cafe/fransiz-ekler", label: "Fransız ekler çeşitlerini inceleyin" },
      { href: "/urunler/cafe/tek-pastalar", label: "Tek pasta çeşitlerini inceleyin" },
      { href: "/urunler/cafe/magnolia", label: "Magnolia çeşitlerine bakın" },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function serializeGuideJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
