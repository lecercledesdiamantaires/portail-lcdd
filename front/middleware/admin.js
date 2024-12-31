export default defineNuxtRouteMiddleware((to) => {
    const { user, isAuthenticated } = useAuth()
    if (!isAuthenticated.value || user.value?.role !== 'ADMIN') {
      return navigateTo('/unauthorized')
    }
  })
  