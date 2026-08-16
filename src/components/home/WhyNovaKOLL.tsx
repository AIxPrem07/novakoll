"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    label: "Precision",
    description: "Consistent manufacturing and carefully controlled processes.",
    icon: "◎",
  },
  {
    label: "Reliability",
    description: "Products designed for dependable real-world performance.",
    icon: "◈",
  },
  {
    label: "Quality",
    description: "Focused on material quality and production consistency.",
    icon: "◆",
  },
  {
    label: "Innovation",
    description: "Modern manufacturing thinking combined with practical engineering.",
    icon: "◑",
  },
  {
    label: "Performance",
    description: "Products designed around actual application requirements.",
    icon: "◐",
  },
  {
    label: "Consistency",
    description: "Reliable results across batches and applications.",
    icon: "◉",
  },
];

export default function WhyNovaKOLL() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        ".why-heading-word",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.06,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Value items
      gsap.fromTo(
        ".value-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".values-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    // Auto-cycle values
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % VALUES.length);
    }, 3000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  const headingWords = ["WHY", "NOVAKOLL"];

  return (
    <section
      ref={sectionRef}
      className="relative bg-nk-void px-8 md:px-16 py-24 md:py-40"
      aria-label="Why NovaKOLL"
    >
      {/* Heading */}
      <div className="mb-16 md:mb-24">
        <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-6">
          Our Strengths
        </p>
        <h2
          className="font-display text-nk-smoke leading-none"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
        >
          {headingWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.15em]">
              <span className="why-heading-word inline-block" style={{ opacity: 0 }}>
                {word}
              </span>
            </span>
          ))}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left — values list */}
        <div className="values-grid flex flex-col">
          {VALUES.map((value, i) => (
            <button
              key={i}
              className={`value-item text-left flex items-start gap-6 py-6 border-b border-nk-border transition-all duration-400 group ${
                activeIndex === i
                  ? "border-b-nk-accent/40"
                  : "hover:border-b-nk-muted"
              }`}
              onClick={() => setActiveIndex(i)}
              style={{ opacity: 0 }}
              aria-pressed={activeIndex === i}
              aria-label={`Learn about ${value.label}`}
            >
              {/* Icon */}
              <span
                className={`font-mono text-xl transition-colors duration-300 mt-0.5 ${
                  activeIndex === i ? "text-nk-accent" : "text-nk-muted group-hover:text-nk-slate"
                }`}
                aria-hidden="true"
              >
                {value.icon}
              </span>

              {/* Label + desc */}
              <div className="flex flex-col gap-1">
                <h3
                  className={`font-display transition-colors duration-300 ${
                    activeIndex === i ? "text-nk-smoke" : "text-nk-slate group-hover:text-nk-smoke"
                  }`}
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}
                >
                  {value.label}
                </h3>
                <p
                  className={`font-mono text-xs leading-relaxed transition-all duration-400 overflow-hidden ${
                    activeIndex === i
                      ? "text-nk-slate max-h-20 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {value.description}
                </p>
              </div>

              {/* Active indicator */}
              <div className="ml-auto flex items-center">
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i ? "bg-nk-accent scale-150" : "bg-nk-muted scale-100"
                  }`}
                  aria-hidden="true"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Right — animated visual */}
        <div
          className="relative aspect-square max-w-md mx-auto lg:ml-auto lg:mr-0"
          aria-hidden="true"
        >
          {/* Central hexagon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative"
              style={{
                width: "60%",
                aspectRatio: "1",
              }}
            >
              {/* Rotating outer ring */}
              <div
                className="absolute inset-0 rounded-full border border-nk-accent/20"
                style={{ animation: "spin 20s linear infinite" }}
              />
              <div
                className="absolute inset-4 rounded-full border border-nk-muted/40"
                style={{ animation: "spin 15s linear infinite reverse" }}
              />
              <div className="absolute inset-8 rounded-full border border-nk-muted/20" />

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="font-mono text-nk-accent text-3xl transition-all duration-500">
                  {VALUES[activeIndex].icon}
                </span>
                <span
                  className="font-display text-nk-smoke text-center transition-all duration-500"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
                >
                  {VALUES[activeIndex].label}
                </span>
              </div>
            </div>
          </div>

          {/* Orbiting dots */}
          {VALUES.map((_, i) => {
            const angle = (i / VALUES.length) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const r = 46; // % from center
            const x = 50 + r * Math.cos(rad);
            const y = 50 + r * Math.sin(rad);
            return (
              <div
                key={i}
                className={`absolute w-2.5 h-2.5 rounded-full transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${
                  i === activeIndex
                    ? "bg-nk-accent scale-150"
                    : "bg-nk-muted scale-100"
                }`}
                style={{ left: `${x}%`, top: `${y}%` }}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
