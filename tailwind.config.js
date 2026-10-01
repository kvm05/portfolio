/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#EDEFF4",
        space: "#05070D",
        gold: "#E8B95B",
        teal: "#4FB6A8",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      maxWidth: {
        prose: "42rem",
      },
      keyframes: {
        crawl: {
          "0%": { transform: "rotateX(0deg) translateY(60%)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "rotateX(0deg) translateY(0%)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        crtOn: {
          "0%": { transform: "scaleY(0.01)", opacity: "0", filter: "brightness(3)" },
          "20%": { transform: "scaleY(0.01)", opacity: "1" },
          "30%": { transform: "scaleY(1)", opacity: "1", filter: "brightness(3)" },
          "45%": { filter: "brightness(1)", opacity: "0.5" },
          "55%": { opacity: "1" },
          "65%": { opacity: "0.7" },
          "100%": { opacity: "1", filter: "brightness(1)" },
        },
        scanFade: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        hyperspace: {
          "0%": { "stroke-dashoffset": "140", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { "stroke-dashoffset": "0", opacity: "0" },
        },
        logoZoom: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "30%": { transform: "scale(1.3)", opacity: "1" },
          "100%": { transform: "scale(0.05)", opacity: "0" },
        },
        launch: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "translateY(-70vh)", opacity: "0" },
        },
        flameFlicker: {
          "0%, 100%": { transform: "scaleY(1) scaleX(1)", opacity: "0.8" },
          "50%": { transform: "scaleY(1.4) scaleX(0.8)", opacity: "1" },
        },
      },
      animation: {
        crawl: "crawl 4s ease-out forwards",
        fadeIn: "fadeIn 0.4s ease forwards",
        crtOn: "crtOn 2s ease-out forwards",
        scanFade: "scanFade 0.6s ease forwards",
        hyperspace: "hyperspace 1.2s ease-out forwards",
        logoZoom: "logoZoom 2.2s ease-in forwards",
        launch: "launch 2s ease-in forwards",
        flameFlicker: "flameFlicker 0.15s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};