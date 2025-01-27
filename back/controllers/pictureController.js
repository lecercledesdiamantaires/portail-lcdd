import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path, { parse } from 'path';
import { fileURLToPath } from 'url';
import { get } from 'http';

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const findVendorByUserId = async (id) => {
    try {
        const vendor = await prisma.vendor.findUnique({
            where: {
                userId: parseInt(id),
            },
        });
        if (vendor) {
            return vendor;
        } 
    } catch (error) {
        throw new Error('Erreur serveur lors de la récupération du vendor.');
    }
}

export const getVendorPicture = async (req, res) => {
    const { id } = req.params;
    try {
        const selectedVendor = await findVendorByUserId(id);
    
        const vendorPicture = await prisma.picture.findUnique({
                where: {
                    vendorId: parseInt(selectedVendor.id),
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

        const selectedVendor = await findVendorByUserId(id);

        const vendorPicture = await prisma.picture.findUnique({
            where: {
                vendorId: parseInt(selectedVendor.id),
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
                vendorId: parseInt(selectedVendor.id),
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
    const { id } = req.params;

    try {
        console.log('req.file Controller', req.file);
        console.log('req.params Controller', req.params);
        const vendorPicture = await prisma.picture.create({
            data: {
                vendorId : parseInt(id),
                url : `assets/pictures/${req.file.filename}`,
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
