const Question = require('../models/question');
// Create a new question
exports.createQuestion = async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).json(question); // Respond with created status
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle errors
    }
};

// Delete a question by ID
exports.deleteQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        await Question.findByIdAndDelete(questionId);
        res.json({ message: 'Question deleted' });
    } catch (error) {
        res.status(404).json({ error: 'Question not found' });
    }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// update questions
exports.updateQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;

        // Find the question by ID and update it with the provided data
        const question = await Question.findByIdAndUpdate(
            questionId,
            req.body, // The data to update comes from the request body
            { new: true, runValidators: true } // Return the updated question and run validators
        );

        // Check if the question was found
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.json(question); // Respond with the updated question
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
};