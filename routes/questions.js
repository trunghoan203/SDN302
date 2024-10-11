const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Route to create a new question
router.post('/', questionController.createQuestion);
// Route to delete a question by ID
router.delete('/:questionId', questionController.deleteQuestion);
// Route to get all questions
router.get('/', questionController.getAllQuestions);
// Route to update a question
router.put('/:questionId', questionController.updateQuestion);

module.exports = router;