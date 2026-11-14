/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Instrument Sans"', "system-ui", "-apple-system", "sans-serif"],
        serif: ['"Newsreader"', "Georgia", "serif"],
      },
      colors: {
        diu: {
          green: "#1b7340",
          "green-dark": "#145a32",
          "green-light": "#e8f5e9",
          navy: "#0f2b48",
          "navy-dark": "#081a2e",
          gold: "#f4a100",
          "gold-dark": "#d98e00",
        }
      }
    },
  },
  plugins: [],
};
