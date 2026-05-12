import Room from '../models/Room.js';
import RoomAssignment from '../models/RoomAssignment.js';
import User from '../models/User.js';

// @desc    Get all rooms with current occupants
// @route   GET /api/rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().lean();

    // For each room, find active assignments and populate user info
    const roomsWithOccupants = await Promise.all(rooms.map(async (room) => {
      const occupants = await RoomAssignment.find({
        room: room._id,
        status: 'active'
      })
        .populate('user', 'name email')
        .lean();

      return { ...room, occupants };
    }));

    res.json(roomsWithOccupants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Unassign a student from a room
// @route   PUT /api/rooms/unassign/:assignmentId
export const unassignRoom = async (req, res) => {
  try {
    const assignment = await RoomAssignment.findById(req.params.assignmentId);
    if (!assignment) return res.status(404).json({ msg: 'Assignment not found' });

    assignment.status = 'completed';
    assignment.endDate = Date.now();
    await assignment.save();

    // Update room status
    const room = await Room.findById(assignment.room);
    const activeAssignments = await RoomAssignment.countDocuments({
      room: room._id,
      status: 'active'
    });

    if (activeAssignments === 0) {
      room.status = 'vacant';
    } else if (activeAssignments < room.capacity) {
      room.status = 'partial';
    }
    await room.save();

    res.json({ msg: 'Access revoked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Create a room
// @route   POST /api/rooms
export const createRoom = async (req, res) => {
  const { roomNumber, capacity } = req.body;
  try {
    const newRoom = new Room({ roomNumber, capacity });
    const room = await newRoom.save();
    res.json(room);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Assign a student to a room
// @route   POST /api/rooms/assign
export const assignRoom = async (req, res) => {
  const { userId, email, roomId } = req.body;
  try {
    let user;
    if (userId) {
      user = await User.findById(userId);
    } else if (email) {
      user = await User.findOne({ email, role: 'student' });
    }

    if (!user) return res.status(404).json({ msg: 'Student not found' });

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ msg: 'Room not found' });

    // Check if student already has an active room
    const existingAssignment = await RoomAssignment.findOne({ user: user._id, status: 'active' });
    if (existingAssignment) {
      return res.status(400).json({ msg: 'Student is already assigned to a room' });
    }

    const activeAssignments = await RoomAssignment.countDocuments({ room: roomId, status: 'active' });
    if (activeAssignments >= room.capacity) {
      return res.status(400).json({ msg: 'Room is full' });
    }

    const assignment = new RoomAssignment({ user: user._id, room: roomId });
    await assignment.save();

    // Update room status
    const newActiveCount = activeAssignments + 1;
    if (newActiveCount === room.capacity) {
      room.status = 'occupied';
    } else {
      room.status = 'partial';
    }
    await room.save();

    res.json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Get student's active room
// @route   GET /api/rooms/my-room
export const getMyRoom = async (req, res) => {
  try {
    const assignment = await RoomAssignment.findOne({ user: req.user.id, status: 'active' }).populate('room');
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
