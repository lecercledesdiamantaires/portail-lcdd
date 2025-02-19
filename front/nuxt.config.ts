export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      titleTemplate: '%s',
      title: 'Portail partenaire',
      meta: [
{
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent'
        },
      ],   
      link: [
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
           href: '/public/apple-touch-icon.png' // [your-domain]
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
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
