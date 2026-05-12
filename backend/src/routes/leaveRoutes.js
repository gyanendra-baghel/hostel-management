import express from 'express';
const router = express.Router();
import { createLeaveRequest, getMyLeaveRequests, getAllLeaveRequests, updateLeaveStatus } from '../controllers/leaveController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

router.post('/', authMiddleware, createLeaveRequest);
router.get('/my', authMiddleware, getMyLeaveRequests);
router.get('/', authMiddleware, adminMiddleware, getAllLeaveRequests);
router.put('/:id', authMiddleware, adminMiddleware, updateLeaveStatus);

export default router;