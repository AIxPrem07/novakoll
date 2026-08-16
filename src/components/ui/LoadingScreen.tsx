"use client";

import { useEffect, useRef, useState } from "react";

export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Prevent body scroll during load
    document.body.style.overflow = "hidden";

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
      if (progress >= 100) {
        setTimeout(exitAnimation, 200);
      }
    }, 80);

    // Animate N → NovaKOLL
    const letterTimeout = setTimeout(() => {
      if (wordRef.current) {
        wordRef.current.style.opacity = "1";
        wordRef.current.style.transform = "translateY(0)";
      }
    }, 300);

    function exitAnimation() {
      if (overlayRef.current) {
        overlayRef.current.style.transition = "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)";
        overlayRef.current.style.transform = "translateY(-100%)";
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 900);
      }
    }

    return () => {
      clearInterval(interval);
      clearTimeout(letterTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] bg-nk-void flex flex-col items-center justify-center"
      aria-label="Loading NovaKOLL"
      aria-live="polite"
    >
      {/* Logo text */}
      <div className="flex items-baseline gap-0 overflow-hidden">
        <span
          ref={letterRef}
          className="font-display text-nk-smoke"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "0.05em" }}
        >
          N
        </span>
        <span
          ref={wordRef}
          className="font-display text-nk-smoke"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            letterSpacing: "0.05em",
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          OVAKOLL
        </span>
      </div>

      {/* Accent label */}
      <p
        className="font-mono text-nk-slate mt-3"
        style={{ fontSize: "clamp(0.55rem, 1vw, 0.75rem)", letterSpacing: "0.25em" }}
      >
        PRECISION · PERFORMANCE · RELIABILITY
      </p>

      {/* Progress bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-px bg-nk-muted">
        <div
          ref={barRef}
          className="h-full bg-nk-accent transition-all duration-100 ease-out"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}
