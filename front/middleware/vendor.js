export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        const user = JSON.parse(localStorage.getItem('user'))
        const token = localStorage.getItem('token')
        
        if (!token || user['role'] !== 'VENDEUR') {
            return navigateTo('/unauthorized')
        }
    }
})