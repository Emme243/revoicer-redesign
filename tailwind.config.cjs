/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          100: colors.slate[100],
          200: colors.slate[200],
          300: colors.slate[300],
          400: colors.slate[400],
          500: colors.slate[500],
          600: colors.slate[600],
          700: colors.slate[700],
          800: colors.slate[800],
          900: colors.slate[900],
        },
        primary: {
          100: colors.sky[100],
          200: colors.sky[200],
          300: colors.sky[300],
          400: colors.sky[400],
          500: colors.sky[500],
          600: colors.sky[600],
          700: colors.sky[700],
          800: colors.sky[800],
          900: colors.sky[900],
        },
      },
      fontfamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        raised: 'inset 0 1px 0 0 hsla(0,0%,100%,0.2),0 1px 2px hsla(0,0%,0%,0.2)',
        image: 'inset 0 2px 4px 0 hsla(0,0%,0%,0.2)',
      },
    },
  },
  plugins: [],
};
