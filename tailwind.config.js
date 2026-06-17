/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brandPurple: '#6D28D9',
        brandGreen: '#10B981',
        brandOrange: '#d19a2e',
        brandRed: '#A03328',
      },
    },
  },
  plugins: [],
}

