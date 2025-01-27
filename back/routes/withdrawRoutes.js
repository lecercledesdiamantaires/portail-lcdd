import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { createWithdraw, getWithdraws, acceptWithdraw } from '../controllers/withdrawController.js';

const router = Router();

router.post('/create', authenticateToken, createWithdraw);
router.get('/all', authenticateToken, getWithdraws);
router.put('/accept/:id', authenticateToken, authorizeRoles(['ADMIN']), acceptWithdraw);

export default router;

