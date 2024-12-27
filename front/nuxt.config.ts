export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  plugins: [
    '~/plugins/axios.js'
  ],

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:4000'
    }
  },

  compatibilityDate: '2024-12-27'
})