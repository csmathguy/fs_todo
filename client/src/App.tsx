import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Paper, 
  ThemeProvider, 
  createTheme,
  CssBaseline,
  styled,
  Button,
  TextField,
  IconButton,
  Pagination
} from '@mui/material';
import { RadioButtonUnchecked, Edit, Delete } from '@mui/icons-material';

// Define a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 500,
      fontSize: '2.5rem',
    },
  },
});

// Styled components
const TodoContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4)
}));

const TodoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: 'white',
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3)
}));

const TodoList = styled(List)(() => ({
  width: '100%'
}));

const TodoItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const TodoIcon = styled(RadioButtonUnchecked)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main,
  opacity: 0.7
}));

const EmptyListBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3, 0)
}));

interface Todo {
  id: string;
  title: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTodos, setTotalTodos] = useState(0);

  useEffect(() => {
    fetchTodos(page);
  }, [page]);

  const fetchTodos = (page: number) => {
    fetch(`http://localhost:3001/api/todos?page=${page}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos || []);
        setTotalPages(Math.ceil(data.total / data.limit) || 1);
        setTotalTodos(data.total);
      })
      .catch((err) => console.error('Error fetching todos:', err));
  };

  const handleCreateTodo = () => {
    fetch('http://localhost:3001/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }),
    })
      .then((res) => res.json())
      .then((todo) => {
        const updatedTodos = [...todos, todo];
        setTodos(updatedTodos);
        setNewTodo('');
        const newTotalTodos = totalTodos + 1;
        setTotalTodos(newTotalTodos);
        const newTotalPages = Math.ceil(newTotalTodos / 10);
        setTotalPages(newTotalPages);
        if (updatedTodos.length > 10) {
          setPage(newTotalPages);
        }
      })
      .catch((err) => console.error('Error creating todo:', err));
  };

  const handleUpdateTodo = (id: string, title: string) => {
    fetch(`http://localhost:3001/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
        setEditTodo(null);
      })
      .catch((err) => console.error('Error updating todo:', err));
  };

  const handleDeleteTodo = (id: string) => {
    fetch(`http://localhost:3001/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        const newTotalTodos = totalTodos - 1;
        setTotalTodos(newTotalTodos);
        const newTotalPages = Math.ceil(newTotalTodos / 10);
        setTotalPages(newTotalPages);
        if (updatedTodos.length === 0 && page > 1) {
          setPage(page - 1);
        } else {
          fetchTodos(page);
        }
      })
      .catch((err) => console.error('Error deleting todo:', err));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoContainer maxWidth="sm">
        <TodoPaper elevation={3}>
          <HeaderBox>
            <Typography variant="h2" color="primary" gutterBottom>
              TO DO
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Your tasks for today
            </Typography>
          </HeaderBox>

          <Box display="flex" mb={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="New Todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateTodo}
              disabled={!newTodo.trim()}
            >
              Add
            </Button>
          </Box>

          <TodoList>
            {todos.length === 0 ? (
              <EmptyListBox>
                <Typography variant="body1" color="text.secondary">
                  No tasks available
                </Typography>
              </EmptyListBox>
            ) : (
              todos.map((todo, index) => (
                <React.Fragment key={todo.id}>
                  <TodoItem alignItems="center">
                    <TodoIcon />
                    <ListItemText
                      primary={
                        editTodo && editTodo.id === todo.id ? (
                          <TextField
                            fullWidth
                            variant="outlined"
                            value={editTodo.title}
                            onChange={(e) =>
                              setEditTodo({ ...editTodo, title: e.target.value })
                            }
                            onBlur={() =>
                              handleUpdateTodo(editTodo.id, editTodo.title)
                            }
                          />
                        ) : (
                          todo.title
                        )
                      }
                      primaryTypographyProps={{
                        fontWeight: 500,
                      }}
                    />
                    <IconButton
                      edge="end"
                      onClick={() => setEditTodo(todo)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TodoItem>
                  {index < todos.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))
            )}
          </TodoList>

          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </TodoPaper>
      </TodoContainer>
    </ThemeProvider>
  );
};

export default App;
