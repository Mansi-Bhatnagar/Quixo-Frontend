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
        Pulse: {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.05)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        Morph: "Morph 1.5s",
        MorphReverse: "MorphReverse 1.5s",
        Pulse: "Pulse 1s ease-in-out infinite",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(270deg, rgba(3, 83, 164, 1) 0%, rgba(2, 62, 125, 1) 26%, rgba(0, 24, 69, 1) 85%, rgba(0, 18, 51, 1) 100%)",
        "custom-gradient-180":
          "linear-gradient(180deg, rgba(3, 83, 164, 1) 0%, rgba(2, 62, 125, 1) 26%, rgba(0, 24, 69, 1) 85%, rgba(0, 18, 51, 1) 100%)",
      },
      boxShadow: {
        custom: "-5px 5px 8px -3px rgba(0, 0, 0, 0.16)",
      },
    },
  },
  plugins: [],
};
