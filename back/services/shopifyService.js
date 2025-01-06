import axios from 'axios';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const SHOPIFY_BASE_URL = process.env.SHOPIFY_BASE_URL; // URL de base Shopify
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;   // Clé API Shopify
const SHOPIFY_PASSWORD = process.env.SHOPIFY_PASSWORD; // Mot de passe API Shopify

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

