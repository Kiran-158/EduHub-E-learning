// backend/routes/quizRoutes.js

const express = require('express');
const { createQuestion, deleteQuestion, startQuiz } = require('../controllers/quizController');
const { protectAdmin, protectUser } = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET /api/quiz/start -> Get questions for a specific quiz (User protected)
router.get('/start', protectUser, startQuiz);

// @route   POST /api/quiz -> Create a new question (Admin protected)
router.post('/', protectAdmin, createQuestion);

// @route   DELETE /api/quiz/:id -> Delete a question (Admin protected)
router.delete('/:id', protectAdmin, deleteQuestion);

module.exports = router;