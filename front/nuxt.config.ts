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
    public: {
      API_BASE_URL: process.env.API_BASE_URL || 'https://partenaire.lecercledesdiamantaires.com',
    },
    private: {
      JWT_SECRET: process.env.JWT_SECRET,
      DATABASE_URL: process.env.DATABASE_URL
    },
  },
  compatibilityDate: '2024-12-27'
})