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
          "0%": { transform: "rotateX(25deg) translateY(60%)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "rotateX(25deg) translateY(0%)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        crawl: "crawl 8s ease-out forwards",
        fadeIn: "fadeIn 0.4s ease forwards",
      },
    },
  },
  plugins: [],
};
