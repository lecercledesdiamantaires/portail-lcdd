import axios from 'axios'

const user = ref(null)
const isAuthenticated = ref(false)
const token = ref(null)

export const useAuth = () => {

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
      userData.phoneNumber = parseInt(userData.phoneNumber, 10);

      if (isNaN(userData.phoneNumber)) {
          throw new Error('Le numéro de téléphone doit être un nombre entier valide.');
      }
      const response = await axios.post('http://localhost:4000/api/auth/register', userData)
      user.value = response.data.user
      token.value = response.data.token
      localStorage.setItem('token', token.value)
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  // Méthode pour se déconnecter
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    isAuthenticated.value = false

  }

  return {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated,
  }
}
