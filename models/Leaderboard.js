const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    contestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    timeTaken: { type: Number }, // in seconds
    completedAt: { type: Date, default: Date.now },
    correctAnswers: { type: Number },
    totalQuestions: { type: Number },
});

// Add index for faster querying
leaderboardSchema.index({ contestId: 1, score: -1 });

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
