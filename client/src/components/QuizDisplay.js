import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';

const QuizDisplay = ({ quiz, onQuizUpdated, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false); 
    const [title, setTitle] = useState(quiz.title); 
    const [description, setDescription] = useState(quiz.description); 

    const handleUpdate = async () => {
        try {
            const updatedQuiz = { title, description };

            const response = await axios.put(`https://sdn302-mmoo.onrender.com/quizzes/${quiz._id}`, updatedQuiz);

            onQuizUpdated(response.data);

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating quiz:', error);
        }
    };

    return (
        <Box>
            {isEditing ? (
                <Box>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button onClick={handleUpdate} variant="contained" color="primary">
                        update
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="contained" color="secondary">
                        Cancel
                    </Button>
                </Box>
            ) : (
                <Box>
                    <Typography variant="h6">{quiz.title}</Typography>
                    <Typography>{quiz.description}</Typography>
                    <Button onClick={() => setIsEditing(true)} variant="contained" color="primary">
                        Edit
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default QuizDisplay;