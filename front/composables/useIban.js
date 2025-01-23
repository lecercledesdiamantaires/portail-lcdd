import axios from 'axios'

export default function () {
    const iban = ref('')
    let token = null
    if (typeof window !== 'undefined' && window.localStorage) {
        token = localStorage.getItem('token')
    }
    const getIban = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/vendor/get/${id}`, 
                { headers: { Authorization: `Bearer ${token}` } }
            )
            iban.value = response.data.iban
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error.response?.data || error.message)
        }
    }

    const updateIban = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:4000/api/vendor/update/${id}`,
                { iban: iban.value },
                { headers: { Authorization: `Bearer ${token}` } }
            )
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error.response?.data || error.message)
        }
    }

    return{
        iban,
        getIban,
        updateIban
    }
}