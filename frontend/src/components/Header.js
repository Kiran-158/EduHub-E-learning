// components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">EduHub</Link>
            </div>
            <nav>
                <Link to="/notes">Notes</Link>
                <Link to="/question-papers">Question Papers</Link>
                {token ? (
                    <>
                        <Link to="/admin/dashboard">Dashboard</Link>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </>
                ) : (
                    <Link to="/admin/login">Admin Login</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;