<script setup>
    const user = ref(null)
    if (process.client) {
      user.value = JSON.parse(localStorage.getItem('user'))
    }
</script>

<template>
    <div class="flex justify-center items-center h-screen">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-error">403 - Accès Refusé</h1>
        <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
        <NuxtLink v-if="user.role === 'VENDEUR'" to="/" class="text-primary underline">Retour à l'accueil</NuxtLink>
        <NuxtLink v-else-if="user.role === 'ADMIN'" to="/admin" class="text-primary underline">Retour à l'accueil</NuxtLink>
      </div>
    </div>
  </template>
  