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
  styled
} from '@mui/material';
import { RadioButtonUnchecked } from '@mui/icons-material';

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
                      primary={todo.title} 
                      primaryTypographyProps={{
                        fontWeight: 500,
                      }}
                    />
                  </TodoItem>
                  {index < todos.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))
            )}
          </TodoList>
        </TodoPaper>
      </TodoContainer>
    </ThemeProvider>
  );
};

export default App;
