
import { Router, RequestHandler } from 'express';
import multer from 'multer';
import { authenticate } from '../middlewares/auth.middleware.js';
import { getMyProfile, getUserProfile, updateProfile } from '../controllers/user.controller.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/me', authenticate as RequestHandler, getMyProfile as RequestHandler);
router.get('/:username', getUserProfile as RequestHandler); // Public
router.patch('/me', authenticate as RequestHandler, upload.single('imageFile'), updateProfile as RequestHandler);

export default router;
