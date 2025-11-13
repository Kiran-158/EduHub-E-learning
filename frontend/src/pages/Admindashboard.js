// frontend/src/pages/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admindashboard.css';

const QUIZ_CATEGORIES = ["maths", "science", "english", "social", "history"];

const AdminDashboard = () => {
    // PDF State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('notes');
    const [file, setFile] = useState(null);
    const [pdfs, setPdfs] = useState([]);
    
    // Quiz State
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
    const [questionCategory, setQuestionCategory] = useState(QUIZ_CATEGORIES[0]);

    // General State
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchPdfs = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('/api/pdfs/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPdfs(data);
        } catch (err) {
            setError('Failed to fetch PDFs.');
        }
    };

    useEffect(() => {
        fetchPdfs();
    }, []);

    const clearMessages = () => {
        setError('');
        setSuccess('');
    };

    // PDF Handlers
    const handlePdfUpload = async (e) => {
        e.preventDefault();
        clearMessages();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('file', file);

        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/pdfs/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccess('PDF uploaded successfully!');
            setTitle('');
            setFile(null);
            document.getElementById('file-input').value = null;
            fetchPdfs();
        } catch (err) {
            setError('PDF upload failed. Please try again.');
        }
    };

    const handlePdfDelete = async (id) => {
        clearMessages();
        if (window.confirm('Are you sure you want to delete this PDF?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`/api/pdfs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSuccess('PDF deleted successfully!');
                fetchPdfs();
            } catch (err) {
                setError('PDF deletion failed. Please try again.');
            }
        }
    };

    // Quiz Handlers
    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleQuestionSubmit = async (e) => {
        e.preventDefault();
        clearMessages();
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/quiz', {
                questionText,
                options,
                correctAnswerIndex,
                category: questionCategory
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess('Question added successfully!');
            setQuestionText('');
            setOptions(['', '', '', '']);
            setCorrectAnswerIndex(0);
        } catch (err) {
            setError('Failed to add question.');
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Admin Dashboard</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            {/* PDF Upload Form */}
            <div className="upload-form-container">
                <h3>Upload New PDF</h3>
                <form onSubmit={handlePdfUpload}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="notes">Notes</option>
                            <option value="question-papers">Question Papers</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>PDF File</label>
                        <input id="file-input" type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} required />
                    </div>
                    <button type="submit">Upload PDF</button>
                </form>
            </div>

            {/* PDF List */}
            <div className="pdf-list-admin">
                <h3>Manage Existing PDFs</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pdfs.map(pdf => (
                            <tr key={pdf._id}>
                                <td>{pdf.title}</td>
                                <td>{pdf.category}</td>
                                <td><button onClick={() => handlePdfDelete(pdf._id)} className="delete-btn">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Quiz Management Form */}
            <div className="upload-form-container">
                <h3>Add New Quiz Question</h3>
                <form onSubmit={handleQuestionSubmit}>
                    <div className="form-group">
                        <label>Category</label>
                        <select value={questionCategory} onChange={(e) => setQuestionCategory(e.target.value)}>
                            {QUIZ_CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Question</label>
                        <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} required />
                    </div>
                    {options.map((option, index) => (
                        <div className="form-group" key={index}>
                            <label>Option {index + 1}</label>
                            <input type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} required />
                        </div>
                    ))}
                    <div className="form-group">
                        <label>Correct Answer</label>
                        <select value={correctAnswerIndex} onChange={(e) => setCorrectAnswerIndex(e.target.value)}>
                            <option value={0}>Option 1</option>
                            <option value={1}>Option 2</option>
                            <option value={2}>Option 3</option>
                            <option value={3}>Option 4</option>
                        </select>
                    </div>
                    <button type="submit">Add Question</button>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;