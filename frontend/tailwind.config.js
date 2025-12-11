/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#dceee5',
          200: '#b8ddc9',
          300: '#8dc5a7',
          400: '#5fa582',
          500: '#4a8c6c',
          600: '#3a7055',
          700: '#2f5a44',
          800: '#284938',
          900: '#233d30',
        },
        secondary: {
          50: '#f0f7fb',
          100: '#e1eff7',
          200: '#c2deef',
          300: '#94c5e3',
          400: '#5fa5d3',
          500: '#3d88bf',
          600: '#2d6ca1',
          700: '#265683',
          800: '#234a6d',
          900: '#213f5b',
        },
        sage: {
          50: '#f7f8f7',
          100: '#eef0ee',
          200: '#dde1dc',
          300: '#c4ccc2',
          400: '#a5b0a2',
          500: '#8a9686',
          600: '#6f7a6c',
          700: '#5a6358',
          800: '#4a5349',
          900: '#3f453e',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
