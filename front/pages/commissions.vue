<script setup>
    definePageMeta({
        middleware: ['auth']
    });
</script>

<template>
    <NuxtLayout name="default">
        <InputIban />
    </NuxtLayout>
</template>