import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { getUsers, getUserById, deleteUser } from '../controllers/userController.js';

const router = Router();

// Route protégée pour ajouter un email à la whitelist (Admin uniquement)
router.get('/all', authenticateToken, authorizeRoles(['ADMIN']), getUsers);
router.get('/unique/:id', authenticateToken, authorizeRoles(['ADMIN']), getUserById);
router.delete('/delete/:id', authenticateToken, authorizeRoles(['ADMIN']), deleteUser);


export default router;
