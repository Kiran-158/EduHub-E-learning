// frontend/src/pages/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return (
        <div className="home-container">
            <h1>Welcome to the EduHub</h1>
            <p>Select a category to view documents or take a quiz.</p>
            <div className="category-links">
                <Link to="/notes" className="category-link">
                    <h2>View Notes</h2>
                </Link>
                <Link to="/question-papers" className="category-link">
                    <h2>View Question Papers</h2>
                </Link>
                <Link to={userInfo ? "/quiz/setup" : "/login"} className="category-link quiz-link">
                    <h2>Take a Quiz</h2>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;