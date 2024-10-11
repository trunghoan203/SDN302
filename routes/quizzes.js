const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Route to get all quizzes
router.get('/', quizController.getQuizzes);
// Route to get a specific quiz by its ID
router.get('/:quizId', quizController.getQuizById);
// Route to create a new quiz
router.post('/', quizController.createQuiz);
// Route to update an existing quiz by its ID
router.put('/:quizId', quizController.updateQuiz);
// Route to delete a quiz by its ID
router.delete('/:quizId', quizController.deleteQuiz);
// Route to add a question to a specific quiz by its ID
router.post('/:quizId/question', quizController.addQuestionToQuiz);

module.exports = router;