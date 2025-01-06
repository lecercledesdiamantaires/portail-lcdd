import { createShopifyDiscountCode } from '../services/shopifyService.js';


export const createDiscountCode = async (req, res) => {
    try {
        const { code } = req.body; // Récupère le code promo depuis la requête
        const priceRuleId = '2140950135119'; // ID de la règle de prix existante

        // Appel au service pour créer le code promo
        const discountCode = await createShopifyDiscountCode(priceRuleId, code);
        res.status(201).json(discountCode);
        return discountCode;
    } catch (error) {
        console.error('Erreur lors de la création du code promo :', error);
        res.status(500).json({ error: 'Erreur lors de la création du code promo.' });
    }
};
