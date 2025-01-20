import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { getVendors, deleteVendor } from '../controllers/vendorController.js';

const router = Router();

// Route protégée pour ajouter un email à la whitelist (Admin uniquement)
router.get('/all', authenticateToken, authorizeRoles(['ADMIN']), getVendors);
router.delete('/delete/:id', authenticateToken, authorizeRoles(['ADMIN']), deleteVendor);

export default router;
