<script setup>
import { ref, inject } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'

const auth = inject('auth')
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6">S'inscrire</h2>
      <form @submit.prevent="auth.registerUser">
        <!-- Prénom -->
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium">Prénom *</label>
          <input 
            v-model="auth.registerForm.firstName"
            id="firstName" 
            type="text" 
            class="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre prénom"
            required 
          />
        </div>
        
        <!-- Nom -->
        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium">Nom *</label>
          <input 
            v-model="auth.registerForm.lastName"
            id="lastName" 
            type="text" 
            class="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre nom"
            required 
          />
        </div>
        
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Email *</label>
          <input 
            v-model="auth.registerForm.email"
            id="email" 
            type="email" 
            class="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="exemple@domaine.com"
            required 
          />
        </div>
        
        <!-- Mot de passe -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium">Mot de passe *</label>
          <div class="relative">
            <input 
              v-model="auth.registerForm.password"
              id="password" 
              :type="showPassword ? 'text' : 'password'" 
              class="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez un mot de passe sécurisé"
              required 
            />
            <button 
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              <component :is="showPassword ? Eye : EyeOff" />
            </button>
          </div>
        </div>
        
        <!-- Numéro de téléphone -->
        <div class="mb-4">
          <label for="phoneNumber" class="block text-sm font-medium">Numéro de téléphone</label>
          <input 
            v-model="auth.registerForm.phoneNumber"
            id="phoneNumber" 
            type="text" 
            class="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Exemple : +33 6 12 34 56 78"
          />
        </div>
        
        <!-- Acceptation des termes -->
        <div class="mb-4 flex items-center">
          <input 
            v-model="auth.registerForm.acceptTerms"
            id="acceptTerms" 
            type="checkbox" 
            class="mr-2"
            required 
          />
          <label for="acceptTerms" class="text-sm">J'accepte les <a href="#" class="text-blue-500">termes et conditions</a></label>
        </div>
        
        <button type="submit" class="w-full bg-primary text-white p-2 rounded">S'inscrire</button>
      </form>
    </div>
  </div>
</template>
