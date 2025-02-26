# fs_todo

A simple TO DO application built with:

- **React (TypeScript)** for the frontend  
- **Express (TypeScript)** for the backend  
- **Cucumber.js** with **Puppeteer** for end-to-end tests  

## Table of Contents

1. [Project Structure](#project-structure)  
2. [Prerequisites](#prerequisites)  
3. [Installation](#installation)  
4. [Running the Application](#running-the-application)  
5. [Running Tests](#running-tests)  
6. [Notes](#notes)

---

## Project Structure

### client/
React + TypeScript frontend.

### server/
Express + TypeScript backend.

### features/
Cucumber feature files and step definitions for end-to-end testing.

---

## Prerequisites

- **Node.js (v14 or later)**
- **npm (v6 or later)**  
(If you use nvm or another version manager, ensure you switch to a compatible Node.js version.)

---

## Installation

### Clone the Repository

Using SSH:  
`git clone git@github.com:<your-username>/fs_todo.git`  

Or using HTTPS:  
`git clone https://github.com/<your-username>/fs_todo.git`

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
- **Puppeteer Launch Error**: If Puppeteer can’t find Chromium, you may need to specify `executablePath` or reinstall Puppeteer.

---

## Notes

- **In-Memory Data**: The server uses a simple in-memory array of to-do items. In production, replace this with a real database (e.g., SQLite, PostgreSQL, or MongoDB).  
- **Production Build**: To test the production build locally:
1. Run `npm run build` in the `client` folder.  
2. Serve the `client/build` folder from the Express server (already configured in `server/src/index.ts`).  
3. Access the app at `http://localhost:3001`.
