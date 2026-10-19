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
        amber: {
          50: "#FFFDF5",
          100: "#FEF9E7",
          200: "#FDF0C3",
          300: "#FCE598",
          400: "#FAD864",
          500: "#F7C82D", // Signature Amber Yellow
          600: "#DCA712",
          700: "#B38308",
          800: "#866009",
          900: "#5A3F08",
        },
        forest: {
          50: "#F3F7F5",
          100: "#E3ECE7",
          200: "#C6DAD0",
          300: "#9FBFAf",
          400: "#6A9984",
          500: "#3D6F5B",
          600: "#2B5243",
          700: "#234437",
          800: "#1E3F35", // Deep Forest Green (Primary Brand)
          900: "#163028",
          950: "#0D1E19",
        },
        linen: {
          50: "#FAF8F5", // Warm Ivory Linen Page Background
          100: "#F4F0E8", // Card Surface
          200: "#EAE5DB", // Border & Chip Neutral
          300: "#DCD4C4",
          400: "#C7BAA3",
          500: "#AC9C83",
        },
        terracotta: {
          50: "#FAF4F0",
          100: "#F3E4DC",
          500: "#B05B35", // Earthy Accent
          600: "#984B29",
          700: "#7A391D",
        },
        charcoal: {
          950: "#141414",
          900: "#222222", // Primary Text
          800: "#333333",
          700: "#4D4D4D",
          600: "#666666", // Secondary Text
          500: "#808080",
          400: "#A1A1A1",
          300: "#CCCCCC",
          200: "#E5E0D6", // Light Border
          100: "#F2EFE9",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "-apple-system", "sans-serif"],
        hindi: ["var(--font-hindi)", "Noto Sans Devanagari", "sans-serif"],
      },
      minHeight: {
        touch: "48px",
      },
      minWidth: {
        touch: "48px",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      boxShadow: {
        subtle: "0 2px 8px -1px rgba(30, 63, 53, 0.05)",
        card: "0 4px 16px -2px rgba(30, 63, 53, 0.08)",
        elevated: "0 8px 30px -4px rgba(30, 63, 53, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
