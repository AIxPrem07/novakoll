"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";

const LocationScene = dynamic(() => import("@/components/three/LocationScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const WHATSAPP_URL =
  "https://wa.me/916356501323?text=Hello%20NovaKOLL%2C%20I%20would%20like%20to%20enquire%20about%20your%20products";

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-heading-word",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.4,
        }
      );
      gsap.fromTo(
        ".contact-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 1.0, ease: "power2.out" }
      );
      gsap.fromTo(
        ".contact-info-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          delay: 1.2,
          ease: "power2.out",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-nk-void flex flex-col justify-end px-8 md:px-16 pb-16 pt-32 overflow-hidden"
        aria-label="Contact hero"
      >
        {/* 3D Location scene */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <LocationScene />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 60%, var(--nk-void) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-20">
          <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-6">
            Get in Touch
          </p>
          <h1
            className="font-display text-nk-smoke leading-none mb-6"
            style={{ fontSize: "clamp(4rem, 14vw, 12rem)" }}
          >
            {["LET'S", "TALK."].map((word, i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  className="contact-heading-word inline-block"
                  style={{ opacity: 0 }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p
            className="contact-sub font-mono text-nk-slate max-w-md opacity-0"
            style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)", lineHeight: 1.9 }}
          >
            Have a requirement or want to know more about our products?
            <br />
            Contact NovaKOLL directly.
          </p>
        </div>
      </section>

      {/* Contact info section */}
      <section
        className="bg-nk-void px-8 md:px-16 py-20 md:py-32"
        aria-label="Contact information"
      >
        <div className="nk-divider mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Phone */}
          <div className="contact-info-item" style={{ opacity: 0 }}>
            <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-4">
              Phone
            </p>
            <a
              href="tel:9512054848"
              className="font-display text-nk-smoke hover:text-nk-accent transition-colors duration-300 group flex items-end gap-2"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
              aria-label="Call NovaKOLL at 9512054848"
            >
              +91 95120 54848
              <span
                className="font-mono text-nk-accent text-sm mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
            <p className="font-mono text-nk-muted text-xs mt-2 tracking-widest">
              Click to call
            </p>
          </div>

          {/* WhatsApp */}
          <div className="contact-info-item" style={{ opacity: 0 }}>
            <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-4">
              WhatsApp
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nk-btn nk-btn-accent font-mono text-xs inline-flex items-center gap-3 mt-2"
              aria-label="Chat on WhatsApp"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </a>
            <p className="font-mono text-nk-muted text-xs mt-4 tracking-widest">
              Opens in WhatsApp
            </p>
          </div>

          {/* Location */}
          <div className="contact-info-item" style={{ opacity: 0 }}>
            <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-4">
              Location
            </p>
            <address
              className="font-display text-nk-smoke not-italic"
              style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)" }}
            >
              Salal,
              <br />
              Gujarat, India
            </address>
            <p className="font-mono text-nk-muted text-xs mt-3 tracking-widest">
              Manufacturing & Operations
            </p>
          </div>
        </div>

        <div className="nk-divider mt-20" />
      </section>
    </>
  );
}
