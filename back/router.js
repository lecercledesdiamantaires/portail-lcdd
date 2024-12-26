// 📄 routes/router.js
import { Router } from 'express';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/protected', protectedRoutes);

export default router;
