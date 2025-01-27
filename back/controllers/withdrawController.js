export const createWithdraw = async (req, res) => {
    const { amount, vendorId } = req.body;

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
        res.status(201).json(payout);
    } catch (error) {
        console.error('Error creating payout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getWithdraws = async (req, res) => {
    try {
        const payouts = await prisma.payout.findMany();
        res.status(200).json(payouts);
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