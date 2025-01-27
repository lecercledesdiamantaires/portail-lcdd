import { Router } from 'express';
import { updateVendorPicture, getVendorPicture } from '../controllers/pictureController.js';
import upload from '../middleware/upload.js';

const router = Router();

router.get('/get-picture/:id', getVendorPicture);
router.put('/update-picture/:id', upload.single('file'), updateVendorPicture);

export default router;
