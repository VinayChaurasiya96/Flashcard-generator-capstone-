/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      padding:{
        '21':'21px'
      }
    },
    screens: {
      sm: '600px',
      md: '728px',
      lg: '984px',
      xl: '1240px',
      '2xl': '1496px',
    },
  },
  plugins: [],
}

// tailwind.config.js
// module.exports = {
//   theme: {
//     // ...
//   },
//   plugins: [
//     require('@tailwindcss/line-clamp'),
//     // ...
//   ],
// }