const express = require('express');
const connectDB = require('./database/db');
const quizzesRouter = require('./routes/quizzes');
const questionsRouter = require('./routes/questions');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use('/quizzes', quizzesRouter);
app.use('/questions', questionsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));