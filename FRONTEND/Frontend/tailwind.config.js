/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}","./node_modules/tw-elements/dist/js/**/*.js"],
  mode: "jit",
  theme: {
    extend: {
      backgroundColor: {
        'custom-color': '#dff3f0',
      },
      colors: {
        primary: "#00040f",
        darkBlue: "#31356E",
        secondary: "#00f6ff",
        gris:"#403F3F",
        schemes:"#EF476F",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        snow:"#F5FeFD",
        bleuu:"#118AB2",
        orange:"#F6A46F",
        yellow:"#FFD166"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class"
};