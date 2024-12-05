/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',  
        'lg': '1024px',  
        'xl': '1280px', 
        '2xl': '1536px', 
        'tablet': '640px',
        'desktop': '1024px',
      },
    },
  },
  plugins: [],
}
