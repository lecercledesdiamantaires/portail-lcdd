<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  middleware: ['auth']
});

const profil = inject('profil');
const user = ref({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: ''
});

const selectedFile = ref(null);
const fileError = ref('');
const pictureUrl = ref('');
const warning = ref(null);
const isLoading = ref(true);

if (process.client) {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    Object.assign(user.value, userData);

    profil.getPicture(userData.id)
      .then((url) => {
        pictureUrl.value = url;
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération de l\'image :', error);
      })
      .finally(() => {
        isLoading.value = false;
      });
  } else {
    isLoading.value = false;
  }
}

const handleChangeFile = (event) => {
  const file = event.target.files[0];
  if (file) {
    if(!profil.validatePicture(file)) {
      alert('Le fichier doit être une image de type jpeg, jpg ou png et ne doit pas dépasser 5 Mo.');
      warning.value = true;
      return;
    }

    fileError.value = '';
    selectedFile.value = file;
   
    const reader = new FileReader();
    reader.onload = (e) => {
      pictureUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const submit = async () => {
  if (warning.value) {
    alert("Informations incorrectes");
    return;
  }
  profil.updateUser(user.value.id, user.value);
  profil.updatePicture(user.value.id, selectedFile.value);
  localStorage.setItem('user', JSON.stringify(user.value));
  window.location.reload();
};
</script>

<template>
  <NuxtLayout name="default">
    <div class="w-full flex flex-col justify-center items-center p-8 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl w-full max-w-md font-bold mb-4">Mon profil</h1>

      <div v-if="isLoading" class="spinner"></div>
      
      <form @submit.prevent="submit" class="w-full max-w-md" v-else>
        <img :src="`${profil.picture.value.url}`" alt="photo de profil" class="w-24 h-24 rounded-full mb-4 bg-white" />
       
       
        <div>
          <input type="file" id="picture" @change="handleChangeFile($event)" class="mb-4" accept=".jpeg, .jpg, .png"/>
        </div>
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
        <button type="submit" class="w-full bg-primary text-white p-2 rounded-lg">Mettre à jour</button>
      </form>
    </div>
  </NuxtLayout>
</template>