
const express = require('express');
const router = express.Router();

const studentRoutes = require('./students');
const flatRoutes = require('./flats');

// Mount sub-routers
router.use('/students', studentRoutes); // /api/students
router.use('/flats', flatRoutes);       // /api/flats

module.exports = router;
