// routes/quizRoutes.js
const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const questionController = require("../controllers/questionController");

router.get("/", quizController.getAllQuizzes);               
router.get("/:quizId", quizController.getQuizById);         
router.post("/", quizController.createQuiz);                 
router.put("/:quizId", quizController.updateQuiz);          
router.delete("/:quizId", quizController.deleteQuiz); 
router.post('/:quizId/question', quizController.addQuestionToQuiz);      

module.exports = router;