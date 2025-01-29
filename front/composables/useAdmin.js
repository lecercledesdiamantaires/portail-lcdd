export default function () {
    const { $axios } = useNuxtApp()

    let token = null
    if (typeof window !== 'undefined' && window.localStorage) {
        token = localStorage.getItem('token')
    }

    const acceptWithdraw = async (id, email, amount) => {
        try {
            const response = await $axios.put(`/api/withdraw/accept/${id}`, 
                { email, amount }, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            window.location.reload();
            return response.data;
        } catch (error) {
            console.error('Error accepting payout:', error.response?.data || error.message);
            throw error;
        }
    }

    return { 
        acceptWithdraw
    }
}