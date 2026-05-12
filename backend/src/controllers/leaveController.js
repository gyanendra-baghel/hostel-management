import LeaveRequest from '../models/LeaveRequest.js';
import User from '../models/User.js';

// @desc    Apply for leave
// @route   POST /api/leave
export const createLeaveRequest = async (req, res) => {
  const { reason, startDate, endDate } = req.body;
  try {
    const leave = new LeaveRequest({
      user: req.user.id,
      reason,
      startDate,
      endDate
    });
    await leave.save();
    res.json(leave);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Get student's leave requests
// @route   GET /api/leave/my
export const getMyLeaveRequests = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Get all leave requests (Admin)
// @route   GET /api/leave
export const getAllLeaveRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    let query = {};
    if (search) {
      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }).select('_id');
      const userIds = users.map(user => user._id);

      query = {
        $or: [
          { reason: { $regex: search, $options: 'i' } },
          { user: { $in: userIds } }
        ]
      };
    }

    const total = await LeaveRequest.countDocuments(query);
    const leaves = await LeaveRequest.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      leaves,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalLeaves: total
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Approve/Reject leave
// @route   PUT /api/leave/:id
export const updateLeaveStatus = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) return res.status(404).json({ msg: 'Leave request not found' });

    leave.status = req.body.status; // approved or rejected
    await leave.save();
    res.json(leave);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
