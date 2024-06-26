/* eslint-disable */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Josefin Sans', 'sans-serif'],
        slab: ['Josefin Slab', 'serif'],
      },
      colors: {
        customGreen: '#4f6f52',
        customBrown: '#ece3ce',
        customLightGreen: '#739072',
      },
      textShadow: {
        customNav: '0 4px 4px rgba(0, 0, 0, 0.25)',
        custom:
          '-1px -1px 0 #3a4d39, 1px -1px 0 #3a4d39, -1px 1px 0 #3a4d39, 1px 1px 0 #3a4d39',
      },
      spacing: {
        '1vw': '1vw',
        '2vw': '2vw',
        '5vw': '5vw',
        '10vw': '10vw',
        '20vw': '20vw',
        '50vw': '50vw',
        '100vw': '100vw',
        '1vh': '1vh',
        '2vh': '2vh',
        '5vh': '5vh',
        '10vh': '10vh',
        '20vh': '20vh',
        '50vh': '50vh',
        '100vh': '100vh',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in forwards',
      },
    },
  },
  plugins: [require('tailwindcss-textshadow')],
};
