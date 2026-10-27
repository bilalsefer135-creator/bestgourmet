import Home from "../../page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Pastane Ürünleri | Best Gourmet",
  "İstanbul ve çevresindeki pastaneler için Best Gourmet toptan pasta, trileçe ve adet pasta seçkisini inceleyin; sipariş ve ürün bilgisi için iletişime geçin.",
  "/urunler/pastane",
);

export default function PatisserieProductsPage() {
  return <Home productGroup="Pastane Ürünleri" />;
}
