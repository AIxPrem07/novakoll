"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ProcessScene = dynamic(() => import("@/components/three/ProcessScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Materials",
    description:
      "Carefully sourced raw materials are selected based on application requirements, material grade, and performance specifications.",
  },
  {
    number: "02",
    title: "Processing",
    description:
      "Materials are processed through controlled manufacturing operations with precision tooling and calibrated equipment.",
  },
  {
    number: "03",
    title: "Quality Control",
    description:
      "In-process quality checks ensure dimensional accuracy, surface finish, and material integrity at each production stage.",
  },
  {
    number: "04",
    title: "Testing",
    description:
      "Finished goods undergo testing against defined acceptance criteria before approval for the next stage.",
  },
  {
    number: "05",
    title: "Final Product",
    description:
      "Approved products are prepared, packaged, and dispatched — ready for your application.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        ".process-heading",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Step items reveal
      gsap.fromTo(
        ".process-step-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-steps-list",
            start: "top 75%",
          },
        }
      );

      // Scroll-driven step progression
      const steps = PROCESS_STEPS.length;
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 40%",
        onUpdate: (self) => {
          const step = Math.min(Math.floor(self.progress * steps), steps - 1);
          setActiveStep(step);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-nk-carbon px-8 md:px-16 py-24 md:py-40"
      aria-label="Manufacturing process"
    >
      {/* Header */}
      <div className="process-heading mb-16 opacity-0" aria-hidden="false">
        <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-4">
          How We Work
        </p>
        <h2
          className="font-display text-nk-smoke leading-none"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          THE PROCESS
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left — step list */}
        <div className="process-steps-list flex flex-col">
          {PROCESS_STEPS.map((step, i) => (
            <button
              key={i}
              className={`process-step-item text-left flex items-start gap-6 py-8 border-b border-nk-border transition-all duration-500 group ${
                activeStep === i ? "border-nk-accent/30" : ""
              }`}
              onClick={() => setActiveStep(i)}
              style={{ opacity: 0 }}
              aria-current={activeStep === i ? "step" : undefined}
            >
              {/* Number */}
              <span
                className={`font-display transition-colors duration-300 mt-1 shrink-0 ${
                  activeStep === i ? "text-nk-accent" : "text-nk-muted"
                }`}
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                aria-hidden="true"
              >
                {step.number}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <h3
                  className={`font-display transition-colors duration-300 ${
                    activeStep === i ? "text-nk-smoke" : "text-nk-muted group-hover:text-nk-slate"
                  }`}
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)" }}
                >
                  {step.title}
                </h3>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeStep === i ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="font-mono text-nk-slate text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Progress line */}
              <div className="ml-auto shrink-0 flex items-center pt-2">
                <div
                  className={`h-px transition-all duration-500 ${
                    i < activeStep
                      ? "w-8 bg-nk-accent"
                      : activeStep === i
                      ? "w-4 bg-nk-accent/60"
                      : "w-4 bg-nk-muted"
                  }`}
                  aria-hidden="true"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Right — 3D scene */}
        <div
          className="relative hidden lg:block sticky top-24"
          style={{ height: "420px" }}
          aria-hidden="true"
        >
          <ProcessScene activeStep={activeStep} />
        </div>
      </div>
    </section>
  );
}
