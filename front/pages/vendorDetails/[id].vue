<script setup>
    const route = useRoute()
    const userId = route.params.id
    
    definePageMeta({
            middleware: ['auth', 'admin']
        })

    const whitelist = inject('whitelist')
 
    if (process.client) {
        watchEffect(() => {
            const token = localStorage.getItem('token')
            if (token) {
                whitelist.getWhitelist(token)
            }
        })
    } 

    const user = whitelist.combinedData.value.find(item => item.userId == userId)
</script>

<template>
    <h1 class="text-3xl font-semibold">
        Bonjour {{user?.firstName || '' }}
    </h1>
</template>