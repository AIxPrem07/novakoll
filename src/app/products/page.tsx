import type { Metadata } from "next";
import ProductsHero from "@/components/products/ProductsHero";
import ProductExplorer from "@/components/products/ProductExplorer";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore NovaKOLL's product range — engineered for performance, designed for reliability. Based in Salal, Gujarat, India.",
};

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductExplorer />
    </>
  );
}
