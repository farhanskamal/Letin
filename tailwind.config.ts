import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        letin: {
          purple: "#C698FF",
          "purple-dark": "#9B6FD4",
          "purple-deep": "#7B4FB8",
          yellow: "#FFDE4C",
          blue: "#36B5FF",
          orange: "#FF7B00",
          gold: "#FFC539",
          surface: "#FFFFFF",
          ink: "#2D1B4E",
          muted: "#F3EBFF",
        },
        board: {
          cream: "#C698FF",
          paper: "#F3EBFF",
        },
        category: {
          opportunity: "#FFDE4C",
          event: "#36B5FF",
          deadline: "#FF7B00",
          resource: "#B8E4FF",
          announcement: "#E8D4FF",
        },
      },
      fontFamily: {
        display: ["Iosevka", "ui-monospace", "monospace"],
        body: ['"Istok Web"', "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "letin-gradient":
          "linear-gradient(90deg, #FFDE4C 0%, #FFC539 57%, #FF7B00 100%)",
        "letin-hero":
          "radial-gradient(ellipse at 15% 20%, rgba(255,222,76,0.25) 0%, transparent 50%), radial-gradient(ellipse at 85% 80%, rgba(54,181,255,0.2) 0%, transparent 50%)",
      },
      boxShadow: {
        card: "0 4px 24px rgba(45, 27, 78, 0.08), 0 1px 3px rgba(45, 27, 78, 0.06)",
        "card-hover":
          "0 8px 32px rgba(45, 27, 78, 0.12), 0 2px 8px rgba(45, 27, 78, 0.08)",
        letin: "0 4px 0 rgba(45, 27, 78, 0.15)",
        "letin-lg": "0 6px 0 rgba(45, 27, 78, 0.2)",
      },
      keyframes: {
        "urgent-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.03)" },
        },
        "bookmark-pop": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
          "50%": { opacity: "0.7", transform: "scale(0.85) rotate(15deg)" },
        },
      },
      animation: {
        "urgent-pulse": "urgent-pulse 1.5s ease-in-out infinite",
        "bookmark-pop": "bookmark-pop 0.3s ease-out",
        "fade-in-up": "fade-in-up 0.4s ease-out both",
        "slide-in-right": "slide-in-right 0.3s ease-out both",
        sparkle: "sparkle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
