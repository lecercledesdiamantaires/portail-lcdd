import axios from 'axios'
import { add } from 'date-fns'

export default function () {
    const { $axios } = useNuxtApp()

    const whitelist = ref([])
    const newEmail = ref('')
    const users = ref(null)
    const vendors = ref(null)
    const errorMessage = ref(null)
    const withdraws = ref(null)

    let token = null
    if (typeof window !== 'undefined' && window.localStorage) {
        token = localStorage.getItem('token')
    }
    const addEmailToWhitelist = async (email) => {
        try {
            if (typeof email !== 'string') {
            throw new Error('L\'email doit être une chaîne de caractères.')
        }

        await $axios.post(
            `/api/whitelist/add`,
            { email },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'email :', error.response?.data || error.message)
        }
    }

    const deleteEmailFromWhitelist = async (id, userId = null) => {
        try {
            await $axios.delete(
                `/api/whitelist/delete/${id}`,
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
            await $axios.delete(
                `/api/user/delete/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
        }
        catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error.response?.data || error.message)
        }
    }

    const getWhitelist = async (token) => {
        try {
            const response = await $axios.get(
                `/api/whitelist/all`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            whitelist.value = response.data.whitelist || []
            await getUsers(token)
            await getVendors(token)
            await getWithdraws(token)
        } catch (error) {
        console.error('Erreur lors de la récupération de la whitelist :', error.response?.data || error.message)
        }
    }

    const getUsers = async (token) => {
        try {
            const response = await $axios.get(
                `/api/user/all`, 
                { headers: { Authorization: `Bearer ${token}` } }
            )
            users.value = response.data.user
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error.response?.data || error.message)
        }
    }

    const getVendors = async (token) => {
        try {
            const response = await $axios.get(
                `/api/vendor/all`, 
                { headers: { Authorization: `Bearer ${token}` } }
            )
            vendors.value = response.data.vendor
        } catch (error) {
            console.error('Erreur lors de la récupération des vendors :', error.response?.data || error.message)
        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const addEmail = async () => {
        if (newEmail.value && validateEmail(newEmail.value)) {
            await addEmailToWhitelist(newEmail.value, token)
            newEmail.value = ''
            await getWhitelist(token)
        } else {
            errorMessage.value = "Veuillez entrer une adresse e-mail valide."
            setTimeout(() => {
                errorMessage.value = null
            }, 2000)  
        }
    }
    
    const deleteEmail = async (email, userId) => {
        await deleteEmailFromWhitelist(email, userId)
        await getWhitelist(token)
    }

    const getWithdraws = async (token) => {
        try {
            const response = await $axios.get(
                `/api/withdraw/all`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            withdraws.value = response.data
        } catch (error) {
            console.error('Erreur lors de la récupération des payouts :', error.response?.data || error.message)
        }
    }

    const combinedData = computed(() => {
        return whitelist.value.map(item => {
            const user = users?.value?.find(user => user?.id === item?.userId);
            const vendor = vendors?.value?.find(vendor => vendor?.userId === item?.userId);
            const pendingWithdraws = vendor
                ? withdraws?.value?.filter(
                    withdraw => withdraw?.vendorId === vendor?.id && withdraw?.status === 'PENDING'
                )
                : [];
            return {
                ...item,
                role: user ? user.role : 'N/A',
                lastName: user ? user.lastName : 'N/A',
                firstName: user ? user.firstName : 'N/A',
                phoneNumber: user ? user.phoneNumber : 'N/A',
                promoCode: vendor ? vendor.promoCode : null,
                vendorIban: vendor?.iban ? vendor.iban : 'N/A',
                totalWithdraw: vendor?.totalWithdraw ? vendor.totalWithdraw : 0,
                address: user ? user.address : 'N/A',
                cardSent: user ? user.cardSent : false,
                withdraws: pendingWithdraws
            };
        });
    });

    const withdrawsPending = computed(() => {
        return withdraws.value?.filter(withdraw => withdraw.status === 'PENDING')
    })


    const deleteVendor = async (id) => {
        try {
            const findVendor = vendors.value.find(vendor => vendor.userId === id)
            await $axios.delete(
                `/api/vendor/delete/${findVendor.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
        } catch (error) {
            console.error('Erreur lors de la suppression du vendor :', error.response?.data || error.message)
        }
    }
    
    return {
        addEmailToWhitelist,
        deleteEmailFromWhitelist,
        getWhitelist,
        deleteEmail,
        addEmail,
        users,
        newEmail,
        whitelist,
        withdraws,
        withdrawsPending,   
        combinedData,
        errorMessage,
        validateEmail,
        deleteVendor
    }
}
