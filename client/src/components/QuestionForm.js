import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Snackbar, Alert } from '@mui/material';
import '../style/questionForm.css';

const QuestionForm = ({ onQuestionAdded }) => {
    const [text, setText] = useState('');
    const [optionsString, setOptionsString] = useState(''); 
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = optionsString.split(',').map(option => option.trim()); 

        try {
            const response = await axios.post('https://sdn302-mmoo.onrender.com/questions', {
                text,
                options,
                correctAnswerIndex,
            });
            onQuestionAdded(response.data); 
            setSnackbarMessage('Question added successfully!');
            setOpenSnackbar(true);
            // Reset form
            setText('');
            setOptionsString(''); 
            setCorrectAnswerIndex(0);
        } catch (error) {
            console.error('Error adding question:', error);
            setSnackbarMessage('Failed to add question.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <form onSubmit={handleSubmit} className="question-form">
            <div className="form-field">
                <TextField
                    label="Question Text"
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    fullWidth
                />
            </div>
            <div className="form-field">
                <TextField
                    label="Options (separated by commas)"
                    variant="outlined"
                    value={optionsString}
                    onChange={(e) => setOptionsString(e.target.value)}
                    required
                    fullWidth
                />
            </div>
            <div className="form-field">
                <TextField
                    type="number"
                    label="Correct Answer Index"
                    value={correctAnswerIndex}
                    onChange={(e) => setCorrectAnswerIndex(parseInt(e.target.value))}
                    required
                    fullWidth
                />
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Question
            </Button>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default QuestionForm;