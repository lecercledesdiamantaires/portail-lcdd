export default defineNuxtRouteMiddleware((to, from) => {
    const { user, isAuthenticated } = useAuth()


    if (!isAuthenticated.value || user.value?.role !== 'ADMIN') {
        console.log('Redirection vers /unauthorized')
        return navigateTo('/unauthorized')
    }
})