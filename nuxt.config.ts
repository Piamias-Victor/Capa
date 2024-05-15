// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Pharlog Facing',
      htmlAttrs: {
        'data-theme': 'emerald'
      }
    }
  },
  components: {
    dirs: [
      {
        path: '~/src/adapters/primary/nuxt/components/',
        global: true
      },
      '~/components'
    ]
  },
  typescript: {
    strict: true
  },
  buildModules: ['@pinia/nuxt'],
  modules: [
    '@intlify/nuxt3',
    'unplugin-icons/nuxt'
  ],
  plugins: [
    { src: './src/adapters/primary/nuxt/plugins/apexCharts.ts', ssr: false }
  ],
  dir: {
    // assets: 'custom-assets',
    layouts: './src/adapters/primary/nuxt/layouts',
    // middleware: 'custom-middleware',
    pages: './src/adapters/primary/nuxt/pages/'
    // static: 'custom-static',
    // store: 'custom-store'
  },
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/app.scss',
    '~/assets/css/apexcharts.scss'
  ],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
  },
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'fr',
      fallbackLocale: 'fr'
    }
  },
  ssr: false
})
