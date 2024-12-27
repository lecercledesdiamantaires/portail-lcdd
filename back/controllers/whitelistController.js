import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addEmailToWhitelist = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'L\'email est requis.' });
    }

    try {
        // Vérifier si l'email est déjà dans la whitelist
        const existingEntry = await prisma.whitelist.findUnique({
            where: { email },
        });

        if (existingEntry) {
            return res.status(400).json({ error: 'Cet email est déjà dans la whitelist.' });
        }

        // Ajouter l'email à la whitelist
        const whitelistEntry = await prisma.whitelist.create({
            data: { email },
        });

        res.status(201).json({
            message: 'Email ajouté à la whitelist avec succès.',
            whitelistEntry,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
};

export const getWhitelist = async (req, res) => {
    try {
        const whitelist = await prisma.whitelist.findMany();
        res.status(200).json({ whitelist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération de la whitelist.' });
    }
};

export const deleteEmailFromWhitelist = async (req, res) => {
    const { email } = req.params; // Récupération depuis les paramètres de l'URL

    if (!email) {
        return res.status(400).json({ error: 'L\'email est requis pour la suppression.' });
    }

    try {
        // Vérifier si l'email existe
        const existingEntry = await prisma.whitelist.findUnique({
            where: { email },
        });

        if (!existingEntry) {
            return res.status(404).json({ error: 'Cet email n\'existe pas dans la whitelist.' });
        }

        // Supprimer de la whitelist
        await prisma.whitelist.delete({
            where: { email },
        });

        res.status(200).json({ message: 'Email supprimé de la whitelist avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'email.' });
    }
};