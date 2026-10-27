import { pageMetadata } from "@/lib/seo";
import { EventCategoryPage } from "@/components/events/event-category-page";
import { eventCategories } from "@/lib/event-data";

export const metadata = pageMetadata("Kurumsal Etkinlikler | Best Gourmet", "Toplantı, lansman, açılış, fuar ve şirket davetleri için tatlı, sunum ve servis çözümleri.", "/etkinlikler/kurumsal");

export default function CorporateEventsPage() { return <EventCategoryPage category={eventCategories.kurumsal} />; }
