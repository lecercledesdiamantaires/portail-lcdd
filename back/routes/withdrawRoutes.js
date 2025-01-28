import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { createWithdraw, getWithdrawById, acceptWithdraw, updateTotalWithdraw, getTotalWithdrawById, getWithdraws } from '../controllers/withdrawController.js';

const router = Router();

router.post('/create', authenticateToken, createWithdraw);
router.get('/getWithdraw/:id', authenticateToken, getWithdrawById);
router.get('/get/:id', authenticateToken, getTotalWithdrawById);
router.get('/all' , authenticateToken, authorizeRoles(['ADMIN']), getWithdraws);
router.put('/accept/:id', authenticateToken, authorizeRoles(['ADMIN']), acceptWithdraw);
router.put('/updateTotalWithdraw/:id', authenticateToken, updateTotalWithdraw);

export default router;

