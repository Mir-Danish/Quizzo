const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Question = require("./models/questionDetail"); // Import your Question model

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Read the JSON file
const loadQuestions = async () => {
    try {
        const data = fs.readFileSync("questions.json", "utf-8"); // Adjust the path if necessary
        const questions = JSON.parse(data); // Parse the JSON data

        // Insert questions into the database
        await Question.insertMany(questions);
        console.log("Questions inserted successfully!");
    } catch (error) {
        console.error("Error inserting questions:", error);
    } finally {
        mongoose.connection.close(); // Close the connection
    }
};

// Run the function
loadQuestions();