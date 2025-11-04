const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This is our "advanced" schema
const todoSchema = new Schema({
user: {
    type: Schema.Types.ObjectId, // This is how we store a user's ID
    ref: 'User', // This links it to the 'User' model
    required: true
  },

  taskName: {
    type: String,
    required: true, // taskName is required
    trim: true      // Removes whitespace from both ends
  },
  isCompleted: {
    type: Boolean,
    default: false // New tasks are not completed by default
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'], // Only allows these 3 values
    default: 'Medium'
  },
  dueDate: {
    type: Date,
    default: null // Optional due date
  }
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;