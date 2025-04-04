const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    maxParticipants: { type: Number },
    prizesDescription: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contest', contestSchema);