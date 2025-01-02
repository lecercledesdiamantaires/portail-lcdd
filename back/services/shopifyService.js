import axios from 'axios';

const SHOPIFY_BASE_URL = process.env.SHOPIFY_BASE_URL; // URL de base Shopify
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;   // Clé API Shopify
const SHOPIFY_PASSWORD = process.env.SHOPIFY_PASSWORD; // Mot de passe API Shopify

export const getShopifyDiscountCode = async () => {
    try {
        const response = await axios.get(`https://${SHOPIFY_BASE_URL}/admin/api/2023-04/price_rules/2140950135119/discount_codes.json`, {
            auth: {
                username: SHOPIFY_API_KEY,
                password: SHOPIFY_PASSWORD,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'appel API Shopify:', error);
        throw error;
    }
};


export const createShopifyDiscountCode = async (priceRuleId, code) => {
    try {
        const response = await axios.post(
            `https://${SHOPIFY_BASE_URL}/admin/api/2023-01/price_rules/${priceRuleId}/discount_codes.json`,
            {
                discount_code: { code }, // Objet contenant le code promo
            },
            {
                auth: {
                    username: SHOPIFY_API_KEY,
                    password: SHOPIFY_PASSWORD,
                },
            }
        );

        return response.data.discount_code; // Retourne le code promo créé
    } catch (error) {
        console.error('Erreur API Shopify pour créer un code promo :', error.response?.data || error.message);
        throw error;
    }
};

