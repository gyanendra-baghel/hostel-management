import express from 'express';
const router = express.Router();
import { register, login, getMe, logout } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, getMe);

export default router;