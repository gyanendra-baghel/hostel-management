import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PORT, ORIGIN } from './config/envs.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ORIGIN,
  credentials: true
}));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));