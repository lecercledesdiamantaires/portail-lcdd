export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        const token = localStorage.getItem('token');
        if (!token) {
            if (to.path !== '/login') {
                return navigateTo('/login');
            }
        } else if (token && to.path === '/login') {
            return navigateTo('/');
        }
    }
});
