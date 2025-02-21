import axios from 'axios'
import useShopifyApi from './useShopifyApi'
import { errorMessages } from 'vue/compiler-sfc'
import validatePicture  from './useProfil'
import useWallet from './useWallet'
import { add } from 'date-fns'

export default function () {
  const { $axios } = useNuxtApp()

  const user = ref(null)
  const isAuthenticated = ref(false)
  const token = ref(null)
  const code = ref(null)
  const responseMessage = ref(null)
  const errorMessage = ref(null)
  const walletId = ref(null)

  const loginForm = reactive({
    email: '',
    password: '',
  })

  const registerForm = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    promoCode: '',
    picture: null,
    address: ''
  })
  
  // Méthode pour se connecter
  const login = async (email, password) => {
    try {
        if (typeof email !== 'string') {
          throw new Error('L\'email doit être une chaîne de caractères.');
        }
        const response = await $axios.post(`/api/auth/login`, {
            email: email,  
            password: password
        });
        user.value = response.data.user
        token.value = response.data.token
        isAuthenticated.value = true
        responseMessage.value = true
        localStorage.setItem('user', JSON.stringify(user.value))
        localStorage.setItem('token', token.value)

        if (response.data.promoCode) {
          localStorage.setItem('promoCode', response.data.promoCode);
        }
      } catch (error) {
        errorMessage.value = error.response.data.error
      }
  }

  // Méthode pour s'inscrire
  const register = async (userData) => {
    try {
      code.value = await useShopifyApi().createPromoCode()
      userData.append("promoCode", code.value.code);
      // walletId.value = await useWallet().createCard(useWallet().cardJson, userData)
      // userData.append("walletId", walletId.value.cardId);

      const response = await $axios.post(`/api/auth/register`, userData)
      user.value = response.data.user
      responseMessage.value = true

    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error)
      if (error.response) {
        errorMessage.value = error.response.data.error
      } else if (error.request) {
        errorMessage.value = error.request
      } else {
        errorMessage.value = error.message
      }
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    code.value = null
    localStorage.removeItem('token')
    isAuthenticated.value = false
    navigateTo('/login')
  }

  const loginUser = async () => {
    errorMessage.value = null
    await login(loginForm.email, loginForm.password)
    // Redirection après la connexion réussie
    // if (isAuthenticated.value) {
    //   useRouter().push('/')
    // }
  }

  const registerUser = async () => {
    errorMessage.value = null
    try {
      await register(registerForm)
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error)
    }
  }

  const load = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        token.value = storedToken;
        user.value = JSON.parse(localStorage.getItem('user'));
        isAuthenticated.value = true;

        const storedPromoCode = localStorage.getItem('promoCode');
        if (storedPromoCode) {
            code.value = storedPromoCode;
        }
    }
  };

  onMounted(() => {
      load(); 
  });

  return {
    user,
    token,
    login,
    register,
    logout,
    loginUser,
    loginForm,
    registerForm,
    registerUser,
    isAuthenticated,
    errorMessage,
    responseMessage,
  }
}