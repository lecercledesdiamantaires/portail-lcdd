<template>
    <NuxtLayout name="unauthorized">

    <div class="flex justify-center items-center h-screen">
      <div class="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-6">Réinitialiser le mot de passe</h2>
        <form @submit.prevent="onSubmit">
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium">Nouveau mot de passe *</label>
            <input 
              v-model="password"
              id="password" 
              type="password" 
              class="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez un nouveau mot de passe"
              required
            />
            <p v-if="passwordError" class="text-sm text-danger mt-1">{{ passwordError }}</p>
          </div>
          <ButtonSecondary type="submit" class="w-full">Réinitialiser</ButtonSecondary>
        </form>
        <ButtonPrimary v-if="message" class="w-full">
          <NuxtLink to="/login">Se connecter</NuxtLink>
        </ButtonPrimary>
        <p v-if="message" class="text-sm text-success my-4">{{ message }}</p>
        <p v-if="errorMessage" class="text-sm text-danger mt-4">{{ errorMessage }}</p>
      
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

const route = useRoute()
const message = ref('')
const errorMessage = ref('')

const schema = yup.object({
  password: yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Le mot de passe est requis'),
})

const { handleSubmit } = useForm({
  validationSchema: schema
})

const { value: password, errorMessage: passwordError } = useField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await axios.post('http://localhost:4000/api/auth/reset-password', {
      token: route.query.token,
      password: values.password
    })
    message.value = response.data.message
  } catch (error) {
    errorMessage.value = error.response?.data?.error || 'Une erreur s\'est produite'
  }
})
</script>