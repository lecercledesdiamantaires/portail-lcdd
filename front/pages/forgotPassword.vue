<template>
      <NuxtLayout name="unauthorized">

    <div class="flex justify-center items-center h-screen">
      <div class="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-6">Mot de passe oublié</h2>
        <form @submit.prevent="onSubmit">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium">Email *</label>
            <input 
              v-model="email"
              id="email" 
              type="email" 
              class="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre email"
              required
            />
          </div>
          <button type="submit" class="w-full bg-primary text-white p-2 rounded">Envoyer</button>
        </form>
        <p v-if="message" class="text-sm text-success mt-4">{{ message }}</p>
        <p v-if="errorMessage" class="text-sm text-danger mt-4">{{ errorMessage }}</p>
      </div>
    </div>
    </NuxtLayout>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const email = ref('')
  const message = ref('')
  const errorMessage = ref('')
  
  const onSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/forgot-password', { email: email.value })
      message.value = response.data.message
      console.log(response.data)
    } catch (error) {
      errorMessage.value = error.response?.data?.error || 'Une erreur s\'est produite'
    }
  }
  </script>