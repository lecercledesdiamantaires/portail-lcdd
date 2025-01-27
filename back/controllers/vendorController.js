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

export const getVendorById = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await prisma.vendor.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (vendor) {
            res.status(200).json(vendor);
        } else {
            res.status(404).json({ error: 'Vendor introuvable.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération du vendor.' });
    }
}

export const getVendorByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await prisma.vendor.findUnique({
            where: {
                userId: parseInt(id),
            },
        });
       res.status(200).json(vendor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération du vendor.' });
    }
}

export const updateIban = async (req, res) => {
    try {
        const { id } = req.params;
        const { iban } = req.body;
        const updatedVendor = await prisma.vendor.update({
            where: {
                id: parseInt(id),
            },
            data: {
                iban,
            },
        });
        res.status(200).json(updatedVendor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l\'iban du vendor.' });
    }
}


export const deleteVendor = async (req, res) => {
    const { id } = req.params;
    try {
        const vendor = await prisma.vendor.delete({
            where: {
                id: parseInt(id),
            },
        });
        if (vendor) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Vendor introuvable.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de la suppression du vendor.' });
    }
}
