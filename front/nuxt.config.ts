export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  plugins: [
    '~/plugins/axios.js'
  ],

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