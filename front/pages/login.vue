<script setup>
    definePageMeta({
        middleware: ['auth']
    })
    import { Eye, EyeOff } from 'lucide-vue-next'
    import { useField, useForm } from 'vee-validate'
    import * as yup from 'yup'
    import Swal from "sweetalert2";

    const auth = inject('auth')

    const showPassword = ref(false)

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value
    }

    const schema = yup.object({
      email: yup.string().email('Email invalide').required('L\'email est requis'),
      password: yup.string().required('Le mot de passe est requis')
    })

    const { handleSubmit } = useForm({
      validationSchema: schema
    })  

    const { value: email, errorMessage: emailError } = useField('email')
    const { value: password, errorMessage: passwordError } = useField('password')

    const onSubmit = handleSubmit(async(values) => {
      auth.loginForm.email = values.email;
      auth.loginForm.password = values.password;
      try {
        await auth.loginUser()
        if (auth.responseMessage.value) {
          if (auth.user.value?.role === 'ADMIN') {
            navigateTo("/admin");
          }
          else {
            navigateTo("/");
          }
        } else {
          // Erreur gérée par l'API
          Swal.fire({
            icon: "error",
            title: "Erreur de connexion",
            text: auth.errorMessage.value || "Une erreur s'est produite lors de la connexion.",
          });
        }
      } catch (error) {
        // Erreur inattendue
        console.log(error);
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
        <h2 class="text-2xl font-bold text-center mb-6">Se connecter</h2>
        <form @submit.prevent="onSubmit">
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
                  placeholder="Votre mot de passe"
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
        
          <div class="flex flex-col gap-2">
            <ButtonPrimary type="submit" class="w-full">Se connecter</ButtonPrimary>
            <ButtonSecondary class="w-full">
              <NuxtLink class="w-full block" to="/register">S'inscrire</NuxtLink>
            </ButtonSecondary>
          </div>
          <NuxtLink to="/forgotpassword" class="text-sm text-primary mt-4 block text-center">Mot de passe oublié ?</NuxtLink>
        </form>
      </div>
    </div>
    </NuxtLayout>
  </template>
  