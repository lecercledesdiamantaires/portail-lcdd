import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { getUsers, getUserById, deleteUser, updateUser, updateUserRole, updateCardSent, exportUsersToCSV } from '../controllers/userController.js';

const router = Router();

router.get('/all', authenticateToken, authorizeRoles(['ADMIN']), getUsers);
router.get('/unique/:id', authenticateToken, authorizeRoles(['ADMIN']), getUserById);
router.delete('/delete/:id', authenticateToken, authorizeRoles(['ADMIN']), deleteUser);
router.put('/update/:id', authenticateToken, updateUser);
router.put('/update-role/:id', authenticateToken, authorizeRoles(['ADMIN']), updateUserRole);
router.put('/update-card-sent/:id', authenticateToken, authorizeRoles(['ADMIN']), updateCardSent);
router.get('/export-users', exportUsersToCSV);

export default router;
