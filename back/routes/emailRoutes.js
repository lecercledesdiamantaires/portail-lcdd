import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { sendEmailContact } from '../controllers/emailController.js';

const router = Router();

router.post('/contact', authenticateToken, sendEmailContact);

export default router;