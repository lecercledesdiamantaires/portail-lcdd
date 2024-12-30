import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { deleteEmailFromWhitelist, getWhitelist, addEmailToWhitelist } from '../controllers/whitelistController.js';

const router = Router();

// Route protégée pour ajouter un email à la whitelist (Admin uniquement)
router.post('/add', authenticateToken, authorizeRoles(['ADMIN']), addEmailToWhitelist);
router.get('/all', authenticateToken, authorizeRoles(['ADMIN']), getWhitelist);
router.delete('/delete/:email', authenticateToken, authorizeRoles(['ADMIN']), deleteEmailFromWhitelist);

export default router;
