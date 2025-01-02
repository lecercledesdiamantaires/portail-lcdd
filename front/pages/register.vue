<script setup>
const auth = inject('auth')   
</script>

<template>
    <div class="flex justify-center items-center h-screen">
      <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-6">S'inscrire</h2>
        <form @submit.prevent="auth.registerUser">
          <div class="mb-4">
            <label for="firstName" class="block text-sm font-medium">Prénom</label>
            <input v-model="auth.registerUser.firstName" id="firstName" type="text" class="mt-1 p-2 w-full border border-gray-300 rounded" />
          </div>
          <div class="mb-4">
            <label for="lastName" class="block text-sm font-medium">Nom</label>
            <input v-model="auth.registerUser.lastName" id="lastName" type="text" class="mt-1 p-2 w-full border border-gray-300 rounded" />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium">Email</label>
            <input v-model="auth.registerUser.email" id="email" type="email" class="mt-1 p-2 w-full border border-gray-300 rounded" />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium">Mot de passe</label>
            <input v-model="auth.registerUser.password" id="password" type="password" class="mt-1 p-2 w-full border border-gray-300 rounded" />
          </div>
          <div class="mb-4">
            <label for="phoneNumber" class="block text-sm font-medium">Numéro de téléphone</label>
            <input v-model="auth.registerUser.phoneNumber" id="phoneNumber" type="text" class="mt-1 p-2 w-full border border-gray-300 rounded" />
          </div>
          <Button type="submit" class="w-full">S'inscrire</Button>
        </form>
      </div>
    </div>
</template>
