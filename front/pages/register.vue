<script setup>
import { Eye, EyeOff } from 'lucide-vue-next'
import countryCodes from '~/assets/country-codes.json'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

const auth = inject('auth')
const showPassword = ref(false)

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

const onSubmit = handleSubmit(async(values) => {
  if (values.phoneNumber.startsWith('0')) {
    values.phoneNumber = values.phoneNumber.substring(1);
  }
  const fullPhoneNumber = `${selectedDialCode.value}${values.phoneNumber}`


  const cleanedPhoneNumber = fullPhoneNumber.replace(/\D/g, '')
  auth.registerForm.phoneNumber = cleanedPhoneNumber;
  auth.registerForm.firstName = values.firstName;
  auth.registerForm.lastName = values.lastName;
  auth.registerForm.email = values.email;
  auth.registerForm.password = values.password;
  
  try {
    await auth.registerUser()
    console.log(auth.responseMessage.value)
    if (auth.responseMessage.value) {
      navigateTo('/login')
    }
  } catch (error) {
    alert(auth.errorMessage.value || "Vous n'êtes pas autorisé à effectuer cette action.");
  }
})
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6">S'inscrire</h2>
      <form @submit.prevent="onSubmit">
        <!-- Prénom -->
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium">Prénom *</label>
          <input 
            v-model="firstName"
            id="firstName" 
            type="text" 
            class="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-500"
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
            class="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-500"
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
            class="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-500"
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
        
        <!-- Numéro de téléphone -->
        <div class="mb-4">
          <label for="phoneNumber" class="block text-sm font-medium">Numéro de téléphone *</label>
          <div class="flex">
            <select
              v-model="selectedDialCode"
              class="mt-1 p-2 border rounded-l w-1/4 bg-gray-50 focus:ring-2 focus:ring-blue-500"
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
              class="mt-1 p-2 w-3/4 border rounded-r focus:ring-2 focus:ring-blue-500"
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

        <button type="submit" class="w-full bg-primary text-white p-2 rounded">S'inscrire</button>
      </form>
    </div>
  </div>
</template>
