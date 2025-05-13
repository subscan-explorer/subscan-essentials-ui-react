const {heroui} = require("@heroui/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/ui/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        normal: '1',
        top: '1000',
        popper: '2000',
      },
      margin: {
        module: '1.25rem', // 20px, Vertical spacing of page modules
      },
      spacing: {
        small: '0.3125rem', // 5px
        middle: '0.625rem', // 10px
        large: '1.25rem', // 20px
      },
      screens: {
        xl: '1200px',
      },
    },
  },
  plugins: [heroui(), require('@tailwindcss/typography')],
}
