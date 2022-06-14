const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'rgba(86,170,255,0.2)',
          200: 'rgba(86,170,255,0.4)',
          300: 'rgba(86,170,255,0.6)',
          400: 'rgba(86,170,255,0.8)',
          500: '#56AAFF',
          600: '#47a1fd',
          700: '#3e9dfd',
          800: '#2d93fa',
          900: '#0982fd',
        },
        alpha: colors.white,
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        cyan: colors.cyan,
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')],
  variants: {
    extend: {
      display: ['dark'],
    },
  },
};
