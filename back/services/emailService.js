import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export const sendResetPasswordEmail = async (email, token) => {
    const resetUrl = `http://localhost:3000/resetpassword?token=${token}`;

    // Lire le template HTML
    const templatePath = path.resolve('./templates/resetPasswordTemplate.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    // Remplacer le placeholder par le lien de réinitialisation
    htmlTemplate = htmlTemplate.replace('{{resetUrl}}', resetUrl);

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Réinitialisation de mot de passe',
        html: htmlTemplate, // Utiliser le template HTML
    };

    await transporter.sendMail(mailOptions);
};


export const sendWelcomeEmail = async (email) => {
    const registerUrl = 'http://localhost:3000/register';
    const templatePath = path.resolve('./templates/welcomeTemplate.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    htmlTemplate = htmlTemplate.replace('{{registerUrl}}', registerUrl);

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Bienvenue au Cercle des Diamantaires',
        html: htmlTemplate, 
    };

    await transporter.sendMail(mailOptions);
};