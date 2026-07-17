import type { Metadata } from "next";
import { EventCategoryPage } from "@/components/events/event-category-page";
import { eventCategories } from "@/lib/event-data";

export const metadata: Metadata = { title: "Düğün Etkinlikleri | Best Gourmet", description: "Düğün, nişan, kına, söz ve nikâh için tatlı menüsü, sunum, kurulum ve servis planlaması." };

export default function WeddingEventsPage() { return <EventCategoryPage category={eventCategories.dugun} />; }
