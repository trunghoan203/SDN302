const Quiz = require('../models/quiz');
const Question = require('../models/question');


exports.getQuizzes = async (req, res) => {
    const quizzes = await Quiz.find().populate('questions');
    res.json(quizzes);
};

exports.getQuizById = async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizId).populate('questions');
    res.json(quiz);
};

exports.createQuiz = async (req, res) => {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.json(quiz);
};
exports.updateQuiz = async (req, res) => {
    try {
        // Tìm quiz theo quizId và cập nhật các trường dữ liệu
        const quiz = await Quiz.findByIdAndUpdate(
            req.params.quizId,
            req.body, // Dữ liệu cập nhật được truyền từ body của request
            { new: true, runValidators: true } // `new: true` để trả về bản cập nhật, `runValidators: true` để đảm bảo validation
        );

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.json(quiz); // Trả về quiz đã cập nhật
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteQuiz = async (req, res) => {
    await Quiz.findByIdAndDelete(req.params.quizId);
    res.json({ message: 'Quiz deleted' });
};

exports.addQuestionToQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Kiểm tra nếu trường questions chưa được khởi tạo, khởi tạo nó là mảng rỗng
        if (!quiz.questions) {
            quiz.questions = [];
        }

        // Tạo câu hỏi mới từ body của request
        const question = new Question(req.body);
        await question.save(); // Lưu câu hỏi vào database

        // Thêm ID của câu hỏi vào mảng questions của quiz
        quiz.questions.push(question._id);
        await quiz.save(); // Cập nhật quiz trong database

        res.json(quiz); // Trả về quiz đã cập nhật với câu hỏi mới
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};