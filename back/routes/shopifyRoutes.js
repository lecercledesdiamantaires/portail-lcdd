import express from 'express';
const router = express.Router();
import { createDiscountCode} from '../controllers/shopifyController.js';

router.post('/discount-code',createDiscountCode);

export default router;
