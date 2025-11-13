// components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    
    const adminToken = localStorage.getItem('token');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleAdminLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };
    
    const handleUserLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
        window.location.reload(); // To ensure header updates
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">EduHub</Link>
            </div>
            <nav>
                <Link to="/notes">Notes</Link>
                <Link to="/question-papers">Question Papers</Link>

                {/* If user is logged in */}
                {userInfo && (
                    <>
                        <Link to="/quiz">Quiz</Link>
                        <span className="welcome-user">Welcome, {userInfo.name}</span>
                        <button onClick={handleUserLogout} className="logout-button">Logout</button>
                    </>
                )}

                {/* If admin is logged in */}
                {adminToken && (
                     <>
                        <Link to="/admin/dashboard">Dashboard</Link>
                        <button onClick={handleAdminLogout} className="logout-button">Logout</button>
                    </>
                )}
                
                {/* If no one is logged in */}
                {!userInfo && !adminToken && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/admin/login">Admin Login</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;