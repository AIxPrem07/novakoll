import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Text reveal — splits text into lines and slides them up ─────────────────
export function revealText(
  element: Element | string,
  options: gsap.TweenVars = {}
) {
  return gsap.fromTo(
    element,
    { y: "100%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      ...options,
    }
  );
}

// ─── Fade up ─────────────────────────────────────────────────────────────────
export function fadeInUp(
  element: Element | string | NodeList,
  options: gsap.TweenVars = {}
) {
  return gsap.fromTo(
    element,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      ...options,
    }
  );
}

// ─── Stagger children ────────────────────────────────────────────────────────
export function staggerReveal(
  parent: Element | string,
  childSelector: string,
  options: gsap.TweenVars = {}
) {
  return gsap.fromTo(
    `${parent instanceof Element ? "" : parent + " "}${childSelector}`,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
      ...options,
    }
  );
}

// ─── Clip-path reveal (left to right) ────────────────────────────────────────
export function clipReveal(element: Element | string, options: gsap.TweenVars = {}) {
  return gsap.fromTo(
    element,
    { clipPath: "inset(0 100% 0 0)" },
    {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.0,
      ease: "power4.out",
      ...options,
    }
  );
}

// ─── Scroll-triggered fade-up ─────────────────────────────────────────────────
export function scrollFadeUp(
  element: Element | string,
  trigger?: Element | string,
  options: gsap.TweenVars = {}
) {
  return gsap.fromTo(
    element,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trigger || element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      ...options,
    }
  );
}

// ─── Magnetic button effect ───────────────────────────────────────────────────
export function magneticEffect(button: HTMLElement) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(button, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const handleMouseLeave = () => {
    gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };
  button.addEventListener("mousemove", handleMouseMove);
  button.addEventListener("mouseleave", handleMouseLeave);
  return () => {
    button.removeEventListener("mousemove", handleMouseMove);
    button.removeEventListener("mouseleave", handleMouseLeave);
  };
}

// ─── Check reduced motion preference ─────────────────────────────────────────
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
