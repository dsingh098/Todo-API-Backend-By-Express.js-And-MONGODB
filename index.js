const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const todoRoutes = require('./routes/todos'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Use express.json() instead of bodyParser

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Routes
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
