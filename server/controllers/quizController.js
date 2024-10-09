const Quiz = require("../models/quizModel");
const Question = require('../models/question');

exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate("questions");
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getQuizById = async (req, res) => {

    try {
        const quiz = await Quiz.findById(req.params.quizId).populate('questions');
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createQuiz = async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.json(quiz);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateQuiz = async (req, res) => {
    try {
        // Find the quiz by ID and update it
        const quiz = await Quiz.findByIdAndUpdate(
            req.params.quizId,
            req.body, 
            { new: true, runValidators: true }
        );
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        //Return updated quiz
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
// DELETE: Xóa quiz
exports.deleteQuiz = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.quizId);
    res.json({ message: 'Quiz deleted' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

exports.addQuestionToQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
  
        if (!quiz.questions) {
            quiz.questions = [];
        }
  
        const question = new Question(req.body);
        await question.save(); 
  
        quiz.questions.push(question._id);
        await quiz.save(); 
        res.json(quiz); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };