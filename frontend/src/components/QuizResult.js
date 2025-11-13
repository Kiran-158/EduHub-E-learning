// frontend/src/components/QuizResult.js

import React from 'react';
import './QuizResult.css';

const QuizResult = ({ questions, userAnswers, onRestart }) => {
    const score = userAnswers.reduce((acc, answer, index) => {
        return answer === questions[index].correctAnswerIndex ? acc + 1 : acc;
    }, 0);

    return (
        <div className="result-container">
            <h2>Quiz Complete!</h2>
            <div className="final-score">Your Score: {score} / {questions.length}</div>
            
            <div className="review-section">
                <h3>Review Your Answers</h3>
                {questions.map((q, index) => {
                    const userAnswerIndex = userAnswers[index];
                    const correctAnswerIndex = q.correctAnswerIndex;
                    const isCorrect = userAnswerIndex === correctAnswerIndex;

                    return (
                        <div key={q._id} className="review-question">
                            <h4>{index + 1}. {q.questionText}</h4>
                            <ul>
                                {q.options.map((option, i) => (
                                    <li key={i} 
                                        className={`
                                            ${i === correctAnswerIndex ? 'correct' : ''}
                                            ${i === userAnswerIndex && !isCorrect ? 'incorrect' : ''}
                                        `}>
                                        {option}
                                    </li>
                                ))}
                            </ul>
                            {userAnswerIndex == null ? <p className="your-choice">You did not answer this question.</p> : !isCorrect && (
                                <p className="your-choice">Your answer: "{q.options[userAnswerIndex]}"</p>
                            )}
                        </div>
                    );
                })}
            </div>

            <button onClick={onRestart} className="restart-button">Take Another Quiz</button>
        </div>
    );
};

export default QuizResult;