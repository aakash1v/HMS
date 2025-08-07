// models/Flat.js
const mongoose = require('mongoose');


const slotSchema = new mongoose.Schema({
  slot_no: Number,
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    default: null,
  },
});

const roomSchema = new mongoose.Schema({
  room_no: String,
  room_capacity: Number,
  slots: [slotSchema]
});

const flatSchema = new mongoose.Schema({
  flat_no: String,
  rooms: [roomSchema]
});

module.exports = mongoose.model('Flat', flatSchema);

