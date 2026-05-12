import LeaveRequest from '../models/LeaveRequest.js';

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
    const leaves = await LeaveRequest.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
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