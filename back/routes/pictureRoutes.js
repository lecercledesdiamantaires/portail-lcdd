import { Router } from 'express';
import { updateVendorPicture, getVendorPicture, postVendorPicture } from '../controllers/pictureController.js';
import multer from 'multer';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets/pictures'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = Router();

router.get('/get-picture/:id', getVendorPicture);
router.put('/update-picture/:id', upload.single('file'), updateVendorPicture);
router.post('/post-picture', postVendorPicture);

export default router;
