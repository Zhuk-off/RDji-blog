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
    extend: {
      // backgroundColor: '#010101',
      backgroundImage: {
        bg_home: "url('/bg_home1.webp')",
      },
    },
  },
  plugins: [],
};
