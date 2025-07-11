/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Muy importante
  ],
  theme: {
    extend: {fontFamily: {
      title: ['Anton', 'sans-serif'],
    },},
  },
  plugins: [

    plugin(function ({ addUtilities }) {
      addUtilities({
        '.text-stroke': {
          '-webkit-text-stroke': '1px white',
        },
        '.text-stroke-black': {
          '-webkit-text-stroke': '0.5px black',
        },
        '.text-stroke-2': {
          '-webkit-text-stroke': '2px white',
        },
      })
    }),
   require('@tailwindcss/typography'),
  ],
}