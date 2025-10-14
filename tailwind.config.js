/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef5ff',
          100: '#fce8ff',
          200: '#f9d0fe',
          300: '#f5a9fc',
          400: '#ee75f7',
          500: '#e143ef',
          600: '#c621d3',
          700: '#a518ad',
          800: '#88158d',
          900: '#6f1772',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        elegant: {
          gold: '#d4a05c',
          darkGold: '#a0713e',
          cream: '#faf1e8',
          purple: '#6f4382',
          deepPurple: '#4e305a',
          black: '#1a1a1a',
        }
      },
      fontFamily: {
        'display': ['Georgia', 'Garamond', 'serif'],
        'elegant': ['Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
