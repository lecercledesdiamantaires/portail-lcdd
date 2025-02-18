import { Router } from 'express';
import { createDiscountCode, getDiscountCodeByName, getSalesByDiscountCode, deleteDiscountCode } from '../controllers/shopifyController.js';

const router = Router();

router.post('/discount-code', createDiscountCode);
router.get('/get-code/:code', getDiscountCodeByName);
router.get('/sales/:code', getSalesByDiscountCode)
router.delete('/delete-code/:code', deleteDiscountCode);

export default router;
