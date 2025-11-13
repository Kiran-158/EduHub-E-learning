// controllers/adminController.js
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// NOTE: In a real app, registration should be a one-time script or secured.
exports.registerAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.create({ username, password });
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering admin", error });
    }
};

exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin || !(await admin.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};