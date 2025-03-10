const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        custom: '4px 4px 8px 2px rgba(0, 0, 0, 0.25)',
        customhover: '4px 4px 8px 2px rgba(0, 0, 0, 0.45)',
      },
      fontFamily: {
        sans: ['bemin', ...defaultTheme.fontFamily.sans],
        notosans: [], // 'custom'은 원하는 이름으로 변경 가능
      },
      colors: {
        bfc66a: '#BFC66A',
        bar: '#90C66A',
        btn: '#77AE51',
        toggle: '#DAEFCC',
        inactive: '#E4E4E4',
        text: '#888888',
      },
      keyframes: {
        slideUpFade: {
          '0%': { transform: 'translateY(6rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideUpFade: 'slideUpFade 2s forwards',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
    // array: ['light'], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
  },
}