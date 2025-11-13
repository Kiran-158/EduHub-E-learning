// // server.js
// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const path = 'path';
// const connectDB = require('./config/db');

// // server.js (add these lines)
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/quiz', require('./routes/quizRoutes'));

// // Load env vars
// dotenv.config();

// // Connect to database
// connectDB();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve static files (the uploaded PDFs)
// app.use('/files', express.static('public/files'));

// // Define Routes
// app.use('/api/admin', require('./routes/adminRoutes'));
// app.use('/api/pdfs', require('./routes/pdfRoutes'));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = 'path';
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express(); // ✅ define app before using it

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/quiz', require('./routes/quizRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/pdfs', require('./routes/pdfRoutes'));

// Serve static files (the uploaded PDFs)
app.use('/files', express.static('public/files'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
