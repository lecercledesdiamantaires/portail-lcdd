import axios from 'axios'


export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const instance = axios.create({
    baseURL: config.public.API_BASE_URL,
  })
  instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 403 && error.response.data.error === 'Token invalide ou expiré.') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigateTo('/login');
        }
        return Promise.reject(error);
    }
  );  


  return {
    provide: {
      axios: instance
    }
  }
})