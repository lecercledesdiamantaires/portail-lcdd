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
        token.value = response.data.token
        isAuthenticated.value = true
        localStorage.setItem('token', token.value)
      } catch (error) {
        console.error('Login failed:', error)
      }
  }

  // Méthode pour s'inscrire
  const register = async (userData) => {
    try {
      code.value = await useShopifyApi().createPromoCode()
      userData.promoCode = code.value.code
      const response = await axios.post('http://localhost:4000/api/auth/register', userData)
      user.value = response.data.user
      responseMessage.value = true
    } catch (error) {
      console.error('Registration failed:', error)
      if (error.response) {
        console.error('Erreur de réponse de l\'API:', error.response.data)
      } else if (error.request) {
        console.error('Aucune réponse reçue:', error.request)
      } else {
        console.error('Erreur lors de la configuration de la requête:', error.message)
      }
      errorMessage.value = error.message
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
    await login(loginForm.email, loginForm.password)
    // Redirection après la connexion réussie
    if (isAuthenticated.value) {
      useRouter().push('/')
    }
  }

  const registerUser = async () => {
    errorMessage.value = null
    console.log(registerForm)
    try {
      await register(registerForm) // Attend la réponse de l'inscription
      if (response) { // ✅ Vérifie si la réponse est réussie
        navigateTo('/login') // ✅ Redirige l'utilisateur vers la page de connexion
      } else {
        console.error('Inscription échouée.')
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error)
    }
  }

  const loadToken = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        token.value = storedToken;
        isAuthenticated.value = true;
    }
};

onMounted(() => {
    loadToken(); 
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