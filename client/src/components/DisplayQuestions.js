import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';

const DisplayQuestions = ({ question, onUpdateQuestion }) => {
    const [editing, setEditing] = useState(false);
    const [editedQuestion, setEditedQuestion] = useState({
        text: '',
        options: [],
        correctAnswerIndex: 0,
        _id: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (question) {
            setEditedQuestion(question);
        }
    }, [question]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedQuestion((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`https://sdn302-mmoo.onrender.com/questions/${editedQuestion._id}`, {
                text: editedQuestion.text,
                options: editedQuestion.options,
                correctAnswerIndex: editedQuestion.correctAnswerIndex
            });

            onUpdateQuestion(response.data); 
            setEditing(false);
        } catch (error) {
            setError('Failed to update the question. Please try again.');
            console.error(error);
        }
    };

    return (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
            {editing ? (
                <div>
                    <TextField
                        label="Question Text"
                        name="text"
                        value={editedQuestion.text}
                        onChange={handleEditChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Options (separated by comma)"
                        name="options"
                        value={editedQuestion.options.join(', ')}
                        onChange={(e) => handleEditChange({ target: { name: 'options', value: e.target.value.split(', ') } })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Correct Answer Index"
                        name="correctAnswerIndex"
                        type="number"
                        value={editedQuestion.correctAnswerIndex}
                        onChange={handleEditChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                    <Button variant="outlined" onClick={() => setEditing(false)}>
                        Cancel
                    </Button>
                    {error && <Typography color="error">{error}</Typography>}
                </div>
            ) : (
                <div>
                    {question && (
                        <div>
                            <Typography variant="h6">{question.text}</Typography>
                            <Typography variant="body1">Options:</Typography>
                            <ul>
                                {question.options.map((option, index) => (
                                    <li key={index}>
                                        <Typography variant="body2">{option}</Typography>
                                    </li>
                                ))}
                            </ul>
                            <Typography variant="body2">Correct Answer Index: {question.correctAnswerIndex}</Typography>
                            <Button variant="outlined" color="primary" onClick={() => setEditing(true)}>
                                Edit
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </Paper>
    );
};

export default DisplayQuestions;