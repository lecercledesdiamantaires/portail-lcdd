// 📄 controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { sendResetPasswordEmail } from '../services/emailService.js';
import userModel from '../models/userModel.js';


const prisma = new PrismaClient();

prisma.user.generateResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token valide pendant 10 minutes
    return resetToken;
};

export const register = async (req, res) => {
    const { email, password, firstName, lastName, phoneNumber, promoCode } = req.body;
    console.log('req.file', req.file);
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
        return res.status(400).json({ error: 'Tous les champs doivent être remplis.' });
    }

    try {
      
        const whitelisted = await prisma.whitelist.findUnique({ where: { email } });
        if (!whitelisted) {
            return res.status(403).json({ error: 'Email non autorisé' });
        }

       
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
                phoneNumber,
                whitelist: {
                    connect: { email }
                },
            }
        });

        const role = user.role;
        if (role === 'VENDEUR') {
            const vendor = await prisma.vendor.create({
                data: {
                userId: user.id,
                promoCode: promoCode,
                
                },
            });


            if (req.file) {
                const picturePath = `assets/pictures/${req.file.filename}`;
                await prisma.picture.create({
                    data: {
                        vendorId: vendor.id,
                        url: picturePath,
                    },
                });
            }else{
                console.log('no picture');
                return;
            }
        }


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

        let promoCode = null;
        if (user.role === 'VENDEUR') {
            const vendor = await prisma.vendor.findUnique({ where: { userId: user.id } });
            if (vendor) {
                promoCode = vendor.promoCode;
            }
        }

        res.json({ message: 'Connexion réussie', token, user, promoCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};



export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const resetToken = userModel.generateResetToken.call(user);
    await prisma.user.update({
        where: { email },
        data: {
            resetPasswordToken: user.resetPasswordToken,
            resetPasswordExpires: new Date(user.resetPasswordExpires),
        },
    });

    await sendResetPasswordEmail(user.email, resetToken);

    res.json({ message: 'Un lien de réinitialisation de mot de passe a été envoyé à votre adresse email.' });
};

export const resetPassword = async (req, res) => {
    const { token, password } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await prisma.user.findFirst({
        where: {
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { gt: new Date() },
        },
    });

    if (!user) {
        return res.status(400).json({ error: 'Le lien de réinitialisation est invalide ou a expiré' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: user.password,
            resetPasswordToken: user.resetPasswordToken,
            resetPasswordExpires: user.resetPasswordExpires,
        },
    });

    res.json({ message: 'Votre mot de passe a été réinitialisé avec succès' });
};