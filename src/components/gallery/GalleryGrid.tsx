"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryItems, type GalleryItem } from "@/data/gallery";
import GalleryLightbox from "./GalleryLightbox";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: { each: 0.1, from: "start" },
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i !== null ? (i + 1) % galleryItems.length : 0));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i !== null ? (i - 1 + galleryItems.length) % galleryItems.length : 0
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  return (
    <>
      {/* Gallery grid using CSS columns */}
      <div
        ref={gridRef}
        className="columns-1 sm:columns-2 lg:columns-3 gap-4 px-4 pb-4"
        role="list"
        aria-label="Gallery images"
      >
        {galleryItems.map((item, index) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={index}
            onClick={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          items={galleryItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() =>
            setLightboxIndex((i) => (i !== null ? (i + 1) % galleryItems.length : 0))
          }
          onPrev={() =>
            setLightboxIndex((i) =>
              i !== null ? (i - 1 + galleryItems.length) % galleryItems.length : 0
            )
          }
        />
      )}
    </>
  );
}

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="gallery-item relative break-inside-avoid mb-4 overflow-hidden group cursor-none"
      role="listitem"
      style={{ opacity: 0 }}
      data-cursor="gallery"
    >
      <button
        className="relative w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-nk-accent"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`Open ${item.alt} in fullscreen viewer`}
      >
        {/* Image placeholder */}
        <div
          className="w-full relative transition-transform duration-700"
          style={{
            aspectRatio: item.width && item.height ? `${item.width}/${item.height}` : "4/3",
            background: `linear-gradient(135deg, #111111 0%, #1A1A1A 100%)`,
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        >
          {/* Geometric placeholder visual */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              className="transition-transform duration-500"
              style={{ transform: hovered ? "scale(1.1) rotate(8deg)" : "scale(1)" }}
              aria-hidden="true"
            >
              <rect
                x="20"
                y="20"
                width="40"
                height="40"
                stroke="#C8A96E"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <rect
                x="30"
                y="30"
                width="20"
                height="20"
                stroke="#C8A96E"
                strokeWidth="0.5"
                opacity="0.5"
              />
              <circle cx="40" cy="40" r="5" fill="#C8A96E" opacity="0.4" />
              <line x1="20" y1="20" x2="60" y2="60" stroke="#3A3A3A" strokeWidth="0.4" />
              <line x1="60" y1="20" x2="20" y2="60" stroke="#3A3A3A" strokeWidth="0.4" />
            </svg>
          </div>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 bg-nk-void transition-opacity duration-400"
            style={{ opacity: hovered ? 0.4 : 0 }}
            aria-hidden="true"
          />

          {/* Category label */}
          {item.category && (
            <div className="absolute bottom-3 left-3">
              <span className="font-mono text-nk-smoke text-xs tracking-widest uppercase bg-nk-void/60 backdrop-blur-sm px-2 py-1">
                {item.category}
              </span>
            </div>
          )}

          {/* Open label on hover */}
          <div
            className="absolute top-3 right-3 transition-all duration-300"
            style={{ opacity: hovered ? 1 : 0 }}
            aria-hidden="true"
          >
            <span className="font-mono text-nk-accent text-xs tracking-widest uppercase border border-nk-accent/40 px-2 py-1">
              OPEN
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
