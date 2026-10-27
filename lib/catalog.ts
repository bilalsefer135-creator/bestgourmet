export type Product = {
  name: string;
  category: string;
  detail: string;
  image: string;
};

export const sku = (file: string) => `/products-studio/sku/${file.includes(".") ? file : `${file}.webp`}`;
const makeProducts = (
  category: string,
  detail: string,
  items: Array<[string, string]>,
): Product[] => items.map(([name, file]) => ({ name, category, detail, image: sku(file) }));

export const products: Product[] = [
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

export const cafeCategories = ["Cheesecake", "Tartlar", "Ekler", "Magnolia", "Rulo Pastalar", "Tek Pastalar", "Mono Pasta"];
export const pastaneCategories = ["Pasta Çeşitleri", "Trileçe", "Ekler KG", "Rulo KG", "Adet Pastalar", "Mini Tartolet"];
export const upcomingCategories = ["Ekler KG", "Rulo KG", "Mini Tartolet"];
export const productGroups = [
  { name: "Cafe Ürünleri", categories: cafeCategories, image: "/brand/cafe-products-panel-v2.webp", href: "/urunler/cafe" },
  { name: "Pastane Ürünleri", categories: pastaneCategories, image: "/brand/pastane-products-panel-v2.webp", href: "/urunler/pastane" },
];
const categoryLabels: Record<string, string> = {
  Cheesecake: "Cheesecake Çeşitleri",
  Ekler: "Fransız Ekler",
  "Rulo Pastalar": "Rulo Çeşitleri",
  "Mono Pasta": "Mono Pastalar",
  "Ekler KG": "KG’lık Ekler",
  "Rulo KG": "KG’lık Mini Rulo",
};
export const categoryLabel = (category: string) => categoryLabels[category] ?? category;
