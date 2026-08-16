"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

gsap.registerPlugin(ScrollTrigger);

export default function ProductsHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".products-hero-word",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.3,
        }
      );
      gsap.fromTo(
        ".products-hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.9, ease: "power2.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[70vh] flex flex-col justify-end overflow-hidden bg-nk-void pt-32"
      aria-label="Products hero"
    >
      {/* 3D Scene */}
      <div
        className="absolute inset-0 z-0 opacity-60"
        aria-hidden="true"
      >
        <HeroScene />
      </div>

      {/* Gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--nk-void))" }}
        aria-hidden="true"
      />

      <div className="relative z-20 px-8 md:px-16 pb-16">
        <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-4">
          Product Catalogue
        </p>
        <h1
          className="font-display text-nk-smoke leading-none mb-4"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        >
          {["OUR", "PRODUCTS"].map((word, i) => (
            <span key={i} className="block overflow-hidden">
              <span className="products-hero-word inline-block" style={{ opacity: 0 }}>
                {word}
              </span>
            </span>
          ))}
        </h1>
        <p
          className="products-hero-sub font-mono text-nk-slate max-w-md opacity-0"
          style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)", lineHeight: 1.8 }}
        >
          Engineered for performance. Designed for reliability.
        </p>
      </div>
    </section>
  );
}
