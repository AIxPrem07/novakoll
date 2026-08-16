"use client";

import { useRef, useEffect, ReactNode } from "react";
import { magneticEffect } from "@/lib/animations";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Only magnetic on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    return magneticEffect(ref.current);
  }, []);

  const inner = (
    <div ref={ref} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }

  return inner;
}
