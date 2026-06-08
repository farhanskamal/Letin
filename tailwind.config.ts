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
        board: {
          cream: "#FAF7F2",
          paper: "#F5F0E8",
        },
        category: {
          opportunity: "#FFE566",
          event: "#FF6B6B",
          deadline: "#FF8C42",
          resource: "#4ECDC4",
          announcement: "#A78BFA",
        },
      },
      fontFamily: {
        display: ["Syne", "system-ui", "sans-serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "4px 4px 0px 0px rgba(0, 0, 0, 0.08)",
        "card-hover": "6px 6px 0px 0px rgba(0, 0, 0, 0.12)",
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
      },
      animation: {
        "urgent-pulse": "urgent-pulse 1.5s ease-in-out infinite",
        "bookmark-pop": "bookmark-pop 0.3s ease-out",
        "fade-in-up": "fade-in-up 0.4s ease-out both",
        "slide-in-right": "slide-in-right 0.3s ease-out both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
