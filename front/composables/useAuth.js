import axios from 'axios'

export const useAuth = () => {
  const user = useState('user', () => null)
  const token = useState('token', () => null)

  // Méthode pour se connecter
  const login = async (email, password) => {
    console.log(email, password)
    try {

        if (typeof email !== 'string') {
            throw new Error('L\'email doit être une chaîne de caractères.');
            }
        const response = await axios.post('http://localhost:4000/api/auth/login', {
            email: email,  // Assurez-vous que l'email est une chaîne
            password: password
        });
        user.value = response.data.user
        token.value = response.data.token
        localStorage.setItem('token', token.value)
        } catch (error) {
        console.error('Login failed:', error)
        }
    }

  // Méthode pour s'inscrire
  const register = async (userData) => {
    try {
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
  }

  return {
    user,
    token,
    login,
    register,
    logout,
  }
}
