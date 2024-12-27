// https://nuxt.com/docs/api/configuration/nuxt-config
export default ({
  axios: {
    baseURL: 'http://localhost:4000', // URL de votre API backend
  },
  buildModules: [
    '@nuxtjs/axios',
  ],
 
  compatibilityDate: '2024-11-01',
  modules: ["@nuxtjs/tailwindcss"],
  devtools: { enabled: true }
})
