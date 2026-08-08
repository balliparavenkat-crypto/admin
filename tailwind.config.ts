import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFF5EE",       // Seashell — main page bg
        surface: "#FFEFD5",          // Papaya Whip — card/surface bg
        "surface-warm": "#FFE4C4",   // Bisque — secondary surface
        primary: {
          DEFAULT: "#0D1117",        // Rich Black — primary text
          light: "#333333",          // Onyx — secondary text
        },
        secondary: "#1E3A8A",        // Deep Navy — secondary text
        accent: {
          blue: "#1E40AF",           // Royal Blue
          cyan: "#2563EB",           // Bright Blue
          gold: "#1D4ED8",           // Medium Royal Blue
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
