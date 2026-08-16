"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "product" | "gallery" | "hidden";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [state, setState] = useState<CursorState>("default");

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const onMouseEnterProduct = () => setState("product");
    const onMouseEnterGallery = () => setState("gallery");
    const onMouseEnterLink = () => setState("hover");
    const onMouseLeave = () => setState("default");

    const bindEvents = () => {
      document
        .querySelectorAll("[data-cursor='product']")
        .forEach((el) => {
          el.addEventListener("mouseenter", onMouseEnterProduct);
          el.addEventListener("mouseleave", onMouseLeave);
        });
      document
        .querySelectorAll("[data-cursor='gallery']")
        .forEach((el) => {
          el.addEventListener("mouseenter", onMouseEnterGallery);
          el.addEventListener("mouseleave", onMouseLeave);
        });
      document
        .querySelectorAll("a, button, [role='button'], [data-cursor='hover']")
        .forEach((el) => {
          el.addEventListener("mouseenter", onMouseEnterLink);
          el.addEventListener("mouseleave", onMouseLeave);
        });
    };

    // Re-bind on DOM mutations
    const observer = new MutationObserver(bindEvents);
    observer.observe(document.body, { childList: true, subtree: true });
    bindEvents();

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  if (isTouch) return null;

  const isExpanded = state === "hover";
  const hasLabel = state === "product" || state === "gallery";
  const label = state === "product" ? "VIEW" : "OPEN";

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#F2F0EB",
          transition: "transform 0.05s linear",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99997] pointer-events-none flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          borderRadius: hasLabel ? "4px" : "50%",
          border: "1px solid rgba(242,240,235,0.4)",
          background: hasLabel ? "rgba(200,169,110,0.15)" : "transparent",
          backdropFilter: hasLabel ? "blur(4px)" : "none",
          transform: `scale(${isExpanded ? 2.2 : hasLabel ? 2.8 : 1})`,
          transition: "width 0.3s ease, height 0.3s ease, border-radius 0.3s ease, background 0.3s ease, transform 0.3s ease",
          willChange: "transform",
        }}
      >
        {hasLabel && (
          <span
            ref={labelRef}
            className="font-mono text-nk-accent"
            style={{ fontSize: "0.45rem", letterSpacing: "0.15em" }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
}
