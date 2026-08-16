export interface Product {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  model3D?: string;
  applications: string[];
}

export const products: Product[] = [
  {
    id: "product-01",
    name: "Product 01",
    category: "Category A",
    shortDescription: "Placeholder — product name and description to be provided.",
    description:
      "This is a placeholder product description. The actual product name, technical details, and description will be provided by NovaKOLL. This architecture is designed so that replacing this content requires only updating this file.",
    features: [
      "Precision-engineered construction",
      "High-performance materials",
      "Consistent batch quality",
      "Application-specific design",
      "Durable under real-world conditions",
    ],
    specifications: {
      "Material": "To be specified",
      "Dimensions": "To be specified",
      "Weight": "To be specified",
      "Tolerance": "To be specified",
      "Finish": "To be specified",
    },
    images: ["/images/products/product-01-a.jpg", "/images/products/product-01-b.jpg"],
    applications: [
      "Industrial application A",
      "Industrial application B",
      "Industrial application C",
    ],
  },
  {
    id: "product-02",
    name: "Product 02",
    category: "Category B",
    shortDescription: "Placeholder — product name and description to be provided.",
    description:
      "This is a placeholder product description. The actual product name, technical details, and description will be provided by NovaKOLL.",
    features: [
      "Engineered for reliability",
      "Optimized for performance",
      "Consistent output quality",
      "Robust material composition",
      "Tested under standard conditions",
    ],
    specifications: {
      "Material": "To be specified",
      "Dimensions": "To be specified",
      "Capacity": "To be specified",
      "Operating Range": "To be specified",
      "Certification": "To be specified",
    },
    images: ["/images/products/product-02-a.jpg", "/images/products/product-02-b.jpg"],
    applications: [
      "Industrial application D",
      "Industrial application E",
      "Industrial application F",
    ],
  },
  {
    id: "product-03",
    name: "Product 03",
    category: "Category C",
    shortDescription: "Placeholder — product name and description to be provided.",
    description:
      "This is a placeholder product description. The actual product name, technical details, and description will be provided by NovaKOLL.",
    features: [
      "Premium grade materials",
      "High dimensional accuracy",
      "Long service life",
      "Compatible with standard systems",
      "Manufactured to tight tolerances",
    ],
    specifications: {
      "Material": "To be specified",
      "Grade": "To be specified",
      "Standard": "To be specified",
      "Surface": "To be specified",
      "Packaging": "To be specified",
    },
    images: ["/images/products/product-03-a.jpg", "/images/products/product-03-b.jpg"],
    applications: [
      "Industrial application G",
      "Industrial application H",
      "Industrial application I",
    ],
  },
  {
    id: "product-04",
    name: "Product 04",
    category: "Category D",
    shortDescription: "Placeholder — product name and description to be provided.",
    description:
      "This is a placeholder product description. The actual product name, technical details, and description will be provided by NovaKOLL.",
    features: [
      "Designed for demanding environments",
      "Controlled manufacturing process",
      "Reliable batch-to-batch consistency",
      "Engineered material properties",
      "Custom specifications available",
    ],
    specifications: {
      "Material": "To be specified",
      "Process": "To be specified",
      "Quality Level": "To be specified",
      "Lead Time": "To be specified",
      "MOQ": "To be specified",
    },
    images: ["/images/products/product-04-a.jpg", "/images/products/product-04-b.jpg"],
    applications: [
      "Industrial application J",
      "Industrial application K",
      "Industrial application L",
    ],
  },
];
