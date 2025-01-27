// 📄 routes/authRoutes.js
import { Router } from 'express';
import { register, login, forgotPassword, resetPassword } from '../controllers/authController.js';
import upload  from '../middleware/upload.js';

const router = Router();

router.post('/register',  upload.single('picture'), register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
