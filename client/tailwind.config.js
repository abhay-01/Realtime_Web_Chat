/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        'primary':  "#A6CF98",
        'primary-light':  "#D9F2C4",
        "secondary": "#F2D388",
      },
    },
  },
  plugins: [],
}

