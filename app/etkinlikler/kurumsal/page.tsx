import type { Metadata } from "next";
import { EventCategoryPage } from "@/components/events/event-category-page";
import { eventCategories } from "@/lib/event-data";

export const metadata: Metadata = { title: "Kurumsal Etkinlikler | Best Gourmet", description: "Toplantı, lansman, açılış, fuar ve şirket davetleri için tatlı, sunum ve servis çözümleri." };

export default function CorporateEventsPage() { return <EventCategoryPage category={eventCategories.kurumsal} />; }
