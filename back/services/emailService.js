import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const FRONT_URL = process.env.FRONT_URL;
const BACK_URL = process.env.BACK_URL;
const logoUrl = `${BACK_URL}/assets/pictures/favicon.png`

export const sendResetPasswordEmail = async (email, token) => {
    const resetUrl = `${FRONT_URL}/resetpassword?token=${token}`;

    const templatePath = path.resolve('./templates/resetPasswordTemplate.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    htmlTemplate = htmlTemplate.replace('{{resetUrl}}', resetUrl);
    htmlTemplate = htmlTemplate.replace('{{logoUrl}}', logoUrl);

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
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};


export const sendWelcomeEmail = async (email) => {
    const welcomeUrl = `${FRONT_URL}/register`;
    const templatePath = path.resolve('./templates/welcomeTemplate.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    htmlTemplate = htmlTemplate.replace('{{welcomeUrl}}', welcomeUrl);
    htmlTemplate = htmlTemplate.replace('{{logoUrl}}', logoUrl);


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

export const sendWithdrawAsk = async (vendorId, amount, user, iban) => {
    const templatePath = path.resolve('./templates/withdrawTemplate.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    htmlTemplate = htmlTemplate.replace('{{logoUrl}}', logoUrl);

    htmlTemplate = htmlTemplate.replace('{{vendorId}}', vendorId);
    htmlTemplate = htmlTemplate.replace('{{amount}}', amount);
    htmlTemplate = htmlTemplate.replace('{{firstName}}', user.firstName);
    htmlTemplate = htmlTemplate.replace('{{lastName}}', user.lastName);
    htmlTemplate = htmlTemplate.replace('{{iban}}', iban);


    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Demande de retrait',
        html: htmlTemplate, 
    };

    await transporter.sendMail(mailOptions);
}

export const sendWithdrawAccept = async (email, amount) => {
    const templatePath = path.resolve('./templates/withdrawAcceptTemplate.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    htmlTemplate = htmlTemplate.replace('{{logoUrl}}', logoUrl);
    htmlTemplate = htmlTemplate.replace('{{amount}}', amount);

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
        subject: 'Retrait accepté',
        html: htmlTemplate, 
    };

    await transporter.sendMail(mailOptions);
}
