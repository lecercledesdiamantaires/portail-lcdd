import axios from 'axios'

export default function () {
    const whitelist = ref([])
    const newEmail = ref('')

  const addEmailToWhitelist = async (email, token) => {
    try {
      if (typeof email !== 'string') {
        throw new Error('L\'email doit être une chaîne de caractères.')
      }

      await axios.post(
        'http://localhost:4000/api/whitelist/add',
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'email :', error.response?.data || error.message)
    }
  }

  const deleteEmailFromWhitelist = async (email, token) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/whitelist/delete/${email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'email :', error.response?.data || error.message)
    }
  }

  const getWhitelist = async (token) => {
    try {
      const response = await axios.get(
        'http://localhost:4000/api/whitelist/all',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      whitelist.value = response.data.whitelist || []
      console.log('Whitelist:', whitelist.value)
    } catch (error) {
      console.error('Erreur lors de la récupération de la whitelist :', error.response?.data || error.message)
    }
  }

  const addEmail = async (token) => {
    if (newEmail.value) {
      await addEmailToWhitelist(newEmail.value, token)
      newEmail.value = ''
      await getWhitelist(token)
    }

  }
  
  const deleteEmail = async (email) => {
    await deleteEmailFromWhitelist(email)
    await getWhitelist()
  }

  return {
    addEmailToWhitelist,
    deleteEmailFromWhitelist,
    getWhitelist,
    deleteEmail,
    addEmail,
    newEmail,
    whitelist
  }
}
