const Question = require("../models/questionModel");
const Quiz = require("../models/quizModel"); 

//Get all Questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Create a new Question
exports.createQuestion = async (req, res) => {
  try {
      const question = new Question(req.body);
      await question.save();
      res.status(201).json(question); 
  } catch (error) {
      res.status(400).json({ error: error.message }); 
  }
};

// Update a Question
exports.updateQuestion = async (req, res) => {
  try {
      const { questionId } = req.params;
      
      // Find the question by ID and Update it
      const question = await Question.findByIdAndUpdate(
          questionId,
          req.body, 
          { new: true, runValidators: true } 
      );

      // Check if the question was found
      if (!question) {
          return res.status(404).json({ message: 'Question not found' });
      }

      res.json(question); 
  } catch (error) {
      res.status(500).json({ error: error.message }); 
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

// // /controllers/questionController.js
// exports.createMultipleQuestions = async (req, res) => {
//   const questions = req.body; // Mảng các câu hỏi

//   try {
//       const newQuestions = await Question.insertMany(questions);
//       res.status(201).json(newQuestions);
//   } catch (err) {
//       res.status(400).json({ message: err.message });
//   }
// };
// exports.createQuestionForQuiz = async (req, res) => {
//   const { quizId } = req.params;
//   const questionData = {
//       text: req.body.text,
//       options: req.body.options,
//       keywords: req.body.keywords,
//       correctAnswerIndex: req.body.correctAnswerIndex,
//   };

//   try {
//       const question = new Question(questionData);
//       const newQuestion = await question.save();

//       await Quiz.findByIdAndUpdate(quizId, { $push: { questions: newQuestion._id } });

//       res.status(201).json(newQuestion);
//   } catch (err) {
//       res.status(400).json({ message: err.message });
//   }
// };


// exports.createMultipleQuestionsForQuiz = async (req, res) => {
//   const { quizId } = req.params;
//   const questionsData = req.body; 

//   try {mutipleMongooseToObject  
//       const quiz = await Quiz.findById(quizId);
//       if (!quiz) {
//           return res.status(404).json({ message: "Quiz not found" });
//       }
//       const questions = await Question.insertMany(questionsData);
//       await Quiz.findByIdAndUpdate(
//           quizId,
//           { $push: { questions: { $each: questions.map(q => q._id) } } },
//           { new: true } 
//       );

//       res.status(201).json(questions); 
//   } catch (err) { 
//       res.status(400).json({ message: err.message });
//   }
// };