const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

// Route to Get all questions
router.get("/", questionController.getAllQuestions);

// Route to Create a new question
router.post("/", questionController.createQuestion);

// Route to Update a question
router.put('/:questionId', questionController.updateQuestion);

// Route to Delete a question by ID
router.delete('/:questionId', questionController.deleteQuestion);

module.exports = router;