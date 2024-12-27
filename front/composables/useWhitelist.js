import axios from 'axios'
import { ref } from 'vue'
import { useAuth } from './useAuth'

const whitelist = ref([])

export const useWhitelist = () => {
  const { token } = useAuth()

  // ✅ Ajouter un email à la whitelist
  const addEmailToWhitelist = async (email) => {
    try {
      if (typeof email !== 'string') {
        throw new Error('L\'email doit être une chaîne de caractères.')
      }

      await axios.post(
        'http://localhost:4000/api/whitelist/add',
        { email },
        { headers: { Authorization: `Bearer ${token.value}` } }
      )
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'email :', error.response?.data || error.message)
    }
  }

  // ✅ Supprimer un email de la whitelist
  const deleteEmailFromWhitelist = async (email) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/whitelist/delete/${email}`,
        { headers: { Authorization: `Bearer ${token.value}` } }
      )
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'email :', error.response?.data || error.message)
    }
  }

  // ✅ Récupérer la whitelist
  const getWhitelist = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4000/api/whitelist/all',
        { headers: { Authorization: `Bearer ${token.value}` } }
      )
      whitelist.value = response.data.whitelist || []
      console.log('Whitelist:', whitelist.value)
    } catch (error) {
      console.error('Erreur lors de la récupération de la whitelist :', error.response?.data || error.message)
    }
  }

  return {
    addEmailToWhitelist,
    deleteEmailFromWhitelist,
    getWhitelist,
    whitelist
  }
}
