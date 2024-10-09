import React from 'react';
import { List, ListItem, ListItemText, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import '../style/questionList.css';

const QuestionList = ({ questions, onQuestionDeleted, onQuestionSelect }) => {
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

    const handleDelete = async (questionId) => {
        try {
            await axios.delete(`https://sdn302-mmoo.onrender.com/questions/${questionId}`);
            onQuestionDeleted(questionId);
            setSnackbarMessage('Question deleted successfully!');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error deleting question:', error);
            setSnackbarMessage('Failed to delete question.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            <h2>Question List</h2>
            <List>
                {questions.map((question) => (
                    <ListItem key={question._id} style={{
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
                        <ListItemText
                            primary={question.text}
                            onClick={() => onQuestionSelect(question)}
                            style={{ cursor: 'pointer', color: 'blue' }}
                        />
                        <Button onClick={() => handleDelete(question._id)} color="warning">
                            Delete
                        </Button>
                    </ListItem>
                ))}
            </List>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default QuestionList;