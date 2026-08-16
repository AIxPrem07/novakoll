import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the NovaKOLL gallery — manufacturing processes, products, and facilities.",
};

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="bg-nk-void px-8 md:px-16 pt-36 pb-16"
        aria-label="Gallery hero"
      >
        <p className="font-mono text-nk-accent text-xs tracking-widest uppercase mb-4">
          Visual Gallery
        </p>
        <h1
          className="font-display text-nk-smoke leading-none mb-4"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        >
          GALLERY
        </h1>
        <p
          className="font-mono text-nk-slate max-w-sm"
          style={{ fontSize: "clamp(0.75rem, 1.1vw, 0.875rem)", lineHeight: 1.9 }}
        >
          A visual record of NovaKOLL&apos;s manufacturing, products, and process.
          Images will be updated as content is provided.
        </p>

        <div className="nk-divider mt-12 mb-0" />
      </section>

      {/* Grid */}
      <div className="bg-nk-void pt-8 pb-24">
        <GalleryGrid />
      </div>
    </>
  );
}
