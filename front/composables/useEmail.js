export default function () {
    const { $axios } = useNuxtApp()
    const subject = ref('')
    const message = ref('')

    let token = null
    if (typeof window !== 'undefined' && window.localStorage) {
        token = localStorage.getItem('token')
    }

    const sendEmailContact = async (email, subject, message) => {
        try{
            const response = await $axios.post('api/email/contact', {
                email: email,
                subject: subject,
                message: message
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email :', error.response?.data || error.message)
        }
    }

    return {
        sendEmailContact,
        subject,
        message
    }
}