/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content:["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        opacityin: 'opacityin 0.5s ease-in-out forwards',
        opacityout: 'opacityout 0.5s ease-in-out forwards',
      },
      keyframes: {
        opacityin: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        opacityout: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        }
      },      
      fontFamily: {
        noto_sans: ["Noto Sans", 'normal'],
      },
      backgroundColor: {
        light: '#fffffff ',
        dark: '#252329',
      },
      textColor: {
        light_primary: '#333333'                ,
        dark_primary: '#E0E0E0 ',
        secondary: '#828282',
        accent: '#2D9CDB',        
      },
    },
  },
  plugins: [],
}