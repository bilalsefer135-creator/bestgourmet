import { pageMetadata } from "@/lib/seo";
import { EventCategoryPage } from "@/components/events/event-category-page";
import { eventCategories } from "@/lib/event-data";

export const metadata = pageMetadata("Özel Gün Etkinlikleri | Best Gourmet", "Yıldönümü, mezuniyet, baby shower, sürpriz ve butik davetler için menü, sunum ve servis.", "/etkinlikler/ozel-gun");

export default function SpecialEventsPage() { return <EventCategoryPage category={eventCategories["ozel-gun"]} />; }
