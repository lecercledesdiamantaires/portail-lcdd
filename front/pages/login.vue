<script setup>
    definePageMeta({
        middleware: ['auth']
    })

    const auth = inject('auth')
    const shopifyApi = inject('shopifyApi')
</script>


<template>
    <div class="flex justify-center items-center h-screen">
      <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-6">Se connecter</h2>
        <form @submit.prevent="auth.loginUser">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium">Email</label>
            <input v-model="auth.loginForm.email" id="email" type="email" class="mt-1 p-2 w-full border border-gray-300 rounded" />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium">Mot de passe</label>
            <input v-model="auth.loginForm.password" id="password" type="password" class="mt-1 p-2 w-full border border-gray-300 rounded" />
          </div>
          <div class="flex flex-col gap-2">
            <Button type="submit" class="w-full">Se connecter</Button>
            <Button class="w-full">
              <NuxtLink class="w-full block" to="/register">S'inscrire</NuxtLink>
            </Button>
          </div>
        </form>
      </div>
      <button @click="shopifyApi.createPromoCode()">test</button>
    </div>
  </template>
  