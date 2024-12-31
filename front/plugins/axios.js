import axios from 'axios'

export default defineNuxtPlugin(() => {
  const instance = axios.create({
    baseURL: 'http://localhost:4000', // URL de votre backend
  })

  return {
    provide: {
      axios: instance
    }
  }
})
