/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        Morph: {
          "0%": {
            transform: "translateX(-60%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
        MorphReverse: {
          "0%": {
            transform: "translateX(60%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
      },
      animation: {
        Morph: "Morph 1.5s",
        MorphReverse: "MorphReverse 1.5s",
      },
    },
  },
  plugins: [],
};
