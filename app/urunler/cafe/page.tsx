import Home from "../../page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Cafe Ürünleri | Best Gourmet",
  "İstanbul ve çevresindeki kafeler için Best Gourmet toptan tatlı seçkisi: cheesecake, tart, Fransız ekler, magnolia ve porsiyon pastaları inceleyin.",
  "/urunler/cafe",
);

export default function CafeProductsPage() {
  return <Home productGroup="Cafe Ürünleri" />;
}
