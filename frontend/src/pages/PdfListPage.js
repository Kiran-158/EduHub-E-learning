// pages/PdfListPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PdfListPage.css';

const PdfListPage = ({ category }) => {
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/pdfs/${category}`);
                setPdfs(data);
                setError('');
            } catch (err) {
                setError('Failed to fetch PDFs. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPdfs();
    }, [category]);

    return (
        <div className="pdf-list-container">
            <h1>{category === 'notes' ? 'Notes' : 'Question Papers'}</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && pdfs.length === 0 && <p>No documents found in this category.</p>}
            <div className="pdf-grid">
                {pdfs.map((pdf) => (
                    <div key={pdf._id} className="pdf-card">
                        <h3>{pdf.title}</h3>
                        <div className="button-group">
                            <a href={`http://localhost:5000${pdf.path}`} target="_blank" rel="noopener noreferrer" className="btn view-btn">View</a>
                            <a href={`http://localhost:5000${pdf.path}`} download={pdf.title} className="btn download-btn">Download</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PdfListPage;