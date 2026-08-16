"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";
import ProductDetail from "./ProductDetail";

gsap.registerPlugin(ScrollTrigger);

export default function ProductExplorer() {
  const [activeId, setActiveId] = useState(products[0]?.id);
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeProduct = products.find((p) => p.id === activeId);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-nav-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSelect = (id: string) => {
    setActiveId(id);
    // Scroll to section on mobile
    if (window.innerWidth < 1024) {
      document.getElementById("product-detail")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="relative bg-nk-void px-8 md:px-16 py-16"
      id="product-explorer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 min-h-screen">
        {/* Left — product nav */}
        <nav
          className="lg:col-span-4 flex flex-col gap-0"
          aria-label="Product navigation"
        >
          <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-8">
            Select a Product
          </p>
          {products.map((product, i) => (
            <button
              key={product.id}
              id={product.id}
              className={`product-nav-item text-left flex items-center gap-6 py-6 border-b border-nk-border transition-all duration-400 group ${
                activeId === product.id
                  ? "border-nk-accent/30"
                  : "hover:border-nk-muted"
              }`}
              onClick={() => handleSelect(product.id)}
              style={{ opacity: 0 }}
              aria-pressed={activeId === product.id}
              aria-label={`View ${product.name}`}
            >
              {/* Number */}
              <span
                className={`font-mono text-xs tracking-widest shrink-0 transition-colors duration-300 ${
                  activeId === product.id ? "text-nk-accent" : "text-nk-muted"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Name */}
              <div className="flex flex-col gap-0.5">
                <h3
                  className={`font-display transition-colors duration-300 ${
                    activeId === product.id
                      ? "text-nk-smoke"
                      : "text-nk-slate group-hover:text-nk-smoke"
                  }`}
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)" }}
                >
                  {product.name}
                </h3>
                <p className="font-mono text-nk-muted text-xs tracking-widest uppercase">
                  {product.category}
                </p>
              </div>

              {/* Active indicator */}
              <div className="ml-auto">
                <div
                  className={`h-px transition-all duration-500 ${
                    activeId === product.id
                      ? "w-8 bg-nk-accent"
                      : "w-0 bg-transparent group-hover:w-4 group-hover:bg-nk-muted"
                  }`}
                  aria-hidden="true"
                />
              </div>
            </button>
          ))}
        </nav>

        {/* Right — product detail */}
        <div className="lg:col-span-8" id="product-detail">
          {activeProduct && (
            <ProductDetail key={activeProduct.id} product={activeProduct} />
          )}
        </div>
      </div>
    </div>
  );
}
