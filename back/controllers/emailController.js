import { sendMailContact } from '../services/emailService.js';

export const sendEmailContact = async (req, res) => {
    const { email, subject, message } = req.body;
    try {
        await sendMailContact(email, subject, message);
        res.status(200).json({ message: 'Email envoyé' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
    }
};