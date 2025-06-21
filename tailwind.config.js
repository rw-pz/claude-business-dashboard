/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#9333ea',
      },
      animation: {
        'scale-102': 'scale-102 0.2s ease-in-out',
      },
      keyframes: {
        'scale-102': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}