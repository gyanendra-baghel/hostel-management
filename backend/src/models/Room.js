import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['vacant', 'partial', 'occupied'],
    default: 'vacant',
  },
}, { timestamps: true });

export default mongoose.model('Room', RoomSchema);