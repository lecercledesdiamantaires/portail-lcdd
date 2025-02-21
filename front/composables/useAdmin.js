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

    const downloadCSV = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/user/export-users');
            if (!response.ok) throw new Error('Erreur lors du téléchargement');
    
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
    
            const a = document.createElement('a');
            a.href = url;
            a.download = 'users.csv'; // Ce nom sera suggéré, mais l'utilisateur peut choisir où enregistrer
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('❌ Erreur lors du téléchargement du CSV :', error);
        }
    };
    
    

    return { 
        acceptWithdraw,
        downloadCSV
    }
}