/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    screens: {
      'xs': '325px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      // Primary Colors
      primary: '#006D5C', // Main Green
      primaryLight: '#003D34', // Main Green
      offWhite: '#F9F9F9', // Off White
      white: '#FFFFFF',
      black: '#000000',
      red: "#DF2935",
      blue: "#0D6EFD",
      blueLight: "#B3D4FF",
      green: "#198754",
      greenLight: "#D1E7DD",
      yellow: "#FFC107",
      yellowLight: "#FFF3CD",
      purple : "#FAA6FF",
      purpleLight : "#F7EFFF",

      // Gray Scale
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },

      redLight: {
        50: "#FEE2E2", // Très clair
        100: "#FECACA", // Clair
        200: "#FCA5A5", // Moyen clair
        300: "#F87171", // Moyen
      },

      // Additional Colors
      success: '#22C55E',
      warning: '#F59E0B',
      danger: '#EF4444',
      info: '#3B82F6',
    },
    fontFamily: {
      sans: ['Helvetica Neue', ...defaultTheme.fontFamily.sans],
    },
    spacing: {
      px: '1px',
      0: '0px',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
      40: '10rem',
      48: '12rem',
      56: '14rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
    extend: {},
  },
  plugins: [],
};
