import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E0D0C", // مشکی ذغالی - base background
        panel: "#1A1815", // charcoal panel surfaces
        cream: "#F5EEE3", // کرم گرم
        warmwhite: "#FAF7F1",
        champagne: "#C9A063", // طلایی شامپاینی - accent only
        taupe: "#8A8178", // خاکستری گرم - secondary text
        line: "#2A2722", // hairline dividers on dark
      },
      fontFamily: {
        display: ["var(--font-vazir)", "sans-serif"],
        body: ["var(--font-vazir)", "sans-serif"],
      },
      letterSpacing: {
        wideish: "0.05em",
        eyebrow: "0.18em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
