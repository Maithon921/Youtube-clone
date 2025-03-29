/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#f9f9f9",
          bgLighter: "#ffffff",
          text: "#000000",
          textSoft: "#606060",
          soft: "#f5f5f5",
        },
        dark: {
          bg: "#181818",
          bgLighter: "#202020",
          text: "#ffffff",
          textSoft: "#aaaaaa",
          soft: "#373737",
        },
      },
    },
  },
  plugins: [],
};
