import type { Metadata } from "next";
import { EventCategoryPage } from "@/components/events/event-category-page";
import { eventCategories } from "@/lib/event-data";

export const metadata: Metadata = { title: "Özel Gün Etkinlikleri | Best Gourmet", description: "Yıldönümü, mezuniyet, baby shower, sürpriz ve butik davetler için menü, sunum ve servis." };

export default function SpecialEventsPage() { return <EventCategoryPage category={eventCategories["ozel-gun"]} />; }
