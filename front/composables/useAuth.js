import axios from 'axios'

export const useAuth = () => {
  const user = useState('user', () => null)
  const token = useState('token', () => null)

  // Méthode pour se connecter
  const login = async (email, password) => {
    console.log(email, password)
    try {
      if (typeof email !== 'string' || typeof password !== 'string') {
        throw new Error('L\'email et le mot de passe doivent être des chaînes de caractères.');
      }
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        email,
        password
      });
      user.value = response.data.user;
      token.value = response.data.token;
      localStorage.setItem('token', token.value);
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        console.error('Erreur de réponse de l\'API:', error.response.data);
      } else if (error.request) {
        console.error('Aucune réponse reçue:', error.request);
      } else {
        console.error('Erreur lors de la configuration de la requête:', error.message);
      }
    }
  }

  // Méthode pour s'inscrire
  const register = async (userData) => {
    console.log(userData)
    try {
      if (!userData.email || !userData.password) {
        throw new Error('Les champs email et mot de passe sont obligatoires.');
      }
      const response = await axios.post('http://localhost:4000/api/auth/register', userData);
      user.value = response.data.user;
      token.value = response.data.token;
      localStorage.setItem('token', token.value);
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response) {
        console.error('Erreur de réponse de l\'API:', error.response.data);
      } else if (error.request) {
        console.error('Aucune réponse reçue:', error.request);
      } else {
        console.error('Erreur lors de la configuration de la requête:', error.message);
      }
    }
  }

  // Méthode pour se déconnecter
  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
  }

  return {
    user,
    token,
    login,
    register,
    logout,
  }
}