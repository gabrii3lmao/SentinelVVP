/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#222222',
        light: '#FFFFFF',
        primary: '#1C5D99',
        secondary: '#639FAB',
        support: '#BBCDE5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
