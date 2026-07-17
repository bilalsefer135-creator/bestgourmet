import type { Metadata } from "next";
import { EventCategoryPage } from "@/components/events/event-category-page";
import { eventCategories } from "@/lib/event-data";

export const metadata: Metadata = { title: "Doğum Günü Etkinlikleri | Best Gourmet", description: "Çocuk, yetişkin, sürpriz ve temalı doğum günleri için pasta, ikram, sunum ve servis planlaması." };

export default function BirthdayEventsPage() { return <EventCategoryPage category={eventCategories["dogum-gunu"]} />; }
