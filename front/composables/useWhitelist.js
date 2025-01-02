import axios from 'axios'

export default function () {
    const whitelist = ref([])
    const newEmail = ref('')
    const users = ref(null)

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
            console.log(token)
            const response = await axios.get(
                'http://localhost:4000/api/whitelist/all',
                { headers: { Authorization: `Bearer ${token}` } }
            )
            whitelist.value = response.data.whitelist || []
            await getUsers(token)
        } catch (error) {
        console.error('Erreur lors de la récupération de la whitelist :', error.response?.data || error.message)
        }
    }

    const getUsers = async (token) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/user/all`, 
                { headers: { Authorization: `Bearer ${token}` } }
            )
            users.value = response.data.user
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error.response?.data || error.message)
        }
    }

    const addEmail = async (token) => {
        if (newEmail.value) {
        await addEmailToWhitelist(newEmail.value, token)
        newEmail.value = ''
        await getWhitelist(token)
        }

    }
    
    const deleteEmail = async (email, token) => {
        await deleteEmailFromWhitelist(email, token)
        await getWhitelist(token)
    }

    return {
        addEmailToWhitelist,
        deleteEmailFromWhitelist,
        getWhitelist,
        deleteEmail,
        addEmail,
        users,
        newEmail,
        whitelist
    }
}
