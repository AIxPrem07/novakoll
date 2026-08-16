import type { Metadata } from "next";
import HeroSection from "@/components/hero/HeroSection";
import IntroSection from "@/components/hero/IntroSection";
import HomeProductShowcase from "@/components/products/HomeProductShowcase";
import WhyNovaKOLL from "@/components/home/WhyNovaKOLL";
import ProcessSection from "@/components/home/ProcessSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "NovaKOLL — Precision. Performance. Reliability.",
  description:
    "NovaKOLL is a premium manufacturing company based in Salal, Gujarat, India. Advanced products engineered with precision, consistency and reliability.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <HomeProductShowcase />
      <WhyNovaKOLL />
      <ProcessSection />
      <CTASection />
    </>
  );
}
