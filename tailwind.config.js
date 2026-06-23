/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Allow manual dark mode toggling
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },
      colors: {
        primary: {
          light: '#f3f4f6', // gray-100
          dark: '#0f172a', // slate-900
        },
        accent: {
          light: '#3b82f6', // blue-500
          dark: '#38bdf8', // sky-400
        }
      }
    },
  },
  plugins: [],
}
