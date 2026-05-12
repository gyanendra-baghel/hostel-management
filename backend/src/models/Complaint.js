import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['Electricity', 'Water', 'Cleaning', 'Internet', 'Other'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending',
  },
}, { timestamps: true });

export default mongoose.model('Complaint', ComplaintSchema);