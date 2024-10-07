// app.js
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./database/db");
const quizRoutes = require("./routes/quizRoutes");
const questionRoutes = require("./routes/questionRoutes");

const app = express();
const PORT = process.env.PORT || 8000;
// Kết nối MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/quizzes", quizRoutes);
app.use("/questions", questionRoutes);

const Question = require('./models/questionModel');



app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});