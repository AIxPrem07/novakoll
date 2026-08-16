"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-nk-void" />,
});

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Entrance animation after loading screen
      const tl = gsap.timeline({ delay: 1.0 });
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          ".hero-word",
          { y: "105%", opacity: 0 },
          { y: "0%", opacity: 1, stagger: 0.06, duration: 0.8, ease: "power3.out" },
          "-=0.2"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          canvasRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
          "-=0.8"
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.3"
        );

      // Scroll-driven canvas parallax
      gsap.to(canvasRef.current, {
        y: "20%",
        opacity: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = ["BUILT", "FOR", "PRECISION."];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-nk-void"
      aria-label="Hero section"
    >
      {/* 3D Canvas — full screen */}
      <div
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-0"
        aria-hidden="true"
      >
        <HeroScene />
      </div>

      {/* Gradient overlay — bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--nk-void))",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-end min-h-screen px-8 md:px-16 pb-20 pt-32">
        {/* Badge */}
        <div ref={badgeRef} className="mb-8 opacity-0">
          <span className="font-mono text-nk-accent text-xs tracking-widest uppercase border border-nk-accent/30 px-3 py-1.5">
            Manufacturing · Gujarat, India
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-nk-smoke leading-none mb-6"
          style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)" }}
        >
          {headline.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.15em]">
              <span className="hero-word inline-block" style={{ opacity: 0 }}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Subtext */}
        <p
          ref={subRef}
          className="font-mono text-nk-slate max-w-md opacity-0"
          style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)", lineHeight: 1.8, letterSpacing: "0.05em" }}
        >
          NovaKOLL — Advanced products engineered with
          <br />
          precision, consistency and reliability.
        </p>

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          className="absolute bottom-8 right-8 md:right-16 flex items-center gap-3 opacity-0"
          aria-hidden="true"
        >
          <span className="font-mono text-nk-slate text-xs tracking-widest uppercase">
            Scroll
          </span>
          <div className="relative w-px h-12 bg-nk-muted overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-nk-accent"
              style={{
                height: "50%",
                animation: "scrollLine 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
