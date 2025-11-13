// routes/adminRoutes.js
const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const router = express.Router();

// POST /api/admin/register (for initial setup)
// router.post('/register', registerAdmin);
// POST /api/admin/login
router.post('/login', loginAdmin);

module.exports = router;