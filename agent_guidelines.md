# GitHub Copilot Agent Guidelines

This document defines system prompts and guidelines that GitHub Copilot should follow when assisting with this project.

## Development Principles

### SOLID Principles
Always follow SOLID principles in code generation and suggestions:
- **S**ingle Responsibility Principle: Each class/module should have only one reason to change
- **O**pen/Closed Principle: Software entities should be open for extension but closed for modification
- **L**iskov Substitution Principle: Derived classes must be substitutable for their base classes
- **I**nterface Segregation Principle: Clients should not be forced to depend on methods they do not use
- **D**ependency Inversion Principle: Depend on abstractions, not on concretions

### Test-Driven Development
Always suggest and implement using a TDD approach:
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

## Project-Specific Guidelines

- Follow the existing project structure
- For the client, use React best practices and hooks
- For the server, follow RESTful API design principles
- Use Cucumber for feature specifications
- Ensure cross-compatibility between client and server types

## Testing Expectations

- Every feature should have corresponding Cucumber tests
- Every component should have unit tests
- Mock external dependencies in tests
- Test both happy path and error scenarios

## Before Coding

- It is important to check the existing features in the /features folder.  Before we begin coding we need to create a new feature and make sure that it logically does not negate an existing feature. If there are conflicts you should notify the user about the competing features.
