import { notFound } from "next/navigation";
import Home from "../../../page";
import { getWholesaleCategory, wholesaleCategories } from "@/lib/catalog-seo";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return wholesaleCategories.filter((entry) => entry.group === "cafe").map((entry) => ({ category: entry.slug }));
}

export async function generateMetadata({ params }: Props) {
  const entry = getWholesaleCategory("cafe", (await params).category);
  if (!entry) notFound();
  return pageMetadata(`${entry.title} | Best Gourmet`, entry.description, entry.href);
}

export default async function CafeCategoryPage({ params }: Props) {
  const entry = getWholesaleCategory("cafe", (await params).category);
  if (!entry) notFound();
  return <Home key={entry.href} productGroup="Cafe Ürünleri" initialCategory={entry.category} />;
}
