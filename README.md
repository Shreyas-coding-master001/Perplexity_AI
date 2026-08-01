# Perplexity

A full-stack AI-powered search assistant inspired by Perplexity. The project currently includes a backend API and a frontend folder for the user interface.

## Project structure

- Backend/ - Express + MongoDB API
- Frontend/ - Client app (to be built)
- TO-DO.md - task tracking notes

## Tech stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- dotenv for environment variables
- React/Vite or similar frontend (planned)

## Getting started

### 1. Install backend dependencies

```bash
cd Backend
npm install
```

### 2. Setup environment variables

Create a `.env` file in the `Backend` folder with values such as:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Run the server

```bash
npm run dev
```

The backend will start with nodemon for development.

## Current status

This is an early project setup. The backend authentication flow and database configuration are being developed, and the frontend is still being scaffolded.

## Notes

- Keep secrets out of source control using `.env`
- Use the `.gitignore` file to avoid committing node_modules and local environment files
