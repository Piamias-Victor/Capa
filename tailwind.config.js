const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/adapters/primary/nuxt/components/**/*.{vue,js}',
    './src/adapters/primary/nuxt/layouts/**/*.vue',
    './src/adapters/primary/nuxt/pages/**/*.vue',
    './src/adapters/primary/nuxt/plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      keyframes: {
        appears: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        grow: {
          'from': { transform: 'scale(0.1)' },
          'to': { transform: 'scale(1)' },
        }
      },
      animation: {
        appears: 'appears 1.5s ease-in-out',
        grow: 'grow 0.75s ease-in-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
