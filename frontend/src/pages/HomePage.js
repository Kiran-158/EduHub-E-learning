// pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the EduHub-E Learning</h1>
            <p>Select a category to view the documents.</p>
            <div className="category-links">
                <Link to="/notes" className="category-link">
                    <h2>View Notes</h2>
                </Link>
                <Link to="/question-papers" className="category-link">
                    <h2>View Question Papers</h2>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;