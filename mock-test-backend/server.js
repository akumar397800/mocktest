const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const syllabusRoutes = require("./routes/syllabusRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors ());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tests', testRoutes);
app.use("/api/syllabus", syllabusRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
