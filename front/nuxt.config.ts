export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
    ],

  plugins: [
    '~/plugins/axios.js'
  ],

  build: {
    transpile: [
    '@fortawesome/vue-fontawesome'
    ]
  },

  runtimeConfig: {
    // apiBase: 'http://localhost:4000',
    public: {
      apiKey: process.env.API_KEY,
      shopUrl: process.env.SHOP_URL,
      apiSecret: process.env.API_SECRET,
    }
  },

  compatibilityDate: '2024-12-27'

    
})