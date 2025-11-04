// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows requests from other origins (like your Angular app)
app.use(express.json()); // Allows us to parse JSON in request bodies

// --- MongoDB Connection ---
const mongoURI = process.env.MONGO_URI; // Get your connection string
mongoose.connect(mongoURI);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// --- Simple Test Route ---
app.get('/', (req, res) => {
  res.send('Hello from the Todo API!');
});




// ... after the 'app.get('/')' test route

// --- API Routes ---
// Import the routes file
const todoRouter = require('./routes/todo.routes');

// Tell the app to use these routes
// All routes in todoRouter will be prefixed with /api/todos
app.use('/api/todos', todoRouter);

// --- Auth Routes ---
const authRouter = require('./routes/auth.routes');
app.use('/api/auth', authRouter); // All auth routes will start with /api/auth


// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});