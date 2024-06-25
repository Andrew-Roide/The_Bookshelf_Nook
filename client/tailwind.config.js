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
    },
  },
  plugins: [import('tailwindcss-textshadow')],
};
