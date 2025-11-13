// backend/controllers/quizController.js

const Question = require('../models/Question');

// @desc    Get randomized questions for a specific quiz session
// @route   GET /api/quiz/start
exports.startQuiz = async (req, res) => {
    const { category, limit } = req.query; // e.g., ?category=maths&limit=5
    
    if (!category || !limit) {
        return res.status(400).json({ message: 'Category and limit are required' });
    }

    try {
        // Find all questions for the category
        const questions = await Question.find({ category });

        // Shuffle the array to get random questions
        const shuffled = questions.sort(() => 0.5 - Math.random());

        // Get the requested number of questions
        const selected = shuffled.slice(0, Number(limit));

        res.json(selected);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// @desc    Create a new question (Admin only)
// @route   POST /api/quiz
exports.createQuestion = async (req, res) => {
    const { questionText, options, correctAnswerIndex, category } = req.body;
    try {
        const newQuestion = new Question({
            questionText,
            options,
            correctAnswerIndex,
            category
        });
        const createdQuestion = await newQuestion.save();
        res.status(201).json(createdQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Error creating question', error });
    }
};

// @desc    Delete a question (Admin only)
// @route   DELETE /api/quiz/:id
exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (question) {
            await question.deleteOne();
            res.json({ message: 'Question removed' });
        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting question', error });
    }
};