const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

//Ensures that the questions field will always be an empty array if there is no value
quizSchema.pre('save', function(next) {
    if (!this.questions) {
        this.questions = [];
    }
    next();
});

module.exports = mongoose.model('Quiz', quizSchema);