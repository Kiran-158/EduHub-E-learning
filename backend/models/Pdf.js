// models/Pdf.js
const mongoose = require('mongoose');

const PdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['notes', 'question-papers'], required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pdf', PdfSchema);