// backend/seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Question = require('./models/Question');

// Import questions from all the separate files
const mathsQuestions = require('./data/maths');
const scienceQuestions = require('./data/science');
const englishQuestions = require('./data/english');
const socialQuestions = require('./data/social');
const historyQuestions = require('./data/history');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Combine all questions into one big array
        const allQuestions = [
            ...mathsQuestions,
            ...scienceQuestions,
            ...englishQuestions,
            ...socialQuestions,
            ...historyQuestions,
        ];

        // Clear existing questions to avoid duplicates
        await Question.deleteMany();

        // Insert the new combined list of questions
        await Question.insertMany(allQuestions);

        console.log('✅ Data Imported Successfully!');
        console.log(`Total questions added: ${allQuestions.length}`);
        process.exit();
    } catch (error) {
        console.error(`❌ Error importing data: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Question.deleteMany();
        console.log('✅ Data Destroyed Successfully!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error destroying data: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}