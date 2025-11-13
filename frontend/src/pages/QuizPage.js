// frontend/src/pages/QuizPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import QuizResult from '../components/QuizResult';
import './QuizPage.css';

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const { category, limit } = location.state || {};

    useEffect(() => {
        if (!category || !limit) {
            navigate('/quiz/setup');
            return;
        }

        const fetchQuestions = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                    params: { category, limit },
                };
                const { data } = await axios.get('/api/quiz/start', config);
                if (data.length === 0) {
                    setError(`No questions found for the category "${category}". Please ask the admin to add some.`);
                } else {
                    setQuestions(data);
                    setUserAnswers(Array(data.length).fill(null)); // Initialize answers array
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to load quiz. Please try again later.');
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [category, limit, navigate]);

    const handleAnswerClick = (selectedOptionIndex) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = selectedOptionIndex;
        setUserAnswers(newAnswers);

        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const handleRestart = () => {
        navigate('/quiz/setup');
    };

    if (loading) return <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>Loading Quiz...</p>;
    if (error) return <p className="error-message" style={{ textAlign: 'center' }}>{error}</p>;

    if (showScore) {
        return (
            <QuizResult 
                questions={questions} 
                userAnswers={userAnswers} 
                onRestart={handleRestart}
            />
        );
    }
    
    return (
        <div className="quiz-container">
            {questions.length > 0 && (
                <>
                    <div className="question-section">
                        <div className="question-count">
                            <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
                        </div>
                        <div className="question-text">{questions[currentQuestionIndex].questionText}</div>
                    </div>
                    <div className="answer-section">
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <button key={index} onClick={() => handleAnswerClick(index)}>
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default QuizPage;