export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category?: string;
  width?: number;
  height?: number;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-01",
    src: "/images/gallery/gallery-01.jpg",
    alt: "NovaKOLL manufacturing facility — placeholder",
    category: "Facility",
    width: 1200,
    height: 800,
  },
  {
    id: "gallery-02",
    src: "/images/gallery/gallery-02.jpg",
    alt: "NovaKOLL product close-up — placeholder",
    category: "Products",
    width: 800,
    height: 1000,
  },
  {
    id: "gallery-03",
    src: "/images/gallery/gallery-03.jpg",
    alt: "NovaKOLL precision process — placeholder",
    category: "Process",
    width: 1200,
    height: 900,
  },
  {
    id: "gallery-04",
    src: "/images/gallery/gallery-04.jpg",
    alt: "NovaKOLL quality control — placeholder",
    category: "Quality",
    width: 900,
    height: 1200,
  },
  {
    id: "gallery-05",
    src: "/images/gallery/gallery-05.jpg",
    alt: "NovaKOLL product range — placeholder",
    category: "Products",
    width: 1400,
    height: 800,
  },
  {
    id: "gallery-06",
    src: "/images/gallery/gallery-06.jpg",
    alt: "NovaKOLL machinery — placeholder",
    category: "Facility",
    width: 1000,
    height: 1000,
  },
  {
    id: "gallery-07",
    src: "/images/gallery/gallery-07.jpg",
    alt: "NovaKOLL raw materials — placeholder",
    category: "Process",
    width: 1200,
    height: 800,
  },
  {
    id: "gallery-08",
    src: "/images/gallery/gallery-08.jpg",
    alt: "NovaKOLL finished goods — placeholder",
    category: "Products",
    width: 800,
    height: 1100,
  },
];
