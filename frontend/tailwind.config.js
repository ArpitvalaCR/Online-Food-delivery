/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9A1B2F",
        "primary-container": "#77001C",
        "primary-fixed": "#FFDADA",
        "on-primary": "#FFFFFF",
        secondary: "#D9531E",
        "secondary-container": "#F28C28",
        "on-secondary": "#FFFFFF",
        tertiary: "#1C6B38",
        "tertiary-fixed": "#D3F5DD",
        "on-tertiary": "#FFFFFF",
        surface: "#FCF9F2",
        "surface-bright": "#FFFDF8",
        "surface-container": "#F7EFE1",
        "surface-container-low": "#FAF4E9",
        "surface-container-high": "#EFE3D0",
        "surface-container-highest": "#E6D7BE",
        "on-surface": "#1F1916",
        "on-surface-variant": "#5E524D",
        outline: "#8E7F78",
        "outline-variant": "#E0D3C9",
        "inverse-surface": "#2B211E",
        "inverse-on-surface": "#FCEFE8"
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        royal: ["Rozha One", "serif"]
      }
    },
  },
  plugins: [],
};
