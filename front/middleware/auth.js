export default defineNuxtRouteMiddleware((to, from) => {
    const token = localStorage.getItem('token')
    console.log('Middleware auth - Token:', token)
  
    // Si l'utilisateur n'est pas connecté
    if (!token && to.path !== '/login') {
      return navigateTo('/login')
    }
  
    // Si l'utilisateur est connecté et tente d'accéder à /login
    if (token && to.path === '/login') {
      return navigateTo('/')
    }
  })
  