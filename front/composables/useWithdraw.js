export default function () {

    const { $axios } = useNuxtApp()
    let token = null
    if (typeof window !== 'undefined' && window.localStorage) {
        token = localStorage.getItem('token')
    }
    const successMessage = ref(null);
    const errorMessage = ref(null);

    const withdraws = ref([]);

    const switchSuccessMessage = (value) => {
        successMessage.value = value
        setTimeout(() => {
            successMessage.value = null
        }, 2000)
    }

    const createWithdraw = async (amount, vendorId) => {
        try {
            const response = await $axios.post('/api/withdraw/create', {
                amount,
                vendorId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            switchSuccessMessage('Demande de virement éffectuée.');
            return response.data;
        } catch (error) {
            console.error('Error creating payout:', error.response?.data || error.message);
            errorMessage.value = error.response?.data.error || error.message;
            throw error;
        }
    };

    const getWithdraws = async () => {
        try {
            const response = await $axios.get('/api/withdraw/all', {
                headers: { Authorization: `Bearer ${token.value}` }
            });
            withdraws.value = response.data;
        } catch (error) {
            console.error('Error getting payouts:', error.response?.data || error.message);
            throw error;
        }
    }

    const acceptWithdraw = async (id) => {
        try {
            const response = await $axios.put(`/api/withdraw/accept/${id}`, {}, {
                headers: { Authorization: `Bearer ${token.value}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error accepting payout:', error.response?.data || error.message);
            throw error;
        }
    }

    return {
        createWithdraw, 
        getWithdraws,
        acceptWithdraw, 
        successMessage,
        errorMessage,
    };
}