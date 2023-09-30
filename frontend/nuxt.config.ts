import { presetUno, presetWebFonts } from 'unocss'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // pinia
    '@pinia/nuxt',

    // unocss
    '@unocss/nuxt',

    // mapbox
    'nuxt-mapbox'
  ],

  unocss: {
    presets: [
      presetUno(),
      presetWebFonts({
        provider: 'google',
        fonts: {
          'sans': 'Roboto'
        }
      })
    ]
  },

  experimental: {
    // https://vuejs.org//guide/extras/reactivity-transform.html 响应性语法糖
    reactivityTransform: true
  },

  mapbox: {
    accessToken: 'pk.eyJ1IjoiY2lybm9xdnEiLCJhIjoiY2xha2YxOGU3MGxreDN1bWgzbjNvMmw5cCJ9.OOwcII66PaN5yekvw-UN6Q',
  },

  runtimeConfig: {
    public: {
      'API_URL': 'http://127.0.0.1:8080',
      // 'MAPBOX_STYLE': 'mapbox://styles/ddiu8081/ckz82q8eb000c14o8uw4ky79d',
      'MAPBOX_STYLE': 'mapbox://styles/cirnoqvq/cliip6ot2005e01qp0axh94g8'
    }
  }
})
