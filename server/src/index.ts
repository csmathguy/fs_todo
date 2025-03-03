import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Simple in-memory "database" of to-do items.
let todos = [
  { id: 1, title: 'Buy groceries' },
  { id: 2, title: 'Complete project' },
];
let nextId = 3; // Counter for generating unique IDs

// API endpoint to get the list of to-dos with pagination.
app.get('/api/todos', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const resultTodos = todos.slice(startIndex, endIndex);
  res.json({ page, limit, total: todos.length, todos: resultTodos });
});

// API endpoint to create a new to-do.
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  const newTodo = { id: nextId++, title };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// API endpoint to update an existing to-do.
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const todo = todos.find(t => t.id === parseInt(id));
  if (todo) {
    todo.title = title;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// API endpoint to delete a to-do.
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(t => t.id !== parseInt(id));
  res.status(204).end();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Serve static files if the build folder exists (for production)
const buildPath = path.join(__dirname, '../../client/build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  console.log('Build folder not found, skipping static file serving.');
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
