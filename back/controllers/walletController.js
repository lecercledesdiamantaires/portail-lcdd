import { createWalletCard, deleteWalletCard, getWalletId } from "../services/walletService.js";

export const createCard = async (req, res) => {
    try {
        const cardJson = req.body;
        const card = await createWalletCard(cardJson);
        res.status(201).json(card);
    }catch(error){
        console.error('Erreur lors de la création de la carte :', error);
        res.status(500).json({ error: 'Erreur lors de la création de la carte.' });
    }
}

export const deleteCard = async (req, res) => {
    try {
        const cardId = req.params.id;
        await deleteWalletCard(cardId);
        res.status(204).end();
    }catch(error){
        console.error('Erreur lors de la suppression de la carte :', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la carte.' });
    }
}

export const getWallet = async (req, res) => {
    try {
        const walletId = await getWalletId(req.params.id);
        res.status(200).json({ walletId });
    }catch(error){
        console.error('Erreur lors de la récupération du walletId :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération du walletId.' });
    }
}






