"use client";

import { FormEvent, useState } from "react";

type EventInquiryFormProps = {
  defaultEvent?: string;
  compact?: boolean;
};

const phone = "905015740522";

export function EventInquiryForm({ defaultEvent = "", compact = false }: EventInquiryFormProps) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const labels: Array<[string, string]> = [
      ["Etkinlik", String(form.get("eventType") || "")],
      ["Tarih", String(form.get("date") || "")],
      ["Konum", String(form.get("location") || "")],
      ["Tahmini kişi", String(form.get("guests") || "")],
      ["Hizmetler", String(form.get("services") || "")],
      ["İletişim", String(form.get("contact") || "")],
      ["Not", String(form.get("note") || "")],
    ];
    const message = [
      "Merhaba, Best Gourmet etkinlik hizmeti için teklif almak istiyorum.",
      "",
      ...labels.filter(([, value]) => value.trim()).map(([label, value]) => `${label}: ${value}`),
    ].join("\n");

    setSent(true);
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className={compact ? "event-form is-compact" : "event-form"} onSubmit={handleSubmit}>
      <div className="event-form-heading">
        <div>
          <span>Teklif ve rezervasyon</span>
          <h2>Etkinliğini birlikte netleştirelim.</h2>
        </div>
        <p>Temel bilgileri bırak; hazırladığın özet WhatsApp üzerinden doğrudan ekibimize ulaşsın.</p>
      </div>
      <div className="event-form-grid">
        <label>
          <span>Etkinlik türü</span>
          <select name="eventType" defaultValue={defaultEvent} required>
            <option value="" disabled>Seçiniz</option>
            <option>Düğün Etkinlikleri</option>
            <option>Doğum Günü Etkinlikleri</option>
            <option>Özel Gün Etkinlikleri</option>
            <option>Kurumsal Etkinlikler</option>
          </select>
        </label>
        <label>
          <span>Tarih</span>
          <input name="date" type="date" required />
        </label>
        <label>
          <span>Konum / mekân</span>
          <input name="location" type="text" placeholder="İlçe, şehir veya mekân" required />
        </label>
        <label>
          <span>Tahmini kişi sayısı</span>
          <input name="guests" type="number" min="1" inputMode="numeric" placeholder="Örn. 80" required />
        </label>
        <label className="event-form-wide">
          <span>İlgilendiğiniz hizmetler</span>
          <input name="services" type="text" placeholder="Tatlı menüsü, pasta, kurulum, servis…" required />
        </label>
        <label>
          <span>Telefon / e-posta</span>
          <input name="contact" type="text" autoComplete="tel" placeholder="Size ulaşabileceğimiz bilgi" required />
        </label>
        <label className="event-form-wide">
          <span>Kısa not</span>
          <textarea name="note" rows={3} placeholder="Konsept, saat aralığı veya özel istekleriniz" />
        </label>
      </div>
      <div className="event-form-actions">
        <button className="button button-primary" type="submit">WhatsApp ile gönder <span>↗</span></button>
        <a href="tel:+905015740522">Ara · +90 501 574 05 22</a>
        <a href="mailto:bestgourmet22@gmail.com">E-posta gönder</a>
      </div>
      {sent && <p className="event-form-note" role="status">Talep özetiniz WhatsApp için hazırlandı. Gönderimi açılan pencerede onaylayabilirsiniz.</p>}
    </form>
  );
}
