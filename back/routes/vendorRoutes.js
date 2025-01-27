import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { getVendors, deleteVendor, getVendorById, updateIban, getVendorByUserId } from '../controllers/vendorController.js';

const router = Router();

// Route protégée pour ajouter un email à la whitelist (Admin uniquement)
router.get('/all', authenticateToken, getVendors);
router.get('/get/:id', authenticateToken, getVendorById);
router.get('/getVendor/:id', authenticateToken, getVendorByUserId);
router.put('/update/:id', authenticateToken, updateIban);
router.delete('/delete/:id', authenticateToken, deleteVendor);


export default router;
