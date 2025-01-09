<script setup>
  import { Eye, EyeOff, Home } from 'lucide-vue-next'
    definePageMeta({
        middleware: ['auth']
    })
    const showPassword = ref(false)

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value
    }

    const profil = inject('profil')
    const user = ref({
        id : '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    if (process.client) {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            Object.assign(user.value, storedUser);
        }
    }
    const submit = async () => {
        profil.updateUser(user.value.id, user.value);
        localStorage.setItem('user', JSON.stringify(user.value));
        window.location.reload();
    }
</script>

<template>

<div class="flex w-full bg-gray-100 h-full">
    <Sidebar />
    <div class="w-full flex flex-col justify-center items-center p-8 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl w-full max-w-md font-bold mb-4">Mon profil</h1>
      <form @submit.prevent="submit" class="w-full max-w-md">
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium">Prénom :</label>
          <input
            type="text"
            id="firstName"
            v-model="user.firstName"
            placeholder="Entrez votre prénom"
            class="p-2 border border-gray-300 rounded w-full" 
            required
          />
        </div>
        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium">Nom :</label>
          <input
            type="text"
            id="lastName"
            v-model="user.lastName"
            placeholder="Entrez votre nom"       
            class="p-2 border border-gray-300 rounded w-full" 
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Email :</label>
          <input
            type="email"
            id="email"
            v-model="user.email"
            placeholder="Entrez votre email"
            class="p-2 border border-gray-300 rounded w-full" 
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium">Mot de passe *</label>
          <div class="relative">
            <input 
              v-model="user.password"
              id="password" 
              :type="showPassword ? 'text' : 'password'" 
              class="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez un mot de passe sécurisé"
            />
            <button 
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              <component :is="showPassword ? Eye : EyeOff" />
            </button>
          </div>
          <p v-if="passwordError" class="text-sm text-danger mt-1">{{ passwordError }}</p>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Numéro de téléphone :</label>
          <input
            type="text"
            id="phoneNumber"
            v-model="user.phoneNumber"
            placeholder="Entrez votre numéro de téléphone"
            class="p-2 border border-gray-300 rounded w-full" 
            required
          />
        </div>
        <div class="flex gap-2 flex-col">
          <ButtonPrimary type="submit" class="w-full">Mettre à jour</ButtonPrimary>
        </div>
      </form>
    </div>
  </div>
</template>