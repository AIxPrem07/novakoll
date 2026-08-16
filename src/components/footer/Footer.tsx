import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/916356501323?text=Hello%20NovaKOLL%2C%20I%20would%20like%20to%20enquire%20about%20your%20products";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer
      className="relative bg-nk-stone border-t border-nk-border overflow-hidden"
      role="contentinfo"
    >
      {/* Large wordmark */}
      <div className="px-8 md:px-16 pt-16 pb-8 overflow-hidden">
        <p
          className="font-display text-nk-muted select-none leading-none"
          style={{ fontSize: "clamp(3.5rem, 14vw, 11rem)", letterSpacing: "0.02em" }}
          aria-hidden="true"
        >
          NOVAKOLL
        </p>
      </div>

      <div className="nk-divider" />

      {/* Footer content grid */}
      <div className="px-8 md:px-16 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand info */}
        <div className="flex flex-col gap-4">
          <span
            className="font-display text-nk-smoke tracking-widest"
            style={{ fontSize: "1.4rem" }}
          >
            NOVAKOLL
          </span>
          <p className="font-mono text-nk-slate text-xs leading-relaxed max-w-xs">
            Advanced products engineered with precision, consistency and reliability.
            Based in Salal, Gujarat, India.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3" aria-label="Footer navigation">
          <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-2">
            Navigate
          </p>
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-nk-slate text-xs tracking-widest uppercase hover:text-nk-smoke transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-2">
            Contact
          </p>
          <a
            href="tel:9512054848"
            className="font-mono text-nk-slate text-xs tracking-widest hover:text-nk-smoke transition-colors duration-200"
            aria-label="Call NovaKOLL"
          >
            +91 95120 54848
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-nk-slate text-xs tracking-widest hover:text-nk-accent transition-colors duration-200"
            aria-label="Chat on WhatsApp"
          >
            WhatsApp ↗
          </a>
          <p className="font-mono text-nk-slate text-xs tracking-widest leading-relaxed">
            Salal, Gujarat, India
          </p>
        </div>
      </div>

      <div className="nk-divider" />

      {/* Bottom bar */}
      <div className="px-8 md:px-16 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="font-mono text-nk-slate text-xs tracking-widest">
          © {new Date().getFullYear()} NovaKOLL. All rights reserved.
        </p>
        <p className="font-mono text-nk-slate text-xs tracking-widest">
          Salal, Gujarat, India
        </p>
      </div>
    </footer>
  );
}
