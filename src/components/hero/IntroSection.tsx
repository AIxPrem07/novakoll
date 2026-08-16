"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Statement reveal
      gsap.fromTo(
        ".intro-word",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.04,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Body text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Stats
      gsap.fromTo(
        ".intro-stat",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statementWords = [
    "Engineering",
    "products",
    "that",
    "perform",
    "beyond",
    "expectations.",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-nk-void px-8 md:px-16 py-24 md:py-40"
      aria-label="Introduction section"
    >
      <div className="nk-divider mb-12 md:mb-20" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left — large statement */}
        <div>
          <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-6">
            About NovaKOLL
          </p>
          <h2
            ref={statementRef}
            className="font-display text-nk-smoke leading-[1.0]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            {statementWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.18em]">
                <span className="intro-word inline-block" style={{ opacity: 0 }}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Right — body text + stats */}
        <div className="flex flex-col gap-12 pt-4 md:pt-16">
          <div ref={textRef} style={{ opacity: 0 }}>
            <p
              className="font-mono text-nk-slate leading-relaxed mb-6"
              style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)" }}
            >
              NovaKOLL is a manufacturing company rooted in Salal, Gujarat, India.
              We design and produce products built around real application requirements —
              with a commitment to dimensional accuracy, material quality, and consistent
              output at every stage of production.
            </p>
            <p
              className="font-mono text-nk-slate leading-relaxed"
              style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)" }}
            >
              Our manufacturing process is built on controlled, repeatable systems
              that deliver reliable results — batch after batch, order after order.
            </p>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-8">
            {[
              { value: "100%", label: "Precision-Focused" },
              { value: "Gujarat", label: "Based in India" },
              { value: "Quality", label: "In Every Batch" },
              { value: "Built to", label: "Specification" },
            ].map((stat, i) => (
              <div key={i} className="intro-stat" style={{ opacity: 0 }}>
                <p
                  className="font-display text-nk-smoke mb-1"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)" }}
                >
                  {stat.value}
                </p>
                <p className="font-mono text-nk-slate text-xs tracking-widest uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="nk-divider mt-20 md:mt-32" />
    </section>
  );
}
