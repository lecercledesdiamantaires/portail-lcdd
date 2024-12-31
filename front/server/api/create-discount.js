import axios from 'axios';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const body = await readBody(event); // Récupère les données du frontend
    if (!body || !body.discount_code) {
        throw new Error('Les données du code promo sont manquantes ou invalides.');
    }

    if (!config.public.shopUrl || !config.public.apiKey || !config.public.apiSecret) {
        throw new Error('Les configurations nécessaires (shopUrl, apiKey, apiSecret) ne sont pas définies.');
    }

    const url = `https://${config.public.shopUrl}/admin/api/2023-04/price_rules/2140950135119/discount_codes.json`;

    try {
        const response = await axios.post(url, body, {
            auth: {
                username: config.public.apiKey,
                password: config.public.apiSecret,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            return {
                statusCode: error.response.status,
                message: error.response.data.errors || error.response.data,
            };
        }
        return {
            statusCode: 500,
            message: error.message,
        };
    }
});
