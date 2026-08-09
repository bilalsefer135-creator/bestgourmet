"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";

export type PastryGalleryItem = {
  id: string;
  image: string;
  title: string;
  category: string;
};

type InteractivePastryGalleryProps = {
  items: PastryGalleryItem[];
  collectionName?: string;
};

type CardStyle = CSSProperties & Record<`--${string}`, string | number>;

export function InteractivePastryGallery({
  items,
  collectionName = "Etkinlik seçkisi",
}: InteractivePastryGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [drag, setDrag] = useState<{ id: string; y: number } | null>(null);
  const dragStartY = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const closeGallery = () => {
    setIsOpen(false);
    setIsHovering(false);
    setDrag(null);
    dragStartY.current = null;
  };

  const startDrag = (event: ReactPointerEvent<HTMLElement>, id: string) => {
    if (!isOpen) return;
    dragStartY.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({ id, y: 0 });
  };

  const moveDrag = (event: ReactPointerEvent<HTMLElement>, id: string) => {
    if (!isOpen || dragStartY.current === null || drag?.id !== id) return;
    setDrag({ id, y: Math.max(-24, event.clientY - dragStartY.current) });
  };

  const endDrag = (event: ReactPointerEvent<HTMLElement>, id: string) => {
    if (drag?.id !== id) return;
    if (drag.y > 90) closeGallery();
    else setDrag(null);
    dragStartY.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      className={`pastry-gallery ${isOpen ? "is-open" : ""} ${isHovering ? "is-hovering" : ""}`}
      style={{ "--item-count": items.length } as CardStyle}
    >
      <div className="pastry-gallery-heading">
        <div><span>Seçkinin içinden</span><strong>Sunuma dokun, koleksiyonu aç.</strong></div>
        <p>{isOpen ? "Bir kartı aşağı sürükleyerek kapatabilirsin." : "Her kategoriden bir imza lezzet, tek bir etkinlik dili."}</p>
      </div>

      <div className="pastry-gallery-stage">
        <div className="pastry-gallery-stack" aria-live="polite">
          <div className="pastry-folder-back" aria-hidden="true"><span /></div>

          <div className="pastry-gallery-cards" aria-label={`${collectionName} ürün kartları`}>
            {items.map((item, index) => {
              const offset = index - (items.length - 1) / 2;
              const columnCount = Math.min(5, items.length);
              const openColumn = index % columnCount - (columnCount - 1) / 2;
              const openRow = Math.floor(index / columnCount);
              const style: CardStyle = {
                "--offset": offset,
                "--open-column": openColumn,
                "--open-row": openRow,
                "--stack-scale": 1 - Math.abs(offset) * 0.035,
                "--drag-y": `${drag?.id === item.id ? drag.y : 0}px`,
                zIndex: drag?.id === item.id ? 30 : index + 2,
              };
              return (
                <article
                  className={`pastry-gallery-card ${drag?.id === item.id ? "is-dragging" : ""}`}
                  key={item.id}
                  style={style}
                  tabIndex={isOpen ? 0 : -1}
                  onPointerDown={(event) => startDrag(event, item.id)}
                  onPointerMove={(event) => moveDrag(event, item.id)}
                  onPointerUp={(event) => endDrag(event, item.id)}
                  onPointerCancel={(event) => endDrag(event, item.id)}
                >
                  <img src={item.image} alt={item.title} draggable="false" />
                  <div className="pastry-card-caption"><span>{item.category}</span><strong>{item.title}</strong></div>
                </article>
              );
            })}
          </div>

          <button
            className="pastry-folder-front"
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? `${collectionName} koleksiyonunu kapat` : `${collectionName} koleksiyonunu aç`}
            onClick={() => isOpen ? closeGallery() : setIsOpen(true)}
            onPointerEnter={() => setIsHovering(true)}
            onPointerLeave={() => setIsHovering(false)}
          >
            <span className="pastry-folder-shine" />
            <span className="pastry-folder-label"><small>Best Gourmet</small>{collectionName}<i>{isOpen ? "Kapat" : "Aç"} ↗</i></span>
          </button>
        </div>

        <button className="pastry-gallery-close" type="button" onClick={closeGallery} tabIndex={isOpen ? 0 : -1}>Koleksiyonu kapat <span>↓</span></button>
      </div>
    </div>
  );
}
