import { createShopifyDiscountCode, getShopifyDiscountCodes, getSales } from '../services/shopifyService.js';


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

export const getDiscountCodeByName = async (req, res) => {
    try{
        const { code } = req.params;
        const priceRuleId = '2140950135119'; 
        const discountCodes = await getShopifyDiscountCodes(priceRuleId)
        const discountCodesList = discountCodes.discount_codes || [];
        const matchingCode = discountCodesList.find(discountCode => discountCode.code === code);
        if (matchingCode) {
            res.status(200).json(matchingCode);
        } else {
            res.status(404).json({ error: 'Code promo introuvable.' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du code promo :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération du code promo.' });
    }
}

export const getSalesByDiscountCode = async (req, res) => {
    try{
        // const { code } = req.params;
        const sales = await getSales()
        res.status(200).json(sales);

        return sales

    } catch (error) {
        console.error('Erreur lors de la récupération des ventes par code promo :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des ventes par code promo.' });
    }
}