<script setup>
import countryCodes from '~/assets/country-codes.json'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import Swal from "sweetalert2";


const auth = inject('auth')
const profil = inject('profil')
const showPassword = ref(false)
const selectedFile = ref(null);
const fileError = ref('');
const pictureUrl = ref('');


const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const schema = yup.object({
  firstName: yup.string().required('Le prénom est requis'),
  lastName: yup.string().required('Le nom est requis'),
  email: yup.string().email('Email invalide').required('L\'email est requis'),
  password: yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Le mot de passe est requis'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{8,10}$/, 'Le numéro de téléphone doit contenir entre 8 et 10 chiffres')
    .required('Le numéro de téléphone est requis'),
  acceptTerms: yup.boolean().oneOf([true], 'Vous devez accepter les termes et conditions')
})

const { handleSubmit } = useForm({
  validationSchema: schema
})

const selectedDialCode = ref(countryCodes[0].dial_code) // Préfix par défaut


const { value: firstName, errorMessage: firstNameError } = useField('firstName')
const { value: lastName, errorMessage: lastNameError } = useField('lastName')
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: phoneNumber, errorMessage: phoneNumberError } = useField('phoneNumber')
const { value: acceptTerms, errorMessage: acceptTermsError } = useField('acceptTerms')


const handleFile = (event) => {
  const file = event.target.files[0];
  if (file) {
    if(!profil.validatePicture(file)) {
      fileError.value = 'Le fichier doit être une image de type jpeg, jpg ou png et ne doit pas dépasser 5 Mo.';
      alert(fileError.value)
      return;
    }

    fileError.value = '';
    selectedFile.value = file;
    console.log(selectedFile.value)

    // Mettre à jour l'URL de l'image pour l'aperçu
    const reader = new FileReader();
    reader.onload = (e) => {
      pictureUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}


const onSubmit = handleSubmit(async(values) => {
  if (values.phoneNumber.startsWith('0')) {
    values.phoneNumber = values.phoneNumber.substring(1);
  }
  const fullPhoneNumber = `${selectedDialCode.value}${values.phoneNumber}`
  const cleanedPhoneNumber = fullPhoneNumber.replace(/\D/g, '')

  const formData = new FormData()
  formData.append('firstName', values.firstName);
  formData.append('lastName', values.lastName);
  formData.append('email', values.email);
  formData.append('password', values.password);
  formData.append('phoneNumber', cleanedPhoneNumber);

  if (selectedFile.value) {
    formData.append('picture', selectedFile.value);
  }

 
  
  try {
    await auth.register(formData)
    if (auth.responseMessage.value) {
      navigateTo("/login");
    } else {
      // Erreur gérée par l'API
      Swal.fire({
        icon: "error",
        title: "Erreur d'inscription",
        text: auth.errorMessage.value || "Une erreur s'est produite lors de l'inscription.",
      });
    }
  } catch (error) {
    // Erreur inattendue
    Swal.fire({
      icon: "error",
      title: "Action non autorisée",
      text: auth.errorMessage.value || "Vous n'êtes pas autorisé à effectuer cette action.",
    });
  }
})
</script>

<template>
    <NuxtLayout name="unauthorized">
      <div class="flex w-full bg-gray-100 h-screen items-center justify-center">

    <div class="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg">
      <Logo color="colored" class="pb-6"/>
      <h2 class="text-2xl font-bold text-center mb-6">S'inscrire</h2>
      <form @submit.prevent="onSubmit">

        <div class="mb-4">
          <label for="picture" class="block text-sm font-medium">Photo de profil *</label>
          <input 
            id="picture" 
            type="file" 
            class="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
            @change="handleFile($event)"
          />
          <p v-if="firstNameError" class="text-sm text-danger mt-1">{{ firstNameError }}</p>
        </div>
        
        <!-- Prénom -->
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium">Prénom *</label>
          <input 
            v-model="firstName"
            id="firstName" 
            type="text" 
            class="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre prénom"
          />
          <p v-if="firstNameError" class="text-sm text-danger mt-1">{{ firstNameError }}</p>
        </div>
        
        <!-- Nom -->
        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium">Nom *</label>
          <input 
            v-model="lastName"
            id="lastName" 
            type="text" 
            class="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre nom"
          />
          <p v-if="lastNameError" class="text-sm text-danger mt-1">{{ lastNameError }}</p>
        </div>
       
        
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Email *</label>
          <input 
            v-model="email"
            id="email" 
            type="email" 
            class="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="exemple@domaine.com"
          />
          <p v-if="emailError" class="text-sm text-danger mt-1">{{ emailError }}</p>
        </div>

              <!-- Mot de passe -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium">Mot de passe *</label>
          <div class="relative">
            <input 
              v-model="password"
              id="password" 
              :type="showPassword ? 'text' : 'password'" 
              class="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez un mot de passe sécurisé"
            />
            <button 
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-3 flex items-center text-gray-500 rounded-lg"
            >
              <component :is="showPassword ? Eye : EyeOff" />
            </button>
          </div>
          <p v-if="passwordError" class="text-sm text-danger mt-1">{{ passwordError }}</p>
        </div>
        
        <!-- Numéro de téléphone -->
        <div class="mb-4">
          <label for="phoneNumber" class="block text-sm font-medium">Numéro de téléphone *</label>
          <div class="flex">
            <select
              v-model="selectedDialCode"
              class="mt-1 p-2 border rounded-l-lg w-1/4 bg-gray-50 focus:ring-2 focus:ring-blue-500"
            >
              <option
                v-for="country in countryCodes"
                :key="country.code"
                :value="country.dial_code"
              >
                {{ country.emoji }} {{ country.dial_code }}
              </option>
            </select>
            <input 
              v-model="phoneNumber"
              id="phoneNumber" 
              type="text" 
              class="mt-1 p-2 w-3/4 border rounded-r-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Exemple : 612345678"
            />
          </div>
          <p v-if="phoneNumberError" class="text-sm text-danger mt-1">{{ phoneNumberError }}</p>
        </div>

        <!-- Acceptation des termes -->
        <div class="mb-4 flex items-center">
          <input 
            v-model="acceptTerms"
            id="acceptTerms" 
            type="checkbox" 
            class="mr-2"
            required
          />
          <label for="acceptTerms" class="text-sm">
            J'accepte les 
            <a href="#" class="text-primary">
              termes et conditions
            </a>
          </label>
        </div>
        <p v-if="acceptTermsError" class="text-sm text-danger mt-1">{{ acceptTermsError }}</p>

        <button type="submit" class="w-full bg-primary text-white p-2 rounded-lg">S'inscrire</button>
      </form>
    </div>
    </div>
</NuxtLayout>

</template>
