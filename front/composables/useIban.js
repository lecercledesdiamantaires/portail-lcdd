import axios from 'axios'

export default function () {
    const { $axios } = useNuxtApp()
    const errorMessage = ref(null)
    const successMessage = ref(null)
    const iban = ref('')
    const vendorId = ref(null)
    let token = null
    if (typeof window !== 'undefined' && window.localStorage) {
        token = localStorage.getItem('token')
    }

    const myProfile = ref(null)

    const getIban = async (id) => {
        try {
            const response = await $axios.get(
                `/api/vendor/get/${id}`, 
                { headers: { Authorization: `Bearer ${token}` } }
            )
            iban.value = response.data.iban
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error.response?.data || error.message)
        }
    }

    const switchSuccessMessage = (value) => {
        successMessage.value = value
        setTimeout(() => {
            successMessage.value = null
        }, 2000)
    }

    const getVendorByUserId = async (id) => {
        try {
            const response = await $axios.get(
                `/api/vendor/getVendor/${id}`, 
                { headers: { Authorization: `Bearer ${token}` } }
            )
            vendorId.value = response.data.id
            console.log(response.data.id)
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error.response?.data || error.message)
        }
    }

    const updateIban = async (id) => {
        try {
            const response = await $axios.put(
                `/api/vendor/update/${id}`,
                { iban: iban.value },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            switchSuccessMessage('IBAN mis à jour avec succès.')
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error.response?.data || error.message)
        }
    }

    const validateIban = () => {
        const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
        const cleanedIban = iban.value.replace(/[\s-]/g, ''); 
        return ibanRegex.test(cleanedIban);
    }

    if (process.client) {
        const userProfile = localStorage.getItem('user');
        if (userProfile) {
            myProfile.value = JSON.parse(userProfile);
            getVendorByUserId(myProfile.value.id);
        }
    }

    watch(myProfile, (newProfile) => {
        if (newProfile && newProfile.id) {
            getVendorByUserId(newProfile.id);
        }
    }, { immediate: true })

    watch(vendorId, (newVendorId) => {
        if (newVendorId) {
            getIban(newVendorId);
        }
    }, { immediate: true })

    watch(() => iban.value, (newValue) => {
        if (validateIban(newValue)) {
            errorMessage.value = null;
        } else {
            errorMessage.value = 'IBAN invalide';
        }
    })

    return{
        iban,
        getIban,
        updateIban,
        validateIban,
        getVendorByUserId,
        errorMessage,
        successMessage,
        vendorId
    }
}