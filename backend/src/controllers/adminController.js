import Room from '../models/Room.js';
import User from '../models/User.js';
import Complaint from '../models/Complaint.js';
import LeaveRequest from '../models/LeaveRequest.js';

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
export const getStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalRooms = await Room.countDocuments();
    const occupiedRooms = await Room.countDocuments({ status: 'occupied' });
    const pendingComplaints = await Complaint.countDocuments({ status: 'pending' });
    const pendingLeaves = await LeaveRequest.countDocuments({ status: 'pending' });

    res.json({
      totalStudents,
      totalRooms,
      occupiedRooms,
      pendingComplaints,
      pendingLeaves
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};