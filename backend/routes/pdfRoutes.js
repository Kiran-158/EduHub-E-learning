// routes/pdfRoutes.js
const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { uploadPdf, getPdfsByCategory, getAllPdfs, deletePdf } = require('../controllers/pdfController');
const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/files');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// POST /api/pdfs/upload - Protected
router.post('/upload', protect, upload.single('file'), uploadPdf);

// GET /api/pdfs/all - Protected (for admin dashboard)
router.get('/all', protect, getAllPdfs);

// GET /api/pdfs/:category - Public
router.get('/:category', getPdfsByCategory);

// DELETE /api/pdfs/:id - Protected
router.delete('/:id', protect, deletePdf);

module.exports = router;