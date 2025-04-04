const mongoose = require("mongoose");

const contestScoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo',  // Reference to your User model
        required: true
    },
    contestId: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add index for faster querying
contestScoreSchema.index({ userId: 1, contestId: 1 });

const ContestScore = mongoose.model("ContestScore", contestScoreSchema);

module.exports = ContestScore;
