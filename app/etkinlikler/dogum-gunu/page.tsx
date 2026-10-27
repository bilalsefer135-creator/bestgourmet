import { pageMetadata } from "@/lib/seo";
import { EventCategoryPage } from "@/components/events/event-category-page";
import { eventCategories } from "@/lib/event-data";

export const metadata = pageMetadata("Doğum Günü Etkinlikleri | Best Gourmet", "Çocuk, yetişkin, sürpriz ve temalı doğum günleri için pasta, ikram, sunum ve servis planlaması.", "/etkinlikler/dogum-gunu");

export default function BirthdayEventsPage() { return <EventCategoryPage category={eventCategories["dogum-gunu"]} />; }
