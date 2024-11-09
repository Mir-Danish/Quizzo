const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    option1: { type: String, required: true },
    option2: { type: String, required: true },
    option3: { type: String, required: true },
    option4: { type: String, required: true },
    difficulty:{ type: String, required: true},
    correctOption: { type: Number, required: true }, // This is how you define a number type in Mongoose
    category: { type: String, required: true } // To categorize questions
});

const Question = mongoose.model("Questions", questionSchema);

module.exports = Question;