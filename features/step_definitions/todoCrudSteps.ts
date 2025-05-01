import { Given, When, Then } from '@cucumber/cucumber';
import fetch from 'node-fetch';
import assert from 'assert';

interface TestContext {
  newTodoTitle?: string;
  createdTodo?: { id: number; title: string };
  existingTodo?: { id: number; title: string };
  updatedTodo?: { id: number; title: string };
  todosPage2?: { id: number; title: string }[];
}

let createdTodoId: number;

Given('I have a new todo with title {string}', function (this: TestContext, title: string) {
  this.newTodoTitle = title;
});

When('I create the todo', async function (this: TestContext) {
  const response = await fetch('http://localhost:3001/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: this.newTodoTitle }),
  });
  const todo = await response.json();
  createdTodoId = todo.id;
  this.createdTodo = todo;
});

Then('I should see the todo in the list', async function (this: TestContext) {
  const response = await fetch('http://localhost:3001/api/todos');
  const data = await response.json();
  const todo = data.todos.find((t: any) => t.id === createdTodoId);
  assert(todo, 'Todo not found');
  assert.strictEqual(todo.title, this.newTodoTitle);
});

Given('I have an existing todo with title {string}', async function (this: TestContext, title: string) {
  const response = await fetch('http://localhost:3001/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  const todo = await response.json();
  createdTodoId = todo.id;
  this.existingTodo = todo;
});

When('I update the todo title to {string}', async function (this: TestContext, newTitle: string) {
  const response = await fetch(`http://localhost:3001/api/todos/${createdTodoId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTitle }),
  });
  const updatedTodo = await response.json();
  this.updatedTodo = updatedTodo;
});

Then('I should see the updated title in the list', async function (this: TestContext) {
  const response = await fetch('http://localhost:3001/api/todos');
  const data = await response.json();
  const todo = data.todos.find((t: any) => t.id === createdTodoId);
  assert(todo, 'Todo not found');
  assert.strictEqual(todo.title, this.updatedTodo?.title);
});

When('I delete the todo', async function (this: TestContext) {
  await fetch(`http://localhost:3001/api/todos/${createdTodoId}`, {
    method: 'DELETE',
  });
});

Then('I should not see the todo in the list', async function (this: TestContext) {
  const response = await fetch('http://localhost:3001/api/todos');
  const data = await response.json();
  const todo = data.todos.find((t: any) => t.id === createdTodoId);
  assert(!todo, 'Todo should not be found');
});

Given('I have more than 10 todos', async function (this: TestContext) {
  for (let i = 0; i < 11; i++) {
    await fetch('http://localhost:3001/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: `Todo ${i + 1}` }),
    });
  }
});

When('I navigate to the second page', async function (this: TestContext) {
  const response = await fetch('http://localhost:3001/api/todos?page=2&limit=10');
  const data = await response.json();
  this.todosPage2 = data.todos;
});

Then('I should see the todos for the second page', function (this: TestContext) {
  assert.strictEqual(this.todosPage2?.length, 1);
  assert.strictEqual(this.todosPage2?.[0].title, 'Todo 11');
});
