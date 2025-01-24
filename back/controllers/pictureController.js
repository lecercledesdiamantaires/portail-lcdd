import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

  
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier envoyé." });
    }
  
    const filePath = `http://localhost:4000/assets/pictures/${req.file.filename}`;
  
    try {
      const vendorPicture = await prisma.picture.update({
        where: {
          vendorId: parseInt(id),
        },
        data: {
          url: filePath, // Enregistrez le chemin dans la base de données
        },
      });
  
      if (!vendorPicture) {
        return res.status(404).json({ error: "Vendor introuvable." });
      }
  
      res.status(200).json(vendorPicture);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur lors de la mise à jour de l'image du vendor." });
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

