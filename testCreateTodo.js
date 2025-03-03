const fetch = require('node-fetch');

const createTodo = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test Todo' }),
    });
    const data = await response.json();
    console.log('Todo created:', data);
  } catch (error) {
    console.error('Error creating todo:', error);
  }
};

createTodo();
