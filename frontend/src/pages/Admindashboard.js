// pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admindashboard.css';

const AdminDashboard = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('notes');
    const [file, setFile] = useState(null);
    const [pdfs, setPdfs] = useState([]);
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

    const handleUpload = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

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
            document.getElementById('file-input').value = null; // Reset file input
            fetchPdfs(); // Refresh the list
        } catch (err) {
            setError('Upload failed. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this PDF?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`/api/pdfs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSuccess('PDF deleted successfully!');
                fetchPdfs(); // Refresh the list
            } catch (err) {
                setError('Deletion failed. Please try again.');
            }
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Admin Dashboard</h2>

            {/* Upload Form */}
            <div className="upload-form-container">
                <h3>Upload New PDF</h3>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form onSubmit={handleUpload}>
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
                    <button type="submit">Upload</button>
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
                                <td>
                                    <button onClick={() => handleDelete(pdf._id)} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;