// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  // devtools: { enabled: true },
  modules: ['@unocss/nuxt'],
  css:[
    '@unocss/reset/tailwind.css',
    'normalize.css/normalize.css',
  ]
})