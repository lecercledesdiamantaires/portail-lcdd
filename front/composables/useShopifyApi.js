import axios from 'axios';

export default function () {

    function generateRandomCode(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    const createPromoCode = async (code = `PROMO-${generateRandomCode()}`) => {
        try {
            const response = await axios.post('http://localhost:4000/shopify/discount-code', {
              code, // Nom du code promo à créer
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création du code promo :', error.response?.data || error.message);
        }
    };


    return {
        createPromoCode
    }

 }