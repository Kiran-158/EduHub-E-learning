// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PdfListPage from './pages/PdfListPage';
import AdminLogin from './pages/adminLogin';
import AdminDashboard from './pages/Admindashboard';
import ProtectedRoute from './components/ProtectedRoute';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import QuizPage from './pages/QuizPage';
import QuizSetupPage from './pages/QuizSetupPage'; // Import new page
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <main className="main-content">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/notes" element={<PdfListPage category="notes" />} />
                        <Route path="/question-papers" element={<PdfListPage category="question-papers" />} />
                        
                        {/* Auth Routes */}
                        <Route path="/login" element={<UserLogin />} />
                        <Route path="/register" element={<UserRegister />} />
                        <Route path="/admin/login" element={<AdminLogin />} />

                        {/* User Protected Routes */}
                        <Route
                            path="/quiz/setup"
                            element={
                                <ProtectedRoute adminOnly={false}>
                                    <QuizSetupPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/quiz"
                            element={
                                <ProtectedRoute adminOnly={false}>
                                    <QuizPage />
                                </ProtectedRoute>
                            }
                        />
                        
                        {/* Admin Protected Route */}
                        <Route
                            path="/admin/dashboard"
                            element={
                                <ProtectedRoute adminOnly={true}>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;