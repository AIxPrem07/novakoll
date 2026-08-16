import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";
import LenisProvider from "@/components/ui/LenisProvider";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novakoll.com"),
  title: {
    default: "NovaKOLL — Precision. Performance. Reliability.",
    template: "%s | NovaKOLL",
  },
  description:
    "NovaKOLL is a premium manufacturing company based in Salal, Gujarat, India. Advanced products engineered with precision, consistency and reliability.",
  keywords: [
    "NovaKOLL",
    "manufacturing",
    "precision engineering",
    "Gujarat",
    "India",
    "industrial products",
    "Salal",
  ],
  openGraph: {
    title: "NovaKOLL — Precision. Performance. Reliability.",
    description:
      "Advanced products engineered with precision, consistency and reliability. Based in Salal, Gujarat, India.",
    url: "https://novakoll.com",
    siteName: "NovaKOLL",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NovaKOLL — Precision. Performance. Reliability.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaKOLL — Precision. Performance. Reliability.",
    description:
      "Advanced products engineered with precision, consistency and reliability.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmMono.variable} ${inter.variable}`}
    >
      <body className="bg-nk-void text-nk-smoke grain-overlay antialiased">
        <LoadingScreen />
        <CustomCursor />
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
