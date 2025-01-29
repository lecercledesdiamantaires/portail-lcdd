<script setup>
    const whitelist = inject('whitelist')
    console.log(whitelist?.withdrawsPending)
    console.log(whitelist?.withdrawsPending?.length)
</script>

<template>
    <div v-if="whitelist?.withdrawsPending?.value?.length > 0" class="px-4 py-3 rounded-xl border border-redLight-300 bg-redLight-100 text-center">
        <p>Il y a {{ whitelist?.withdrawsPending?.value?.length }} demandes de virements en attente</p>
    </div>
</template>