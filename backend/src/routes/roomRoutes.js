import express from 'express';
const router = express.Router();
import { getRooms, createRoom, assignRoom, getMyRoom, unassignRoom } from '../controllers/roomController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

router.get('/', authMiddleware, getRooms);
router.post('/', authMiddleware, adminMiddleware, createRoom);
router.post('/assign', authMiddleware, adminMiddleware, assignRoom);
router.put('/unassign/:assignmentId', authMiddleware, adminMiddleware, unassignRoom);
router.get('/my-room', authMiddleware, getMyRoom);

export default router;