import React, { useEffect, useState } from 'react';

interface Todo {
  id: number;
  title: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/todos')
      .then((res) => res.json())
      .then((data: Todo[]) => setTodos(data))
      .catch((err) => console.error('Error fetching todos:', err));
  }, []);

  return (
    <div>
      <h1>TO DO</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
