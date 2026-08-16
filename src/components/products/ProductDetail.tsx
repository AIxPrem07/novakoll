"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { Product } from "@/data/products";

const WHATSAPP_URL =
  "https://wa.me/916356501323?text=Hello%20NovaKOLL%2C%20I%20would%20like%20to%20enquire%20about%20your%20products";

export default function ProductDetail({ product }: { product: Product }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, [product.id]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-10"
      role="region"
      aria-label={`Product detail: ${product.name}`}
    >
      {/* Category */}
      <div>
        <span className="font-mono text-nk-accent text-xs tracking-widest uppercase">
          {product.category}
        </span>
      </div>

      {/* Name */}
      <h2
        className="font-display text-nk-smoke leading-none"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
      >
        {product.name}
      </h2>

      {/* Divider */}
      <div className="nk-divider" />

      {/* Image placeholder */}
      <div
        className="w-full relative overflow-hidden bg-nk-stone border border-nk-border flex items-center justify-center"
        style={{ aspectRatio: "16/9" }}
        aria-label={`${product.name} product image`}
      >
        <div className="flex flex-col items-center gap-4 text-nk-muted">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="40" cy="40" r="32" stroke="#C8A96E" strokeWidth="0.5" opacity="0.3" />
            <circle cx="40" cy="40" r="16" stroke="#C8A96E" strokeWidth="0.5" opacity="0.5" />
            <circle cx="40" cy="40" r="6" fill="#C8A96E" opacity="0.4" />
            <line x1="40" y1="8" x2="40" y2="72" stroke="#3A3A3A" strokeWidth="0.5" />
            <line x1="8" y1="40" x2="72" y2="40" stroke="#3A3A3A" strokeWidth="0.5" />
          </svg>
          <p className="font-mono text-xs tracking-widest uppercase">
            Product Image — Placeholder
          </p>
        </div>
      </div>

      {/* Short description */}
      <p
        className="font-mono text-nk-slate leading-relaxed"
        style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)" }}
      >
        {product.description}
      </p>

      {/* Features + Applications grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Features */}
        <div>
          <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-6">
            Key Features
          </p>
          <ul className="flex flex-col gap-3" role="list">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-nk-accent mt-0.5 shrink-0 font-mono text-xs" aria-hidden="true">
                  ◈
                </span>
                <span className="font-mono text-nk-slate text-xs leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Applications */}
        <div>
          <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-6">
            Applications
          </p>
          <ul className="flex flex-col gap-3" role="list">
            {product.applications.map((app, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-nk-muted mt-0.5 shrink-0 font-mono text-xs" aria-hidden="true">
                  ◦
                </span>
                <span className="font-mono text-nk-slate text-xs leading-relaxed">
                  {app}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Specifications */}
      <div>
        <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-6">
          Specifications
        </p>
        <div className="border border-nk-border divide-y divide-nk-border">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between px-5 py-4"
            >
              <span className="font-mono text-nk-slate text-xs tracking-widest uppercase">
                {key}
              </span>
              <span className="font-mono text-nk-smoke text-xs">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="pt-4">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="nk-btn nk-btn-accent font-mono text-xs inline-flex items-center gap-3"
          aria-label={`Enquire about ${product.name} on WhatsApp`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}
