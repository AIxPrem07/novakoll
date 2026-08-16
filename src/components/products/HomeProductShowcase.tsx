"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

export default function HomeProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-nk-carbon px-8 md:px-16 py-24 md:py-32"
      aria-label="Product showcase"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <div>
          <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-3">
            Product Range
          </p>
          <h2
            className="font-display text-nk-smoke leading-none"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            OUR PRODUCTS
          </h2>
        </div>
        <Link
          href="/products"
          className="font-mono text-xs text-nk-slate tracking-widest uppercase hover:text-nk-accent transition-colors duration-200 group flex items-center gap-2 self-start md:self-auto"
          aria-label="View all products"
        >
          View All
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <Link
            key={product.id}
            href={`/products#${product.id}`}
            className="product-card group relative flex flex-col gap-4 p-6 border border-nk-border bg-nk-void/60 hover:border-nk-accent/40 transition-all duration-500"
            data-cursor="product"
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ opacity: 0 }}
            aria-label={`View ${product.name}`}
          >
            {/* Product number */}
            <span className="font-mono text-nk-muted text-xs tracking-widest">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Visual placeholder */}
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "4/3" }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-700"
                style={{
                  background:
                    hoveredId === product.id
                      ? "linear-gradient(135deg, #1A1A1A, #2A2A2A)"
                      : "linear-gradient(135deg, #111111, #1A1A1A)",
                }}
              >
                {/* Abstract geometric placeholder */}
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                  aria-hidden="true"
                >
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    stroke="#C8A96E"
                    strokeWidth="0.5"
                    opacity="0.4"
                  />
                  <circle cx="30" cy="30" r="12" stroke="#C8A96E" strokeWidth="0.5" opacity="0.6" />
                  <circle
                    cx="30"
                    cy="30"
                    r="4"
                    fill="#C8A96E"
                    opacity={hoveredId === product.id ? 1 : 0.5}
                  />
                  <line x1="30" y1="6" x2="30" y2="54" stroke="#3A3A3A" strokeWidth="0.4" />
                  <line x1="6" y1="30" x2="54" y2="30" stroke="#3A3A3A" strokeWidth="0.4" />
                </svg>
              </div>
            </div>

            {/* Product info */}
            <div className="flex flex-col gap-2">
              <p className="font-mono text-nk-accent text-xs tracking-widest uppercase">
                {product.category}
              </p>
              <h3 className="font-display text-nk-smoke" style={{ fontSize: "1.4rem" }}>
                {product.name}
              </h3>
              <p className="font-mono text-nk-slate text-xs leading-relaxed line-clamp-2">
                {product.shortDescription}
              </p>
            </div>

            {/* Hover arrow */}
            <div className="flex items-center gap-2 mt-auto">
              <span className="font-mono text-xs text-nk-muted tracking-widest uppercase group-hover:text-nk-accent transition-colors duration-300">
                View Details
              </span>
              <span className="text-nk-muted group-hover:text-nk-accent transition-all duration-300 group-hover:translate-x-1 inline-block">
                →
              </span>
            </div>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 h-px bg-nk-accent transition-all duration-500"
              style={{
                width: hoveredId === product.id ? "100%" : "0%",
              }}
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
