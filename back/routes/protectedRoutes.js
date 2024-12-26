// 📄 routes/protectedRoutes.js
import { Router } from 'express';
import { protectedRoute } from '../controllers/protectedController.js';
import { jwtMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', jwtMiddleware, protectedRoute);

export default router;
