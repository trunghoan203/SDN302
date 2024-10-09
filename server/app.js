const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const connectDB = require("./database/db");
const quizRoutes = require("./routes/quizRoutes");
const questionRoutes = require("./routes/questionRoutes");
const dotenv = require('dotenv');
const cors = require('cors');
const exphbs = require('express-handlebars');

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

// Kết nối MongoDB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public')); // Serve static files

// Set up Handlebars as the main view engine
app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: 'main.hbs',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');

app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');

// Routes
app.use("/quizzes", quizRoutes);
app.use("/questions", questionRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});