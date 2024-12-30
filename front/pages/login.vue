
<script setup>
    const auth = inject('auth')

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
          <button type="submit" class="w-full bg-primary text-white py-2 rounded">Se connecter</button>
        </form>
      </div>
    </div>
  </template>
  