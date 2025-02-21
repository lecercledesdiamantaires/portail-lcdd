import { Router } from 'express';
import { createCard, deleteCard, getWallet } from '../controllers/walletController.js';

const router = Router();

router.post('/create', createCard);
router.delete('/delete/:id', deleteCard);
router.get('/get/:id', getWallet);

export default router;