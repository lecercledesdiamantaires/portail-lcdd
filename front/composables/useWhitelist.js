import axios from 'axios'

export default function () {
    const whitelist = ref([])
    const newEmail = ref('')
    const users = ref(null)
    const vendors = ref(null)
    
    let token = null
    if (typeof window !== 'undefined' && window.localStorage) {
        token = localStorage.getItem('token')
    }
    const addEmailToWhitelist = async (email) => {
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

    const deleteEmailFromWhitelist = async (id, userId = null) => {
        try {
            await axios.delete(
                `http://localhost:4000/api/whitelist/delete/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'email :', error.response?.data || error.message)
        }
        if (userId) {
           deleteUser(userId, token)
        }
       
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(
                `http://localhost:4000/api/user/delete/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
        }
        catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error.response?.data || error.message)
        }
    }

    const getWhitelist = async (token) => {
        try {
            const response = await axios.get(
                'http://localhost:4000/api/whitelist/all',
                { headers: { Authorization: `Bearer ${token}` } }
            )
            whitelist.value = response.data.whitelist || []
            await getUsers(token)
            await getVendors(token)
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

    const getVendors = async (token) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/vendor/all`, 
                { headers: { Authorization: `Bearer ${token}` } }
            )
            vendors.value = response.data.vendor
        } catch (error) {
            console.error('Erreur lors de la récupération des vendors :', error.response?.data || error.message)
        }
    }

    const addEmail = async () => {
        if (newEmail.value) {
        await addEmailToWhitelist(newEmail.value, token)
        newEmail.value = ''
        await getWhitelist(token)
        }

    }
    
    const deleteEmail = async (email, userId) => {
        await deleteEmailFromWhitelist(email, userId)
        await getWhitelist(token)
    }



    const combinedData = computed(() => {
        return whitelist.value.map(item => {
            const user = users.value.find(user => user.id === item.userId)
            const vendor = vendors.value.find(vendor => vendor.userId === item.userId)
            return {
                ...item,
                role: user ? user.role : 'Unknown',
                lastName: user ? user.lastName : 'Unknown',
                firstName: user ? user.firstName : 'Unknown',
                phoneNumber: user ? user.phoneNumber : 'Unknown',
                promoCode: vendor ? vendor.promoCode : 'Unknown',
            }
        })
    })
      
    return {
        addEmailToWhitelist,
        deleteEmailFromWhitelist,
        getWhitelist,
        deleteEmail,
        addEmail,
        users,
        newEmail,
        whitelist,
        combinedData
    }
}
