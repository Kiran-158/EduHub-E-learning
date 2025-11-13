# EduHub: MERN PDF & Quiz Management System

EduHub is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) designed for educational content management. It provides a platform for students to access learning materials like notes and past question papers, and engage with interactive quizzes. It also features a secure admin dashboard for managing all content.

---

## Features

### Student / Public Features
- **Browse Content:** View categorized lists of "Notes" and "Question Papers".
- **PDF Viewer:** Open and view PDFs directly in the browser.
- **Download PDFs:** Download materials for offline use.
- **User Authentication:** Secure registration and login for students.
- **Interactive Quizzes:**
    - Select a topic (Maths, Science, History, etc.).
    - Choose the number of questions.
    - Receive a detailed score report with a review of correct and incorrect answers.

### Admin Features
- **Secure Admin Login:** Separate, protected login for administrators.
- **Content Management Dashboard:**
    - **Upload PDFs:** Add new notes or question papers with a title and category.
    - **Delete PDFs:** Remove outdated or incorrect materials.
- **Quiz Management:**
    - **Add Questions:** Create new quiz questions with multiple-choice options and assign them to a specific category.

---

## Technology Stack

### Backend
- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web framework for building the REST API.
- **MongoDB:** NoSQL database for storing user data, PDF metadata, and quiz questions.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
- **JSON Web Tokens (JWT):** For securing user and admin authentication.
- **Bcrypt.js:** For hashing passwords.
- **Multer:** Middleware for handling file uploads.

### Frontend
- **React.js:** JavaScript library for building the user interface.
- **React Router:** For client-side routing.
- **Axios:** For making HTTP requests to the backend API.
- **CSS:** Custom styling for a clean and responsive design.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v16 or later)
- npm (Node Package Manager)
- MongoDB (A local instance or a free cloud instance from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Git

### Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/EduHub-E-learning.git
   cd EduHub-E-learning
