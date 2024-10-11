const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }] 
});


quizSchema.pre('save', function(next) {
    if (!this.questions) {
        this.questions = [];
    }
    next();
});

module.exports = mongoose.model('Quiz', quizSchema);