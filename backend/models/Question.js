// backend/models/Question.js

const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true },
  category: { type: String, required: true, lowercase: true },
});

module.exports = mongoose.model('Question', QuestionSchema);