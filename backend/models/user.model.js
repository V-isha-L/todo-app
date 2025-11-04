const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // No two users can have the same username
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

const User = mongoose.model('User', userSchema);

module.exports = User;