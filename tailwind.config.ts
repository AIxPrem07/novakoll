import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "nk-void": "#0A0A0A",
        "nk-carbon": "#111111",
        "nk-smoke": "#F2F0EB",
        "nk-stone": "#1A1A1A",
        "nk-slate": "#6A6A6A",
        "nk-muted": "#3A3A3A",
        "nk-accent": "#C8A96E",
        "nk-accent-dim": "#A8894E",
        "nk-border": "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        ultra: "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;
