import express from 'express';
const router = express.Router();
import { createDiscountCode, getDiscountCodeByName, getSalesByDiscountCode } from '../controllers/shopifyController.js';

router.post('/discount-code', createDiscountCode);
router.get('/get-code/:code', getDiscountCodeByName);
router.get('/sales/:code', getSalesByDiscountCode)

export default router;
