import express from 'express';
const router = express.Router();
import { createComplaint, getMyComplaints, getAllComplaints, updateComplaintStatus } from '../controllers/complaintController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

router.post('/', authMiddleware, createComplaint);
router.get('/my', authMiddleware, getMyComplaints);
router.get('/', authMiddleware, adminMiddleware, getAllComplaints);
router.put('/:id', authMiddleware, adminMiddleware, updateComplaintStatus);

export default router;