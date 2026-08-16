"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { GalleryItem } from "@/data/gallery";

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const item = items[currentIndex];

  // Entrance animation
  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;
    document.body.style.overflow = "hidden";
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );
    gsap.fromTo(
      contentRef.current,
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }
    );
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Image change animation
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0.5, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
    );
  }, [currentIndex]);

  const handleClose = () => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  // Touch swipe support
  const touchStartX = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) onNext();
      else onPrev();
    }
  };

  if (!item) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99000] bg-nk-void/95 backdrop-blur-xl flex items-center justify-center"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery viewer: ${item.alt}`}
      style={{ opacity: 0 }}
    >
      {/* Close button */}
      <button
        className="absolute top-6 right-6 font-mono text-nk-slate text-xs tracking-widest uppercase hover:text-nk-smoke transition-colors duration-200 flex items-center gap-2 z-10"
        onClick={handleClose}
        aria-label="Close gallery"
      >
        Close
        <span aria-hidden="true" className="text-base">×</span>
      </button>

      {/* Counter */}
      <div
        className="absolute top-6 left-6 font-mono text-nk-slate text-xs tracking-widest z-10"
        aria-label={`Image ${currentIndex + 1} of ${items.length}`}
      >
        {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
      </div>

      {/* Main image */}
      <div
        ref={contentRef}
        className="relative w-full max-w-4xl mx-8 md:mx-16"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ opacity: 0 }}
      >
        {/* Image placeholder */}
        <div
          className="w-full relative overflow-hidden bg-nk-stone border border-nk-border flex items-center justify-center"
          style={{ aspectRatio: item.width && item.height ? `${item.width}/${item.height}` : "16/9", maxHeight: "75vh" }}
        >
          {/* Geometric placeholder */}
          <div className="flex flex-col items-center gap-6">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
              <circle cx="60" cy="60" r="48" stroke="#C8A96E" strokeWidth="0.5" opacity="0.3" />
              <circle cx="60" cy="60" r="24" stroke="#C8A96E" strokeWidth="0.5" opacity="0.5" />
              <circle cx="60" cy="60" r="8" fill="#C8A96E" opacity="0.5" />
              <line x1="60" y1="12" x2="60" y2="108" stroke="#3A3A3A" strokeWidth="0.5" />
              <line x1="12" y1="60" x2="108" y2="60" stroke="#3A3A3A" strokeWidth="0.5" />
              <line x1="26" y1="26" x2="94" y2="94" stroke="#2A2A2A" strokeWidth="0.4" />
              <line x1="94" y1="26" x2="26" y2="94" stroke="#2A2A2A" strokeWidth="0.4" />
            </svg>
            <p className="font-mono text-nk-muted text-xs tracking-widest uppercase text-center">
              {item.alt}
            </p>
          </div>
        </div>

        {/* Category tag */}
        {item.category && (
          <div className="mt-4">
            <span className="font-mono text-nk-accent text-xs tracking-widest uppercase">
              {item.category}
            </span>
          </div>
        )}
      </div>

      {/* Prev button */}
      <button
        className="absolute left-4 md:left-8 font-mono text-nk-slate hover:text-nk-smoke transition-colors duration-200 text-xl p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-nk-accent"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        ←
      </button>

      {/* Next button */}
      <button
        className="absolute right-4 md:right-8 font-mono text-nk-slate hover:text-nk-smoke transition-colors duration-200 text-xl p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-nk-accent"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        →
      </button>

      {/* Dot indicators */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2"
        role="group"
        aria-label="Image indicators"
      >
        {items.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-nk-accent scale-150" : "bg-nk-muted"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
