import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b09",
        "ink-soft": "#161512",
        crema: "#f3eadb",
        bone: "#d8c8b0",
        brass: "#b58b4a",
        moss: "#283d35",
        oxblood: "#5c1e1a",
        smoke: "#989184",
      },
      fontFamily: {
        display: [
          "Didot",
          "Bodoni 72",
          "Cormorant Garamond",
          "Georgia",
          "serif",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 20px 80px rgba(181, 139, 74, 0.18)",
      },
      backgroundImage: {
        "fine-grain":
          "radial-gradient(circle at 20% 20%, rgba(181,139,74,0.16), transparent 28%), radial-gradient(circle at 82% 16%, rgba(40,61,53,0.26), transparent 24%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent 44%)",
      },
    },
  },
  plugins: [],
};

export default config;
