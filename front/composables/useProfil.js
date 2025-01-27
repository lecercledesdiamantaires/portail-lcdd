import axios from 'axios'

export default function () {
    const { $axios } = useNuxtApp()

    let token = null
    if (typeof window !== 'undefined' && window.localStorage) {
        token = localStorage.getItem('token')
    }

    const picture = ref(null);

    const getUser = async (id) => {
        try {
            const response = await $axios.get(
                `/api/user/all${id}`, 
                { headers: { Authorization: `Bearer ${token}` } }
            )
            users.value = response.data.user
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error.response?.data || error.message)
        }
    }

    const updateUser = async (id, userData) => {
        try {
            await $axios.put(
                `/api/user/update/${id}`,
                userData,
                { headers: { Authorization: `Bearer ${token}` } }
            )
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error.response?.data || error.message)
        }
    } 
    
    const updateUserRole = async (id, role) => {
        try {
            await $axios.put(
                `/api/user/update-role/${id}`,
                { role },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            window.location.reload()
        } catch (error) {
            console.error('Erreur lors de la mise à jour du rôle de l\'utilisateur :', error.response?.data || error.message)
        }
    }

    const getPicture = async (id) => {
       try {
            const response = await $axios.get(
                `/api/picture/get-picture/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            response.data.url = `/${response.data.url}`;
            picture.value = response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'image du vendeur :', error.response?.data || error.message);
        }
    }

    const updatePicture = async (id, file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            
        
            await $axios.put(
            `/api/picture/update-picture/${id}`,
            formData,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
                },
            }
            );
        } catch (error) {
            console.error('Erreur lors de l\'envoi du fichier :', error.response?.data || error.message);
        }
    };


    const validatePicture = (file) => {
        const acceptedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!acceptedFormats.includes(file.type)) {
            console.error('Format de fichier invalide. Formats acceptés : jpeg, png, jpg.');
            return false;
        }
        if (file.size > 5000000) {
            console.error('Fichier trop volumineux. Taille maximale : 5 Mo.');
            return false;
        }
        return true;
    }

    



    return {
        getUser,
        updateUser,
        updateUserRole,
        getPicture,
        picture,
        updatePicture,
        validatePicture
       
    }
}