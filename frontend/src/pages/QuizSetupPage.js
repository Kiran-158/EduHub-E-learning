// frontend/src/pages/QuizSetupPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizSetupPage.css';

const QUIZ_CATEGORIES = ["maths", "science", "english", "social", "history"];

const QuizSetupPage = () => {
    const [category, setCategory] = useState(QUIZ_CATEGORIES[0]);
    const [numQuestions, setNumQuestions] = useState(5);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/quiz', { state: { category, limit: numQuestions } });
    };

    return (
        <div className="quiz-setup-container">
            <form onSubmit={handleSubmit} className="quiz-setup-form">
                <h2>Setup Your Quiz</h2>
                <div className="form-group">
                    <label htmlFor="category">Select a Topic</label>
                    <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        {QUIZ_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="numQuestions">Number of Questions (1-20)</label>
                    <input
                        type="number"
                        id="numQuestions"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(e.target.value)}
                        min="1"
                        max="20"
                    />
                </div>
                <button type="submit">Start Quiz</button>
            </form>
        </div>
    );
};

export default QuizSetupPage;