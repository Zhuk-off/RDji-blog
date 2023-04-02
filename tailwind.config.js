/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '#__next',
  corePlugins: {
    preflight: false,
  },

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      custombp: { raw: '(max-height: 450px)' },
      sm: '650px',
      // => @media (min-width: 650px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      // backgroundColor: '#010101',
      backgroundImage: {
        bg_home: "url('/bg_home1.webp')",
      },
    },
  },
  plugins: [],
};
