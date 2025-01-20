import axios from 'axios'

export default function () {
    let token = null
    if (typeof window !== 'undefined' && window.localStorage) {
        token = localStorage.getItem('token')
    }
    const getUser = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/user/all${id}`, 
                { headers: { Authorization: `Bearer ${token}` } }
            )
            users.value = response.data.user
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error.response?.data || error.message)
        }
    }

    const updateUser = async (id, userData) => {
        try {
            console.log('userData', userData)
            await axios.put(
                `http://localhost:4000/api/user/update/${id}`,
                userData,
                { headers: { Authorization: `Bearer ${token}` } }
            )
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error.response?.data || error.message)
        }
    } 
    
    const updateUserRole = async (id, role) => {
        try {
            await axios.put(
                `http://localhost:4000/api/user/update-role/${id}`,
                { role },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            window.location.reload()
        } catch (error) {
            console.error('Erreur lors de la mise à jour du rôle de l\'utilisateur :', error.response?.data || error.message)
        }
    }



    return {
        getUser,
        updateUser,
        updateUserRole
    }
}