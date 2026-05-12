import Complaint from '../models/Complaint.js';
import User from '../models/User.js';


// @desc    Submit a complaint
// @route   POST /api/complaints
export const createComplaint = async (req, res) => {
  const { type, description } = req.body;
  try {
    const complaint = new Complaint({
      user: req.user.id,
      type,
      description
    });
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Get student's complaints
// @route   GET /api/complaints/my
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Get all complaints (Admin)
// @route   GET /api/complaints
export const getAllComplaints = async (req, res) => {
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
          { description: { $regex: search, $options: 'i' } },
          { user: { $in: userIds } }
        ]
      };
    }

    const total = await Complaint.countDocuments(query);
    const complaints = await Complaint.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      complaints,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalComplaints: total
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id
export const updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

    complaint.status = req.body.status || 'resolved';
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
