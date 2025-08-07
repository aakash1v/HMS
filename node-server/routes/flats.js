const express = require('express');
const router = express.Router();
const flatController = require('../controllers/flatController');

// GET all flats
router.get('/', flatController.getFlats);

// POST a new flat
router.post('/', flatController.createFlat);

router.get('/:flatNo', flatController.getFlatById);
router.get('/:flatNo/rooms/:roomNo', flatController.getRoomByNumber);
router.put('/:flatNo/rooms/:roomNo/slots/:slotNo', flatController.assignStudentToSlot);
router.get('/:flatNo/rooms/:roomNo/slots/:slotNo', flatController.getSlotByNumber);

module.exports = router;

