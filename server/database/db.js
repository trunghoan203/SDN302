const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://caotrunghoan2003:Trunghoan2003@mydatabase.jsczh.mongodb.net/?retryWrites=true&w=majority&appName=myDatabase");
        
        console.log("Connect MongoDB Successfully");
    } catch (error) {
        console.error("Connect MongoDB Fail:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;