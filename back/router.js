// 📄 routes/router.js
import { Router } from 'express';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import whitelistRoutes from './routes/whitelistRoutes.js';
import userRoutes from './routes/userRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/protected', protectedRoutes);
router.use('/whitelist', whitelistRoutes);
router.use('/user', userRoutes);
router.use('/vendor', vendorRoutes);



export default router;
