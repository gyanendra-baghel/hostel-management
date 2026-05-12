import express from 'express';
const router = express.Router();
import { getStats } from '../controllers/adminController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

router.get('/stats', authMiddleware, adminMiddleware, getStats);

export default router;