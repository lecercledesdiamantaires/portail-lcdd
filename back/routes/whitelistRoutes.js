import { Router } from 'express';
import { addEmailToWhitelist } from '../controllers/whitelistController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

// Route protégée pour ajouter un email à la whitelist (Admin uniquement)
router.post('/add', authenticateToken, authorizeRoles(['ADMIN']), addEmailToWhitelist);

export default router;
