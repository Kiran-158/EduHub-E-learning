// controllers/pdfController.js
const Pdf = require('../models/Pdf');
const fs = require('fs');
const path = require('path');

exports.uploadPdf = async (req, res) => {
    const { title, category } = req.body;
    const filename = req.file.filename;
    const filePath = `/files/${filename}`;

    try {
        const newPdf = await Pdf.create({ title, category, filename, path: filePath });
        res.status(201).json(newPdf);
    } catch (error) {
        res.status(500).json({ message: "Error uploading PDF", error });
    }
};

exports.getPdfsByCategory = async (req, res) => {
    try {
        const pdfs = await Pdf.find({ category: req.params.category }).sort({ createdAt: -1 });
        res.json(pdfs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching PDFs", error });
    }
};

exports.getAllPdfs = async (req, res) => {
    try {
        const pdfs = await Pdf.find({}).sort({ createdAt: -1 });
        res.json(pdfs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching PDFs", error });
    }
};

exports.deletePdf = async (req, res) => {
    try {
        const pdf = await Pdf.findById(req.params.id);
        if (!pdf) {
            return res.status(404).json({ message: 'PDF not found' });
        }
        // Delete file from the filesystem
        const filePath = path.join(__dirname, '..', 'public', 'files', pdf.filename);
        fs.unlink(filePath, async (err) => {
            if (err) {
                console.error("Error deleting file:", err);
                // Still proceed to delete from DB
            }
            await Pdf.findByIdAndDelete(req.params.id);
            res.json({ message: 'PDF deleted successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting PDF", error });
    }
};