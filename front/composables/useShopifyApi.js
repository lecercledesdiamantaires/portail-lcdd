import axios from 'axios';

export default function () {
    const config = useRuntimeConfig();
    if (!config.public.shopUrl || !config.public.apiKey || !config.public.apiSecret) {
        throw new Error('Les configurations nécessaires (shopUrl, apiKey, apiSecret) ne sont pas définies.');
    }

    const auth = {
        username: config.public.apiKey,
        password: config.public.apiSecret
    };


    function generateRandomCode(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    const randomCodeName = `PROMO-${generateRandomCode()}`;
    console.log(`Code promo généré: ${randomCodeName}`);
    const url = `https://${config.public.shopUrl}/admin/api/2023-04/price_rules/2140950135119/discount_codes.json`;

    const data = {
        discount_code: {
            code: randomCodeName
        }
    };


    const createPromoCode = async () => {
        try {
            const response = await $fetch('/api/create-discount', {
                method: 'POST',
                body: {
                    discount_code: {
                        code: randomCodeName
                    }
                }
            });
            console.log("Code promo créé avec succès via le backend:", response);
        } catch (error) {
            console.error("Erreur lors de la création du code promo:", error);
        }
    };


    return {
        createPromoCode,
    }

 }