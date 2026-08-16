"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_URL =
  "https://wa.me/916356501323?text=Hello%20NovaKOLL%2C%20I%20would%20like%20to%20enquire%20about%20your%20products";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-line",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.07,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".cta-sub",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".cta-buttons",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = ["LET'S", "BUILD", "SOMETHING", "BETTER."];

  return (
    <section
      ref={sectionRef}
      className="relative bg-nk-void px-8 md:px-16 py-32 md:py-48 overflow-hidden"
      aria-label="Call to action"
    >
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "80vw",
          height: "80vw",
          maxWidth: "900px",
          maxHeight: "900px",
          background:
            "radial-gradient(circle, rgba(200,169,110,0.04) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Headline */}
      <h2
        className="font-display text-nk-smoke leading-[0.95] mb-8"
        style={{ fontSize: "clamp(3rem, 11vw, 9.5rem)" }}
      >
        {headline.map((word, i) => (
          <span key={i} className="block overflow-hidden">
            <span className="cta-line inline-block" style={{ opacity: 0 }}>
              {word}
            </span>
          </span>
        ))}
      </h2>

      {/* Sub text */}
      <p
        className="cta-sub font-mono text-nk-slate max-w-md mb-12 opacity-0"
        style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)", lineHeight: 1.9 }}
      >
        Explore our products or speak directly with NovaKOLL. We&apos;re ready to discuss
        your requirements.
      </p>

      {/* Buttons */}
      <div
        className="cta-buttons flex flex-col sm:flex-row gap-4 opacity-0"
        role="group"
        aria-label="Action buttons"
      >
        <Link
          href="/products"
          className="nk-btn nk-btn-primary font-mono text-xs"
          aria-label="Explore products"
        >
          Explore Products
          <span aria-hidden="true">→</span>
        </Link>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="nk-btn nk-btn-accent font-mono text-xs"
          aria-label="Chat on WhatsApp"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          WhatsApp Us
        </a>
      </div>

      {/* Bottom divider */}
      <div className="nk-divider absolute bottom-0 left-0 right-0" aria-hidden="true" />
    </section>
  );
}
