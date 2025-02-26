import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Simple in-memory "database" of to-do items.
const todos = [
  { id: 1, title: 'Buy groceries' },
  { id: 2, title: 'Complete project' },
];

// API endpoint to get the list of to-dos.
app.get('/api/todos', (req, res) => {
  res.json(todos);
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
