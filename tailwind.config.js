const defaultTheme = require('tailwindcss/defaultTheme');


module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['bemin', ...defaultTheme.fontFamily.sans],
        notosans:[]// 'custom'은 원하는 이름으로 변경 가능
      },
      colors: {
        bfc66a: '#BFC66A',
      },
      keyframes: {
        slideUpFade: {
          '0%': { transform: 'translateY(6rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        slideUpFade: 'slideUpFade 2s forwards',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
