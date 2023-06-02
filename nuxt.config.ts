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

  experimental: {
    // https://vuejs.org//guide/extras/reactivity-transform.html 响应性语法糖
    reactivityTransform: true
  },

  mapbox: {
    accessToken: 'pk.eyJ1IjoiY2lybm9xdnEiLCJhIjoiY2xha2YxOGU3MGxreDN1bWgzbjNvMmw5cCJ9.OOwcII66PaN5yekvw-UN6Q',
  }
})
