import { PrismaClient } from '@prisma/client';
import { sendWithdrawAsk } from '../services/emailService.js';

const prisma = new PrismaClient();

export const createWithdraw = async (req, res) => {
    const { amount, vendorId, user } = req.body;

    if (!amount || !vendorId) {
        return res.status(400).json({ error: 'Amount and vendorId are required' });
    }

    try {
        const payout = await prisma.payout.create({
            data: {
                amount: parseFloat(amount),
                vendorId: parseInt(vendorId),
                status: 'PENDING',
                date: new Date(),
            },
        });
        //await sendWithdrawAsk(vendorId, amount, user);

        res.status(201).json(payout);
    } catch (error) {
        console.error('Error creating payout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getWithdrawById = async (req, res) => {
    const { id } = req.params;
    try {
        const payouts = await prisma.payout.findMany({
            where: { vendorId: parseInt(id) },
        });
        return res.status(200).json(payouts);
    } catch (error) {
        console.error('Error getting payouts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const acceptWithdraw = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Withdraw ID is required' });
    }

    try {
        const payout = await prisma.payout.update({
            where: { id: parseInt(id) },
            data: { status: 'ACCEPTED' },
        });
        res.status(200).json(payout);
    } catch (error) {
        console.error('Error accepting payout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getTotalWithdrawById = async (req, res) => {
    const { id } = req.params;
    try {
        const totalWithdraw = await prisma.vendor.findMany({
            where: { id: parseInt(id) },
            select: {
                totalWithdraw: true,
            },
        });
        res.status(200).json(totalWithdraw);
    } catch (error) {
        console.error('Error getting total withdraw:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateTotalWithdraw = async (req, res) => {  
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount) {
        return res.status(400).json({ error: 'Amount is required' });
    }

    try {
        const currentVendor = await prisma.vendor.findUnique(
            {
                where: { id: parseInt(id) },
            }
        );
        const newTotalAmount = currentVendor.totalWithdraw + parseFloat(amount);

        const updatedTotalWithdraw = await prisma.vendor.update({
            where: { id: parseInt(id) },
            data: { totalWithdraw: newTotalAmount },
        });

        res.status(200).json(updatedTotalWithdraw);
    } catch (error) {
        console.error('Error updating total withdraw:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}