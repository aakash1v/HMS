
const express = require('express');
const router = express.Router();

const studentRoutes = require('./students');
const flatRoutes = require('./nalanda_flats');

// Mount sub-routers
router.use('/students', studentRoutes); // /api/students
router.use('/nalanda/flats', flatRoutes);       // /api/flats

module.exports = router;
