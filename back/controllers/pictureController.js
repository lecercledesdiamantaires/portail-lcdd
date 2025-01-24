import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getVendorPicture = async (req, res) => {
    const { id } = req.params;
    try {
        const vendorPicture = await prisma.picture.findUnique({
                where: {
                    vendorId: parseInt(id),
                },
            });
            if (vendorPicture) {
                res.status(200).json(vendorPicture);
            } else {
                res.status(404).json({ error: 'Vendor introuvable.' });
            }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'image.' });
    }
}


export const updateVendorPicture = async (req, res) => {
    const { id } = req.params;

    try {
        // Étape 1 : Récupérer l'ancienne image de la base de données
        const vendorPicture = await prisma.picture.findUnique({
            where: {
                vendorId: parseInt(id),
            },
        });

        if (!vendorPicture) {
            return res.status(404).json({ error: 'Vendor introuvable.' });
        }

        const oldImagePath = vendorPicture.url; // URL de l'ancienne image

        // Étape 2 : Mettre à jour l'URL de la nouvelle image dans la base de données
        console.log('req.file', req.file);
        const newImagePath = `assets/pictures/${req.file.filename}`;
        const updatedVendorPicture = await prisma.picture.update({
            where: {
                vendorId: parseInt(id),
            },
            data: {
                url: newImagePath,
            },
        });

        // Étape 3 : Supprimer l'ancienne image en appelant deleteOldPicture
        await deleteOldPicture(oldImagePath);

        res.status(200).json(updatedVendorPicture);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l\'image du vendor.' });
    }
};




export const postVendorPicture = async (req, res) => {
    const { vendorId, url } = req.body;

    try {
        const vendorPicture = await prisma.picture.create({
            data: {
                vendorId,
                url,
            },
        });
        res.status(201).json(vendorPicture);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de la création de l\'image du vendor.' });
    }
}

const deleteOldPicture = (oldImagePath) => {
    return new Promise((resolve, reject) => {
        if (!oldImagePath) {
            return resolve(); // Rien à supprimer si aucun chemin n'est fourni
        }

        const fullPath = path.join(__dirname, '..', oldImagePath); // Construire le chemin absolu
        fs.unlink(fullPath, (err) => {
            if (err) {
                console.error(`Erreur lors de la suppression de l'ancienne image : ${err.message}`);
                return reject(err); // Rejette la promesse si une erreur survient
            }
            console.log(`Ancienne image supprimée : ${fullPath}`);
            resolve();
        });
    });
};
