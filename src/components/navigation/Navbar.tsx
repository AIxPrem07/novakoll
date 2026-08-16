"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/916356501323?text=Hello%20NovaKOLL%2C%20I%20would%20like%20to%20enquire%20about%20your%20products";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9000] flex items-center justify-between px-8 md:px-12 lg:px-16 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-nk-void/80 backdrop-blur-xl border-b border-nk-border"
            : "py-7 bg-transparent"
        }`}
        role="banner"
      >
        {/* Logo */}
        <Link href="/" aria-label="NovaKOLL Home">
          <span
            className="font-display text-nk-smoke tracking-widest select-none"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}
          >
            NOVAKOLL
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10"
          aria-label="Primary navigation"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`font-mono text-xs tracking-widest uppercase transition-colors duration-200 ${
                pathname === href
                  ? "text-nk-accent"
                  : "text-nk-slate hover:text-nk-smoke"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nk-btn nk-btn-accent font-mono text-xs"
            aria-label="Enquire on WhatsApp"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Enquire on WhatsApp
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-px bg-nk-smoke transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-nk-smoke transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-nk-smoke transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </button>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[8999] bg-nk-carbon flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav
          className="flex flex-col items-center gap-8"
          aria-label="Mobile navigation"
        >
          {navLinks.map(({ label, href }, i) => (
            <Link
              key={href}
              href={href}
              className={`font-display text-nk-smoke transition-colors duration-200 ${
                pathname === href ? "text-nk-accent" : ""
              }`}
              style={{
                fontSize: "clamp(2.5rem, 10vw, 4rem)",
                letterSpacing: "0.05em",
                transform: menuOpen ? "translateY(0)" : "translateY(30px)",
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.4s ease ${i * 0.07}s, opacity 0.4s ease ${i * 0.07}s, color 0.2s ease`,
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-14 nk-btn nk-btn-accent font-mono"
          style={{
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            opacity: menuOpen ? 1 : 0,
            transition: "transform 0.4s ease 0.35s, opacity 0.4s ease 0.35s",
          }}
          aria-label="Enquire on WhatsApp"
        >
          WhatsApp Us
        </a>

        {/* Mobile contact info */}
        <a
          href="tel:9512054848"
          className="mt-6 font-mono text-nk-slate text-sm tracking-widest"
          style={{
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 0.4s ease 0.45s",
          }}
        >
          +91 95120 54848
        </a>
      </div>
    </>
  );
}
