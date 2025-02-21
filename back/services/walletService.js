import axios from 'axios'; 
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
dotenv.config();

const prisma = new PrismaClient();

export const createWalletCard = async (cardJson) => {
    try {
        const response = await axios.post(
            'https://app.addtowallet.co/api/card/create',
            cardJson,
            {
                headers: {
                    'apikey': process.env.WALLET_API_KEY
                }
            }
        );
        return response.data;
    } catch(error) {
        console.error('Erreur lors de la création de la carte :', error.response?.data || error.message);
        throw error
    }
}

export const deleteWalletCard = async (cardId) => {
    try {
        const response = await axios.delete(
            `https://app.addtowallet.co/api/card/delete/${cardId}`,
            {
                headers: {
                    'apikey': process.env.WALLET_API_KEY
                }
            }
        );
        return response.data;
    } catch(error) {
        console.error('Erreur lors de la suppression de la carte :', error.response?.data || error.message);
        throw error
    }
}

export const getWalletId = async (userID) => {
    try{
        const user = await prisma.vendor.findUnique({ where: { userId: parseInt(userID) } });
        if(user){
            return user.walletId;
        }
        return null;
    }catch(error){
        console.error('Erreur lors de la récupération du walletId :', error);
    }
}

