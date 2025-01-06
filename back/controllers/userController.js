import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
    try {
        const user = await prisma.user.findMany();
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des users.' });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID requis.' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'utilisateur.' });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID requis.' });
    }

    try {
        const user = await prisma.user.delete({
            where: { id: parseInt(id, 10) },
        });

        res.status(200).json({ message: 'Utilisateur supprimé avec succès.', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'utilisateur.' });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password, phoneNumber, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);


    if (!id) {
        return res.status(400).json({ error: 'ID requis.' });
    }

    try {
        const user = await prisma.user.update({
            where: { id: parseInt(id, 10) },
            data: {
                firstName,
                lastName,
                email,
                phoneNumber,
                password : hashedPassword
            },
        });

        res.status(200).json({ message: 'Utilisateur mis à jour avec succès.', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l\'utilisateur.' });
    }
}
