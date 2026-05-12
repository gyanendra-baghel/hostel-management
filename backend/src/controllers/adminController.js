import Room from '../models/Room.js';
import User from '../models/User.js';
import Complaint from '../models/Complaint.js';
import LeaveRequest from '../models/LeaveRequest.js';
import RoomAssignment from '../models/RoomAssignment.js';

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
export const getStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalRooms = await Room.countDocuments();
    
    // Room distribution
    const vacantRooms = await Room.countDocuments({ status: 'vacant' });
    const partialRooms = await Room.countDocuments({ status: 'partial' });
    const occupiedRooms = await Room.countDocuments({ status: 'occupied' });

    // Complaint stats
    const pendingComplaints = await Complaint.countDocuments({ status: 'pending' });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'resolved' });
    
    const complaintTypes = await Complaint.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    // Leave stats
    const pendingLeaves = await LeaveRequest.countDocuments({ status: 'pending' });

    // Recent activities
    const recentComplaints = await Complaint.find({ status: 'pending' })
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentLeaves = await LeaveRequest.find({ status: 'pending' })
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    // Unassigned students
    const activeAssignments = await RoomAssignment.find({ status: 'active' }).distinct('user');
    const unassignedStudents = await User.countDocuments({
      role: 'student',
      _id: { $nin: activeAssignments }
    });

    res.json({
      totalStudents,
      totalRooms,
      occupiedRooms,
      roomStatus: {
        vacant: vacantRooms,
        partial: partialRooms,
        occupied: occupiedRooms
      },
      pendingComplaints,
      resolvedComplaints,
      complaintTypes,
      pendingLeaves,
      recentComplaints,
      recentLeaves,
      unassignedStudents
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};