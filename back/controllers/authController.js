// 📄 controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req, res) => {
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    console.log(req.body);

    if (!firstName || !lastName || !email || !password || !phoneNumber) {
        return res.status(400).json({ error: 'Tous les champs doivent être remplis.' });
    }

    const phoneNumberInt = parseInt(phoneNumber, 10);
    if (isNaN(phoneNumberInt)) {
        return res.status(400).json({ error: 'Le numéro de téléphone doit être un nombre entier valide.' });
    }

    try {
        // Vérifier si l'email est dans la whitelist
        const whitelisted = await prisma.whitelist.findUnique({ where: { email } });
        if (!whitelisted) {
            return res.status(403).json({ error: 'Email non autorisé' });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Utilisateur déjà existant' });
        }

        const existingPhoneNumber = await prisma.user.findUnique({ where: { phoneNumber } });
        if (existingPhoneNumber) {
            return res.status(400).json({ error: 'Numéro de téléphone déjà utilisé.' });
        }


        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phoneNumber : phoneNumberInt,
                whitelist: {
                    connect: { email }
                }
            }
        });

        res.status(201).json({ message: 'Inscription réussie', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (typeof email !== 'string') {
        return res.status(400).json({ error: 'L\'email doit être une chaîne de caractères.' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Connexion réussie', token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
