const jwt = require('jsonwebtoken');

// The same secret from auth.controller.js
const JWT_SECRET = 'My-very-super-secret-key-that-is-at-least-32-chars-long';

const authMiddleware = (req, res, next) => {
  // 1. Get token from the 'Authorization' header
  // It's sent as "Bearer <token>"
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Get just the token part

  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 3. Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // 4. Add user from payload to the request object
    // Now our controllers will know who the user is!
    req.user = decoded; 

    next(); // Move on to the next function (the controller)
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;