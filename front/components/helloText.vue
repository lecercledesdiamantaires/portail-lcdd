<script setup>
    const auth = inject('auth')
</script>

<template>

    <h1 
        class="text-3xl font-semibold capitalize"
    >
        Bonjour {{ auth?.user?.value?.firstName || '' }}
    </h1>

</template>