import axios from 'axios'
import useShopifyApi from './useShopifyApi'
import { errorMessages } from 'vue/compiler-sfc'

export default function () {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const token = ref(null)
  const code = ref(null)
  const responseMessage = ref(null)
  const errorMessage = ref(null)

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
  })
  
  // Méthode pour se connecter
  const login = async (email, password) => {
    try {
        if (typeof email !== 'string') {
          throw new Error('L\'email doit être une chaîne de caractères.');
        }
        const response = await axios.post('http://localhost:4000/api/auth/login', {
            email: email,  
            password: password
        });
        user.value = response.data.user
        user.value.promoCode = code.value.code
        token.value = response.data.token
        isAuthenticated.value = true
        responseMessage.value = true
        localStorage.setItem('user', JSON.stringify(user.value))
        localStorage.setItem('token', token.value)
      } catch (error) {
        errorMessage.value = error.response.data.error
      }
  }

  // Méthode pour s'inscrire
  const register = async (userData) => {
    try {
      console.log(userData)
      code.value = await useShopifyApi().createPromoCode()
      userData.promoCode = code.value.code
      console.log(userData)
      const response = await axios.post('http://localhost:4000/api/auth/register', userData)
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