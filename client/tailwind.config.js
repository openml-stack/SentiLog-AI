/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enables dark mode via class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        body: 'var(--body)',
        card: 'var(--card-bg)',
        text: 'var(--body-text)',
        border: 'var(--border)',
        'theme-bg': {
          light: '#ffffff',
          dark: '#0b1120'
        }
      },
      backgroundColor: {
        'theme': 'var(--bg, #ffffff)',
        'theme-dark': '#0b1120',
        'theme-light': '#ffffff'
      }
    },
  },
  plugins: [],
}
