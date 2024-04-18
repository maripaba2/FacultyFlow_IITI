/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
        'off-white': '#FBFBFB',
        'peela': '#FFDE58',
        'halka-laal': '#FB8A8A',
        'dark-halka-laal': '#CB6868',
        'halka-peela': '#FCFF7E',
        'darker-halka-laal': "#FF6767",
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}