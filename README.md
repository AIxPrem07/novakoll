# NovaKOLL Website

Premium 3D manufacturing website for NovaKOLL — built with Next.js, React Three Fiber, GSAP, and Lenis.

## Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Structure

```
src/
├── app/              # Pages (Home, Products, Gallery, Contact)
├── components/       # All UI components
│   ├── three/        # 3D scenes (R3F)
│   ├── navigation/   # Navbar
│   ├── footer/       # Footer
│   ├── hero/         # Hero + Intro sections
│   ├── home/         # Home page sections
│   ├── products/     # Product components
│   ├── gallery/      # Gallery grid + lightbox
│   └── ui/           # Cursor, loading screen, etc.
├── data/
│   ├── products.ts   # ← Add your products here
│   └── gallery.ts    # ← Add your gallery images here
└── lib/              # Animation utilities, Lenis
```

## Adding Content

### Products
Edit `src/data/products.ts` — replace placeholder entries with real product data.

### Gallery Images
1. Add images to `public/images/gallery/`
2. Update `src/data/gallery.ts` with filenames

### Contact
Phone and WhatsApp links are hardcoded in:
- `src/components/navigation/Navbar.tsx`
- `src/components/footer/Footer.tsx`
- `src/components/home/CTASection.tsx`
- `src/app/contact/page.tsx`
- `src/components/products/ProductDetail.tsx`

## Tech Stack
- Next.js 15 (App Router)
- React Three Fiber + Drei
- Three.js
- GSAP + ScrollTrigger
- Lenis smooth scroll
- Tailwind CSS
- TypeScript
