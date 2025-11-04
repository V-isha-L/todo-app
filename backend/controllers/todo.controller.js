const Todo = require('../models/todo.model');

// --- 1. GET ALL TODOS ---
// Gets todos *only for the logged-in user*
const getAllTodos = async (req, res) => {
  try {
    // req.user.id comes from the authMiddleware
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 }); 
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- 2. CREATE NEW TODO ---
// Creates a todo *linked to the logged-in user*
const createTodo = async (req, res) => {
  const { taskName, priority, dueDate } = req.body;
  if (!taskName) {
    return res.status(400).json({ message: 'Task name is required' });
  }

  const newTodo = new Todo({
    user: req.user.id, // <-- Add the user ID
    taskName,
    priority,
    dueDate
  });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// --- 3. UPDATE A TODO ---
// Finds the todo, checks if it belongs to the user, then updates
const updateTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    // --- SECURITY CHECK ---
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    Object.assign(todo, req.body);
    const updatedTodo = await todo.save();
    res.json(updatedTodo);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// --- 4. DELETE A TODO ---
// Finds the todo, checks if it belongs to the user, then deletes
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // --- SECURITY CHECK ---
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await todo.deleteOne();
    res.json({ message: 'Todo deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
};