const router = require('express').Router();
// Import the controller
const todoController = require('../controllers/todo.controller');
const authMiddleware = require('../middleware/auth.middleware');

// --- MAIN ROUTES ---

// GET /api/todos/
// Gets all todos
router.route('/')
  .get(authMiddleware,todoController.getAllTodos);

// POST /api/todos/
// Creates a new todo
router.route('/')
  .post(authMiddleware,todoController.createTodo);


// --- ROUTES WITH /:id ---

// PUT /api/todos/:id
// Updates a specific todo
router.route('/:id')
  .put(authMiddleware,todoController.updateTodo);

// DELETE /api/todos/:id
// Deletes a specific todo
router.route('/:id')
  .delete(authMiddleware,todoController.deleteTodo);


module.exports = router;