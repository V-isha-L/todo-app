const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// A secret key for our JWT.
// In a real app, put this in your .env file!
const JWT_SECRET = 'My-very-super-secret-key-that-is-at-least-32-chars-long';

// --- 1. SIGN UP (Register a new user) ---
// @route   POST /api/auth/signup
const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // --- Validation ---
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // --- Check for existing user ---
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // --- Hash the password ---
    const salt = await bcrypt.genSalt(10); // "salt" adds random data
    const hashedPassword = await bcrypt.hash(password, salt);

    // --- Create and save new user ---
    const newUser = new User({
      username,
      password: hashedPassword // Save the HASHED password
    });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User created successfully!',
      userId: savedUser._id,
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// --- 2. LOG IN (Sign in an existing user) ---
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // --- Validation ---
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    // --- Find user in DB ---
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // --- Check password ---
    // Compare the plain-text password (req.body.password) 
    // with the hashed password in the DB (user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // --- User is valid! Create a JWT Token ---
    const token = jwt.sign(
      { id: user._id, username: user.username }, // This is the "payload"
      JWT_SECRET,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    // --- Send token back to user ---
    res.json({
      message: 'Logged in successfully!',
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


module.exports = {
  signup,
  login
};