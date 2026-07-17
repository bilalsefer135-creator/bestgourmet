export type EventCategory = {
  slug: string;
  number: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  lead: string;
  short: string;
  cover: string;
  services: string[];
  whoFor: string[];
  customizations: string[];
  benefits: Array<{ title: string; body: string }>;
  gallery: Array<{ src: string; alt: string; label: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

const sku = (file: string) => `/products-studio/sku/${file}.webp`;

export const eventProcess = [
  { title: "İhtiyacı dinleme", body: "Etkinliğin amacı, tarihi, mekânı ve beklenen konuk deneyimini birlikte netleştiririz." },
  { title: "Kapsamı belirleme", body: "Kişi sayısı, servis süresi, mekân koşulları ve ihtiyaç duyulan hizmetleri çerçeveleriz." },
  { title: "Menü kurgusu", body: "Konsepte ve servis akışına uygun tatlı, pasta, içecek ve sunum alternatiflerini oluştururuz." },
  { title: "Sunum planı", body: "Masa yerleşimi, porsiyon düzeni, servis ekipmanı ve görsel dili planlarız." },
  { title: "Teklif ve onay", body: "Seçilen kapsamı anlaşılır kalemlerle paylaşır, onaylanan plana göre takvimi başlatırız." },
  { title: "Üretim hazırlığı", body: "Ürünleri planlanan adet, porsiyon ve sunum standardında üretime alırız." },
  { title: "Kurulum ve servis", body: "Seçilen hizmete göre teslimat, yerleşim, karşılama ve servis akışını uygularız." },
  { title: "Etkinlik kapanışı", body: "Servis sonunu, ekipman ve alan düzenini planlanan kapsam doğrultusunda tamamlarız." },
];

export const eventCategories: Record<string, EventCategory> = {
  dugun: {
    slug: "dugun",
    number: "01",
    navLabel: "Düğün",
    eyebrow: "Düğün etkinlikleri",
    title: "En özel ‘evet’inizi, incelikle servis ediyoruz.",
    lead: "Düğün, nişan, kına, söz ve nikâh davetlerinde tatlı menüsünden masa sunumuna kadar her ayrıntıyı mekânınıza, davet akışınıza ve misafir sayınıza göre planlıyoruz.",
    short: "Düğün, nişan, kına ve nikâh davetleri için menü, sunum ve servis planlaması.",
    cover: "/events/dugun.webp",
    services: ["Düğün, nişan, kına, söz ve nikâh", "Açık hava, salon ve konsept davet", "Tatlı, pasta ve porsiyonluk ürün seçkisi", "Masa, büfe ve dekorla uyumlu sunum", "Karşılama ve servis akışı planı", "Teslimat, kurulum ve ekip desteği", "Konuk sayısına göre üretim planı", "İhtiyaca göre ek hizmet koordinasyonu"],
    whoFor: ["Düğününü kişisel bir lezzet diliyle tamamlamak isteyen çiftler", "Ev, bahçe, kır ya da salon daveti planlayan aileler", "Tatlı büfesini mekân ve dekorla bütünleştirmek isteyen organizasyon ekipleri"],
    customizations: ["Renk ve sunum paleti", "Porsiyon ve ürün çeşitliliği", "Masa veya dolaşan servis", "Mekâna uygun kurulum", "Alerjen ve içerik notları", "Teslimat ve servis zamanlaması"],
    benefits: [
      { title: "Tek bir akış", body: "Menü, üretim, teslimat ve servis planını aynı çerçevede takip edersiniz." },
      { title: "Davet diline uyum", body: "Sunumu renk, mekân ve davetin temposuna göre sade ya da dikkat çekici kurgularız." },
      { title: "Ölçeklenebilir menü", body: "Ürün ve porsiyon planı, konuk sayısı ve servis biçimine göre şekillenir." },
    ],
    gallery: [
      { src: "/events/dugun.webp", alt: "Düğün tatlı masası hazırlayan servis ekibini gösteren konsept görsel", label: "Servis atmosferi · Konsept görsel" },
      { src: sku("pasta-beyaz-cikolatali"), alt: "Beyaz çikolatalı bütün pasta", label: "Bütün pasta alternatifi" },
      { src: sku("mono-frambuaz"), alt: "Frambuazlı mono pasta", label: "Porsiyonluk sunum" },
      { src: sku("ekler-karisik-mix"), alt: "Karışık Fransız ekleri", label: "Paylaşım seçkisi" },
    ],
    faqs: [
      { question: "Kaç kişilik davetler için planlama yapıyorsunuz?", answer: "Sabit bir alt veya üst sayı belirtmeden, mekân koşulları ve servis akışına göre ihtiyacı değerlendiriyoruz. Kişi tahmininizi formda paylaşmanız ilk planı hızlandırır." },
      { question: "Dış mekânda servis mümkün mü?", answer: "Mümkünlük; tarih, hava koşulları, soğuk muhafaza ve mekân altyapısına göre değerlendirilir. Teklif öncesinde bu detayları birlikte netleştiririz." },
      { question: "Menü ve sunum davet renklerine uyarlanabilir mi?", answer: "Ürün yapısı elverdiği ölçüde renk, porsiyon ve sunum dili davet konseptine uyarlanabilir. Nihai görünüm üretim güvenliği ve lezzet standardı korunarak belirlenir." },
    ],
  },
  "dogum-gunu": {
    slug: "dogum-gunu",
    number: "02",
    navLabel: "Doğum Günü",
    eyebrow: "Doğum günü etkinlikleri",
    title: "Yeni yaşın enerjisini, masaya taşıyoruz.",
    lead: "Çocuk, yetişkin, sürpriz ya da temalı doğum günlerinde; pastadan porsiyonluk tatlılara, ev kurulumundan bahçe servisine kadar kutlamayı kişiye özel bir bütün olarak ele alıyoruz.",
    short: "Çocuk, yetişkin, sürpriz ve temalı kutlamalara kişiye özel pasta, ikram ve servis.",
    cover: "/events/dogum-gunu.webp",
    services: ["Çocuk ve yetişkin doğum günleri", "Sürpriz ve temalı kutlamalar", "Ev, bahçe, salon ve açık hava planı", "Doğum günü pastası ve tatlı seçkisi", "Cup, tart, ekler ve mono pasta büfesi", "İçecek ve ikram akışı", "Kurulum, servis ve misafir karşılama", "Kişiye özel menü ve sunum"],
    whoFor: ["Evinde veya bahçesinde zahmetsiz bir kutlama isteyenler", "Çocuklar için renkli ama rafine bir masa planlayan aileler", "Yetişkin kutlamasında sade, fotojenik ve iyi servis edilen bir menü arayanlar"],
    customizations: ["Yaş ve kutlama teması", "Pasta boyutu ve aroması", "Renk ve süsleme yaklaşımı", "Çocuk/yetişkin porsiyonu", "Ev, bahçe veya salon kurulumu", "Sürpriz zamanlama planı"],
    benefits: [
      { title: "Kişiye özel", body: "Menü ve görünüm, kutlanan kişinin zevki ile misafir profilini birlikte taşır." },
      { title: "Kolay servis", body: "Porsiyonluk seçeneklerle yoğun kutlama anlarında akıcı ve düzenli bir ikram sağlanır." },
      { title: "Esnek kurulum", body: "Evden açık havaya farklı mekân tipleri için uygulanabilir bir masa ve teslimat planı oluşturulur." },
    ],
    gallery: [
      { src: "/events/dogum-gunu.webp", alt: "Doğum günü tatlı masasını hazırlayan ekip konsept görseli", label: "Kutlama atmosferi · Konsept görsel" },
      { src: sku("pasta-meyveli"), alt: "Meyveli doğum günü pastası alternatifi", label: "Kutlama pastası" },
      { src: sku("adet-cilekli"), alt: "Çilekli adet pasta", label: "Tek porsiyon servis" },
      { src: sku("mono-mango-ananas"), alt: "Mango ananas mono pasta", label: "Enerjik lezzet" },
    ],
    faqs: [
      { question: "Doğum günü pastasını kişiselleştirebilir miyiz?", answer: "Aroma, porsiyon ve uygulanabilir süsleme detayları kişi ve konsept doğrultusunda planlanabilir. Görseli etkileyen teknik sınırlar teklif öncesinde açıkça paylaşılır." },
      { question: "Ev veya bahçede kurulum yapıyor musunuz?", answer: "Kurulum seçeneği; adres, erişim, masa alanı ve seçilen hizmet kapsamına göre planlanır. Formda mekân tipini belirtmeniz yeterlidir." },
      { question: "Çocuklara uygun ürün seçimi nasıl yapılıyor?", answer: "Yaş grubu, porsiyon büyüklüğü ve içerik tercihleri dikkate alınır. Bilinen alerjen veya hassasiyetlerin sipariş öncesinde yazılı olarak bildirilmesi gerekir." },
    ],
  },
  "ozel-gun": {
    slug: "ozel-gun",
    number: "03",
    navLabel: "Özel Gün",
    eyebrow: "Özel gün etkinlikleri",
    title: "Hatırlanacak anlara, kendine ait bir tat.",
    lead: "Yıldönümünden mezuniyete, baby shower’dan özel akşam yemeğine kadar farklı kutlamaları; duygusuna, misafir profiline ve mekânına uygun menü ve sunum diliyle tasarlıyoruz.",
    short: "Yıldönümü, mezuniyet, baby shower ve kişisel davetlere esnek menü ve sunum.",
    cover: "/events/ozel-gun.webp",
    services: ["Yıldönümü ve özel akşam yemekleri", "Mezuniyet, baby shower ve cinsiyet partisi", "Bekârlığa veda ve aile kutlamaları", "Bayram, yılbaşı ve sürpriz organizasyon", "Açılış, davet ve butik buluşmalar", "Kişisel veya kurumsal konsept", "Tatlı, pasta, ikram ve içecek planı", "Kurulum, sunum ve servis desteği"],
    whoFor: ["Küçük bir daveti özenli bir deneyime dönüştürmek isteyenler", "Farklı özel günler için tek noktadan menü ve servis planı arayanlar", "Sürprizini zamanlama ve sunumla güçlendirmek isteyen kişiler veya ekipler"],
    customizations: ["Etkinlik duygusu ve tema", "Kişiye özel ürün seçkisi", "Butik veya geniş ikram planı", "Masa ve büfe sunumu", "Sürpriz teslimat zamanlaması", "Ev, teras, ofis veya mekân uyumu"],
    benefits: [
      { title: "Butik yaklaşım", body: "Etkinliğin büyüklüğünden önce duygusunu ve kullanım biçimini merkeze alırız." },
      { title: "Farklı günlere uyum", body: "Tek bir hazır paket yerine menü ve sunum kapsamı etkinliğe göre oluşturulur." },
      { title: "Net plan", body: "Zamanlama, teslimat ve servis ihtiyacı başlangıçta netleştirilerek sürprizler azaltılır." },
    ],
    gallery: [
      { src: "/events/ozel-gun.webp", alt: "Özel gün tatlı masası hazırlayan ekip konsept görseli", label: "Butik davet · Konsept görsel" },
      { src: sku("cheesecake-orman-meyveli"), alt: "Orman meyveli cheesecake", label: "Paylaşım pastası" },
      { src: sku("magnolia-cilekli"), alt: "Çilekli magnolia", label: "Cup servis" },
      { src: sku("tart-orman-meyveli"), alt: "Orman meyveli tart", label: "Butik sunum" },
    ],
    faqs: [
      { question: "Küçük ve butik organizasyonlar için de teklif alabilir miyim?", answer: "Evet. Etkinliği kişi sayısından bağımsız olarak tarih, mekân, menü ve ihtiyaç duyulan hizmetler üzerinden değerlendiriyoruz." },
      { question: "Sürpriz teslimat veya kurulum planlanabilir mi?", answer: "Adres, erişim ve saat bilgileri uygun olduğunda sürpriz akışına göre plan yapılabilir. İletişim kurulacak alternatif bir kişinin paylaşılması gerekebilir." },
      { question: "Birden fazla özel gün temasını birleştirebilir miyiz?", answer: "Evet. Menü ve sunum dili, etkinliğin ana duygusu korunarak birden fazla kullanım ihtiyacına göre kurgulanabilir." },
    ],
  },
  kurumsal: {
    slug: "kurumsal",
    number: "04",
    navLabel: "Kurumsal",
    eyebrow: "Kurumsal etkinlikler",
    title: "Markanızın ritmine uygun, kusursuz bir servis akışı.",
    lead: "Toplantıdan lansmana, şirket yemeğinden fuar ikramına kadar kurumsal buluşmaları; hızlı servis, düzenli porsiyon ve markanın temsil gücünü destekleyen rafine sunumlarla planlıyoruz.",
    short: "Toplantı, lansman, açılış ve şirket davetlerine ölçeklenebilir ürün ve servis çözümleri.",
    cover: "/events/kurumsal.webp",
    services: ["Şirket yemekleri ve kurumsal davet", "Toplantı, seminer ve eğitim ikramı", "Lansman, açılış ve ürün tanıtımı", "Personel motivasyon ve ödül etkinliği", "Fuar ve yoğun ziyaretçi akışı", "Müşteri ve iş ortağı buluşmaları", "Porsiyonluk tatlı ve içecek servisi", "Kurulum, servis ekibi ve zaman planı"],
    whoFor: ["Marka deneyimini ikram ve sunumla desteklemek isteyen şirketler", "Kısa molada hızlı ve düzenli servis ihtiyacı olan toplantı ekipleri", "Lansman, açılış veya fuar alanında ölçeklenebilir ürün planı arayan organizatörler"],
    customizations: ["Etkinlik programına uygun servis", "Porsiyon ve adet planı", "Sunum rengi ve ekipman dili", "Toplantı arası veya gün boyu akış", "Teslimat ve kurulum penceresi", "İçerik ve alerjen bilgilendirmesi"],
    benefits: [
      { title: "Operasyon odağı", body: "Menü, ziyaretçi akışı ve servis süresine göre pratik bir biçimde planlanır." },
      { title: "Tutarlı sunum", body: "Porsiyon ve yerleşim dili, kalabalık servislerde görsel bütünlüğü koruyacak şekilde hazırlanır." },
      { title: "Şeffaf kapsam", body: "Ürün, teslimat, kurulum ve ekip ihtiyacı teklif aşamasında ayrı ayrı netleştirilir." },
    ],
    gallery: [
      { src: "/events/kurumsal.webp", alt: "Kurumsal tatlı servisi hazırlayan ekip konsept görseli", label: "Kurumsal servis · Konsept görsel" },
      { src: sku("mono-antep-fistigi-dubai"), alt: "Antep fıstığı Dubai mono pasta", label: "Porsiyon kontrollü" },
      { src: sku("ekler-vanilyali"), alt: "Vanilyalı Fransız ekleri", label: "Toplantı ikramı" },
      { src: sku("magnolia-yaban-mersinli"), alt: "Yaban mersinli magnolia", label: "Cup servis" },
    ],
    faqs: [
      { question: "Kurumsal etkinlikte ürün adedi nasıl planlanıyor?", answer: "Katılımcı tahmini, etkinlik süresi, servis tipi ve diğer ikramlar birlikte değerlendirilir. Bu bilgiler netleşmeden standart bir adet önermiyoruz." },
      { question: "Logo veya markaya özel sunum yapıyor musunuz?", answer: "Uygulanabilir sunum ve renk detayları değerlendirilebilir. Marka dosyaları ve kullanım izinleri müşteri tarafından sağlanır; nihai uygulama üretim tekniğine göre teyit edilir." },
      { question: "Fuar ve lansman gibi yoğun akışlarda servis mümkün mü?", answer: "Mekân erişimi, servis noktası, saklama koşulları ve ziyaretçi akışı uygun olduğunda yoğun servis planı oluşturulabilir." },
    ],
  },
};

export const eventCategoryList = [
  eventCategories.dugun,
  eventCategories["dogum-gunu"],
  eventCategories["ozel-gun"],
  eventCategories.kurumsal,
];
