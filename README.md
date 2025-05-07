# E-commerce Shop Application

## Project Implementation

This project is built as a full-stack e-commerce application with the following architecture:

### Frontend (Angular)
- Built with Angular using component-based architecture
- Features:
  - User authentication (login/register)
  - Product browsing
  - Shopping cart functionality
  - Order management

### Backend (Node.js)
- RESTful API built with Express.js
- MongoDB for data persistence - E-mail & Password are saved in DB for simplicity
- Simple Auth using local storage
- Features:
  - User management
  - Product management
  - Cart operations

## Installation


2. Install all dependencies (both frontend and backend):
```bash
npm install
cd server && npm install
cd shop && npm install
```

This will install:
- Frontend dependencies in `shop/`
- Backend dependencies in `server/`
- Root-level dependencies for running scripts

## Running the Application

All commands can be run from the root directory:

### Run Tests
```bash
npm run tests
```
This will:
- Run frontend e2e tests

### Run Backend Server
```bash
npm run server
```
This starts the Node.js server on `http://localhost:3000`

### Run Frontend
```bash
npm run frontend
```
This starts the Angular development server on `http://localhost:4200`

## Development Workflow

1. Start both servers:
```bash
# Terminal 1
npm run server

# Terminal 2
npm run frontend
```

## Project Structure
```bash
    shop/ # Angular frontend
        src/ # Source code
    server/ # Node.js backend
        routes/ # API routes
        models/ # Database models
    tests/ # End-to-end tests
    package.json # Root package.json for running all commands
```

