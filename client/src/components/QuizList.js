import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';

const quizList = ({ quizzes, onQuizDeleted, onQuizSelect }) => {
    const handleDelete = async (quizId) => {
        try {
            await axios.delete(`https://sdn302-mmoo.onrender.com/quizzes/${quizId}`);
            onQuizDeleted(quizId); // Notify parent component of the deleted quiz
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    return (
        <div>
            <h2>Quiz List</h2>
            <List>
                {quizzes.map((quiz) => (
                    <ListItem key={quiz._id} onClick={() => onQuizSelect(quiz)} style={{
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        margin: '10px 0',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        backgroundColor: '#f9f9f9',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 

                       
                    }}>
                        <ListItemText primary={quiz.title}  />
                        <Button onClick={() => handleDelete(quiz._id)} color="secondary">
                            Delete
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default quizList;