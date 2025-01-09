import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getVendors = async (req, res) => {
    try {
        const vendor = await prisma.vendor.findMany();
        res.status(200).json({ vendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des vendors.' });
    }
};
