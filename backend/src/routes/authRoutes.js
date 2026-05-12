import express from 'express';
const router = express.Router();
import { register, login, getMe, logout, uploadProfileImage } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../config/cloudinary.js';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, getMe);

const uploadMiddleware = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }
    next();
  });
};

router.post('/profile-image', authMiddleware, uploadMiddleware, uploadProfileImage);

export default router;