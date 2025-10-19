// tailwind.config.js (GOOD for v3)
/** @type {import('tailwindcss').Config} */
export default {
  // Be very specific about where to look for classes
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,svelte}", // Adjust for your framework
    // Include any other directories/files you use
  ],
  theme: {
    extend: {
      spacing: {
        hours_box: "2.5rem",
      },
      colors: {
        primary: {
          100: "#F2F5FB",
          200: "#D2DDF3",
          300: "#B7C6EA",
          400: "#9AA8DF",
          500: "#808CD4",
          600: "#5A60BF",
          700: "#5659AC",
          800: "#3E46AC",
          900: "#3A3E93",
          1000: "#333875",
        },
        secondary: {
          100: "#F2FBFA",
          200: "#D2F5F2",
          300: "#A5EAE6",
          400: "#70D8D5",
          500: "#3ECAC6",
          600: "#33BCBC",
          700: "#2CADAF",
          800: "#1E7F83",
          900: "#1C6569",
          1000: "#1B4446",
        },
        neutral: {
          100: "#F2F3F4",
          200: "#E8EBEF",
          300: "#D4D9E0",
          400: "#A6ADB7",
          500: "#7B8592",
          600: "#657282",
          700: "#525C69",
          800: "#39475B",
          900: "#2C3643",
          1000: "#1E2938",
        },
        success: {
          100: "#E6FFF3",
          200: "#C2F9DD",
          300: "#81FDBF",
          400: "#59F6A8",
          500: "#3BEF95",
          600: "#21E382",
          700: "#0FD070",
          800: "#11C269",
          900: "#0DB963",
          1000: "#0EA65A",
        },
        warning: {
          100: "#FFEFE8",
          200: "#FFDDCE",
          300: "#FFBA9D",
          400: "#FFA27B",
          500: "#FF9061",
          600: "#FF8753",
          700: "#FF7B42",
          800: "#FF7033",
          900: "#FE6625",
          1000: "#ED5B1C",
        },
        error: {
          100: "#FDE4E8",
          200: "#FEBCC5",
          300: "#FFA1AE",
          400: "#FF8F9F",
          500: "#F97889",
          600: "#F86478",
          700: "#F5475E",
          800: "#F83750",
          900: "#E8233D",
          1000: "#E50E2B",
        },
        fuchsia: {
          100: "#FDECF8",
          200: "#FFE0F6",
          300: "#FED6F2",
          400: "#FBB9E7",
          500: "#EE98D4",
          600: "#EA89CD",
          700: "#EA76C7",
          800: "#E95FBF",
          900: "#E246B3",
          1000: "#E337AF",
        },
        blue: {
          100: "#F5FAFF",
          200: "#E0F2FF",
          300: "#D4EAFF",
          400: "#B2DDFF",
          500: "#84CAFF",
          600: "#53B1FD",
          700: "#2E90FA",
          800: "#1570EF",
          900: "#175CD3",
          1000: "#0E48BA",
        },
        transparent: {
          border: "#FFFFFF7D",
        },
        backdrop: {
          gray: "#6560608C",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-custom": {
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "1rem",
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: "9999px",
            backgroundColor: "#E8EBEF",
            // padding: '2px',
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "9999px",
            backgroundColor: "#39475B",
            border: "0.25rem solid transparent", // ایجاد فاصله واقعی
            backgroundClip: "content-box",
          },
        },
      });
    },
  ],
};
