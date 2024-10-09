import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionForm from './components/QuestionForm';
import QuestionList from './components/QuestionList';
import QuizForm from './components/QuizForm';
import QuizList from './components/QuizList';
import { Container, Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import DisplayQuestions from './components/DisplayQuestions';
import QuizDisplay from './components/QuizDisplay';

const App = () => {
    const [questions, setQuestions] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Fetch all questions
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://sdn302-mmoo.onrender.com/questions');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    // Fetch quizzes
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('https://sdn302-mmoo.onrender.com/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleUpdateQuestion = async (updatedQuestion) => {
        try {
            await axios.put(`https://sdn302-mmoo.onrender.com/questions/${updatedQuestion._id}`, updatedQuestion);
            setQuestions((prevQuestions) =>
                prevQuestions.map((question) =>
                    question._id === updatedQuestion._id ? updatedQuestion : question
                )
            );
            setSelectedQuestion(null); // Reset selected question
            setSnackbarMessage('Question updated successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error updating question:', error);
            setSnackbarMessage('Failed to update question.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleQuestionAdded = (newQuestion) => {
        setQuestions([...questions, newQuestion]);
        setFormVisible(false);
        setSnackbarMessage('Question added successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    const handleQuestionDeleted = (deletedQuestionId) => {
        setQuestions(questions.filter((question) => question._id !== deletedQuestionId));
        setSnackbarMessage('Question deleted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    const handleQuestionSelect = (question) => {
        setSelectedQuestion(question);
    };

    const handleQuizAdded = (newQuiz) => {
        setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);
        setSnackbarMessage('Quiz added successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    const handleQuizUpdated = (updatedQuiz) => {
        setQuizzes((prevQuizzes) =>
            prevQuizzes.map((quiz) => (quiz._id === updatedQuiz._id ? updatedQuiz : quiz))
        );
        setSelectedQuiz(updatedQuiz);
        setSnackbarMessage('Quiz updated successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    const handleQuizDeleted = (quizId) => {
        setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
        setSelectedQuiz(null);
        setSnackbarMessage('Quiz deleted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    const handleQuizSelect = (quiz) => {
        setSelectedQuiz(quiz);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h5" gutterBottom>Quiz App</Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => setFormVisible(!isFormVisible)}
                >
                    {isFormVisible ? 'Cancel' : 'Create New Question'}
                </Button>

                {isFormVisible && <QuestionForm onQuestionAdded={handleQuestionAdded} />}

                <QuestionList 
                    questions={questions} 
                    onQuestionDeleted={handleQuestionDeleted} 
                    onQuestionSelect={handleQuestionSelect} 
                />
                
                {selectedQuestion && (
                    <DisplayQuestions
                        question={selectedQuestion} 
                        onUpdateQuestion={handleUpdateQuestion} 
                    />
                )}

                <Typography variant="h4" gutterBottom>Quiz Management</Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : 'Create Quiz'}
                </Button>

                {showForm && <QuizForm onQuizAdded={handleQuizAdded} />}
                <QuizList quizzes={quizzes} onQuizDeleted={handleQuizDeleted} onQuizSelect={handleQuizSelect} />

                {selectedQuiz && (
                    <QuizDisplay
                        quiz={selectedQuiz}
                        onQuizUpdated={handleQuizUpdated}
                        onDelete={() => handleQuizDeleted(selectedQuiz._id)}
                    />
                )}
            </Box>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default App;