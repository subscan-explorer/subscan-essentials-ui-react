const { heroui } = require('@heroui/react')
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/ui/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
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
  plugins: [
    heroui({
      themes: {
        'assethub-westend': {
          colors: {
            secondary: {
              50: '#ffe1f6',
              100: '#ffb1dc',
              200: '#ff7ec4',
              300: '#ff4cab',
              400: '#ff1a93',
              500: '#e6007a',
              600: '#b4005f',
              700: '#820044',
              800: '#500029',
              900: '#200010',
              DEFAULT: '#e6007a',
            },
          },
        },
        'bifrost-testnet': {
          colors: {
            secondary: {
              50: '#eee6ff',
              100: '#c9b6ff',
              200: '#a588f9',
              300: '#8158f5',
              400: '#5c28f0',
              500: '#5A25F0',
              600: '#340aa8',
              700: '#240779',
              800: '#15044b',
              900: '#08001e',
              DEFAULT: '#5A25F0',
            },
          },
        },
        'paseo': {
          colors: {
            secondary: {
              50: '#f1f1fb',
              100: '#d7d7de',
              200: '#bcbdc3',
              300: '#a1a2aa',
              400: '#868791',
              500: '#6d6e78',
              600: '#54565d',
              700: '#3c3d44',
              800: '#23252b',
              900: '#0b0b15',
              DEFAULT: '#38393F',
            },
          },
        },
      },
    }),
    require('@tailwindcss/typography'),
  ],
}
