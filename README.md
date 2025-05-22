# fs_todo

A simple TO DO application built with:

- **React (TypeScript)** for the frontend  
- **Express (TypeScript)** for the backend  
- **Cucumber.js** with **Puppeteer** for end-to-end tests  

## Table of Contents

1. [Project Structure](#project-structure)  
2. [Development Principles](#development-principles)
3. [Code Style Guidelines](#code-style-guidelines)
4. [Prerequisites](#prerequisites)  
5. [Installation](#installation)  
6. [Running the Application](#running-the-application)  
7. [Running Tests](#running-tests)  
8. [Notes](#notes)

---

## Project Structure

### client/
React + TypeScript frontend.

### server/
Express + TypeScript backend.

### features/
Cucumber feature files and step definitions for end-to-end testing.

A small change, a another change with new story

---

## Development Principles

### SOLID Principles
We follow SOLID principles in our codebase:
- **S**ingle Responsibility Principle: Each class/module has only one reason to change
- **O**pen/Closed Principle: Software entities are open for extension but closed for modification
- **L**iskov Substitution Principle: Derived classes are substitutable for their base classes
- **I**nterface Segregation Principle: Clients are not forced to depend on methods they do not use
- **D**ependency Inversion Principle: We depend on abstractions, not on concretions

### Test-Driven Development
We use a TDD approach throughout development:
1. Write a failing test first
2. Write minimal code to make the test pass
3. Refactor while keeping tests passing

## Code Style Guidelines

- Use TypeScript for type safety
- Prefer functional programming approaches where appropriate
- Use async/await for asynchronous operations
- Write descriptive variable and function names
- Include JSDoc comments for all functions and classes
- Keep functions small and focused on a single task
- Separate concerns between client and server

### Project-Specific Guidelines
- For the client, use React best practices and hooks
- For the server, follow RESTful API design principles
- Use Cucumber for feature specifications
- Ensure cross-compatibility between client and server types

### Testing Expectations
- Every feature should have corresponding Cucumber tests
- Every component should have unit tests
- Mock external dependencies in tests
- Test both happy path and error scenarios

---

## Prerequisites

- **Node.js (v14 or later)**
- **npm (v6 or later)**  
(If you use nvm or another version manager, ensure you switch to a compatible Node.js version.)

---

## Installation

### Clone the Repository

Using SSH:  
`git clone git@github.com:csmathguy/fs_todo.git`  

Or using HTTPS:  
`git clone https://github.com/csmathguy/fs_todo.git`

### Install Dependencies

1. In the root directory, run:  
   `npm install`
2. Then install dependencies in both the `client` and `server` folders:  

```code
cd client && npm install cd ../server && npm install
```


---

## Running the Application

You can run the application in development mode in two ways:

### A. Run Frontend & Backend Concurrently

From the **root directory**, run:  
`npm run start`  

This uses **concurrently** to spin up:  
- The Express server on `http://localhost:3001`  
- The React development server on `http://localhost:3000`

### B. Run Frontend & Backend Separately

1. In one terminal (root directory), run:  
`npm run start:server`  
This starts the Express server on `http://localhost:3001`.

2. In a second terminal (root directory), run:  
`npm run start:client`  
This starts the React app on `http://localhost:3000`.

---

## Running Tests

### Start the Server
In one terminal, make sure your Express server is running on port `3001`:  
`npm run start:server`

### Run Cucumber Tests
In another terminal (root directory), run:  
`npm run test`  

This triggers **Cucumber.js**, which uses **Puppeteer** to:  
- Verify the React app is accessible at `http://localhost:3000`.  
- Verify the `/api/todos` endpoint on the Express server at `http://localhost:3001`.

#### Common Issues
- **CORS Error**: If you see a CORS issue, ensure the `cors` middleware is enabled in `server/src/index.ts`.  
- **Puppeteer Launch Error**: If Puppeteer can't find Chromium, you may need to specify `executablePath` or reinstall Puppeteer.

---

## Notes

- **In-Memory Data**: The server uses a simple in-memory array of to-do items. In production, replace this with a real database (e.g., SQLite, PostgreSQL, or MongoDB).  
- **Production Build**: To test the production build locally:
1. Run `npm run build` in the `client` folder.  
2. Serve the `client/build` folder from the Express server (already configured in `server/src/index.ts`).  
3. Access the app at `http://localhost:3001`.
- **Feature Development**: Before developing a new feature, check the existing features in the `/features` folder to avoid conflicts with existing functionality.
