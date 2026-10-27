import { pageMetadata } from "@/lib/seo";
import { EventCategoryPage } from "@/components/events/event-category-page";
import { eventCategories } from "@/lib/event-data";

export const metadata = pageMetadata("Düğün Etkinlikleri | Best Gourmet", "Düğün, nişan, kına, söz ve nikâh için tatlı menüsü, sunum, kurulum ve servis planlaması.", "/etkinlikler/dugun");

export default function WeddingEventsPage() { return <EventCategoryPage category={eventCategories.dugun} />; }
