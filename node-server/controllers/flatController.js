const Flat = require('../models/Flat');
const Student = require('../models/Student');

// GET all flats
exports.getFlats = async (req, res) => {
  try {
    const flats = await Flat.find();
    res.json(flats);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// POST /api/flats
exports.createFlat = async (req, res) => {
  try {
    const flat = new Flat(req.body);
    await flat.save();
    res.status(201).json(flat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/flats/:flatNo
exports.getFlatById = async (req, res) => {
  const { flatNo } = req.params;

  try {
    const flat = await Flat.findOne({ flat_no: flatNo });

    if (!flat) {
      return res.status(404).json({ error: 'Flat not found' });
    }

    res.json(flat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/flats/:flatNo/rooms/:roomNo
exports.getRoomByNumber = async (req, res) => {
  const { flatNo, roomNo } = req.params;

  try {
    const flat = await Flat.findOne({ flat_no: flatNo })
      .populate({
        path: 'rooms.slots.student',
        model: 'Student',
      });

    if (!flat) return res.status(404).json({ error: 'Flat not found' });

    const room = flat.rooms.find((r) => r.room_no === roomNo);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT /api/flats/:flatNo/rooms/:roomNo/slots/:slotNo
exports.assignStudentToSlot = async (req, res) => {
  const { flatNo, roomNo, slotNo } = req.params;
  const { studentId } = req.body;

  try {
    const flat = await Flat.findOne({ flat_no: flatNo });
    if (!flat) return res.status(404).json({ error: 'Flat not found' });

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const room = flat.rooms.find((r) => r.room_no === roomNo);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const slot = room.slots.find((s) => s.slot_no == slotNo);
    if (!slot) return res.status(404).json({ error: 'Slot not found' });

    slot.student = studentId;
    await flat.save();

    res.json({ message: 'Student assigned successfully', flat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/flats/:flatNo/rooms/:roomNo/slots/:slotNo
exports.getSlotByNumber = async (req, res) => {
  const { flatNo, roomNo, slotNo } = req.params;

  try {
    const flat = await Flat.findOne({ flat_no: flatNo }).lean();
    if (!flat) return res.status(404).json({ error: 'Flat not found' });

    const room = flat.rooms.find((r) => r.room_no === roomNo);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const slot = room.slots.find((s) => s.slot_no == slotNo);
    if (!slot) return res.status(404).json({ error: 'Slot not found' });

    if (slot.student) {
      const student = await Student.findById(slot.student).lean();
      slot.student = student;
    }

    res.json(slot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

