const defaultTheme = require('tailwindcss/defaultTheme');


module.exports = {
  content: [
  	"./src/**/*.{js,jsx,ts,tsx}",  
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['bemin', ...defaultTheme.fontFamily.sans], // 'custom'은 원하는 이름으로 변경 가능
      },
      colors: {
        bfc66a: '#BFC66A',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
