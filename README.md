# Perplexity

Perplexity is a full-stack AI search assistant inspired by the Perplexity product experience. The project includes a Node.js/Express backend for authentication, email verification, and AI responses, plus a React + Vite frontend for user login, registration, and a protected dashboard flow.

## Overview

This repository is structured as a monorepo-style project with two main parts:

- Backend: Express server with MongoDB, JWT auth, email verification, and AI integration
- Frontend: React + Vite app with Redux and React Router

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- Nodemailer
- Socket.IO
- Google Gemini via LangChain integration
- dotenv
- Helmet, CORS, cookie-parser, morgan

### Frontend
- React
- Vite
- Redux Toolkit
- React Router DOM
- Axios
- Socket.IO client
- Tailwind CSS

## Project Structure

```bash
Perplexity/
├── Backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   └── validators/
│   ├── package.json
│   ├── server.js
│   └── .env
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── README.md
├── TO-DO.md
└── .gitignore
```

## Features

### Backend
- User registration with validation
- User login with JWT-based authentication
- Protected routes using middleware
- Email verification flow
- MongoDB user model and persistence
- AI response generation through Google Gemini
- CORS-enabled API for frontend access
- Socket server setup for real-time communication

### Frontend
- Landing page
- Login page
- Register page
- Protected dashboard route
- Redux store for app state
- React Router-based routing
- Lazy-loaded pages via React Suspense

## API Endpoints

Base URL: `http://localhost:5000`

### Auth Routes
- `POST /api/auth/register` — register user
- `POST /api/auth/login` — sign in user
- `GET /api/auth/verify-email` — verify user email
- `GET /api/auth/get-me` — fetch logged-in user details (protected)

### Health Check
- `GET /` — returns a welcome message

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ installed
- MongoDB running locally or a cloud MongoDB connection string
- A Google account and valid Gmail OAuth credentials for email sending
- A Google Gemini API key

## Environment Setup

Create a `.env` file inside the `Backend` directory with the following variables:

```env
PORT=5000
NODE_ENVIRONMENT=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
OAUTH_CLIENT_ID=your_google_oauth_client_id
OAUTH_CLIENT_SECRET=your_google_oauth_client_secret
OAUTH_REFREASH_TOKEN=your_google_refresh_token
USER_EMAIL=your_email@gmail.com
GEMINI_API_KEY=your_google_gemini_api_key
```

> Keep this file private and do not commit it to source control.

## Installation

### 1. Install backend dependencies

```bash
cd Backend
npm install
```

### 2. Install frontend dependencies

```bash
cd Frontend
npm install
```

## Run the Project

### Start the backend

```bash
cd Backend
npm run dev
```

The backend runs using `nodemon` and listens on the configured port.

### Start the frontend

```bash
cd Frontend
npm run dev
```

The frontend usually runs on:

```bash
http://localhost:5173
```

## Frontend Routing

The app currently includes these routes:

- `/` — landing page
- `/login` — login screen
- `/register` — registration screen
- `/dashboard` — protected dashboard route

If a user hits an unknown route, the app redirects to `/dashboard` by default.

## Authentication Flow

1. User signs up at `/register`
2. The backend validates the data and creates the user
3. A verification email is sent using Nodemailer
4. The user clicks the verification link
5. The backend verifies the email token and marks the account as verified
6. User logs in at `/login`
7. JWT token is issued and used to access protected routes

## Notes

- The project currently uses both a backend API and a React frontend.
- Email verification requires valid Gmail OAuth configuration.
- AI features depend on a valid Gemini API key.
- Use `.gitignore` to prevent `.env` and dependency folders from being pushed to GitHub.

## Current Status

The project is in an active development state with core backend authentication and AI integration functioning, and frontend pages for auth/dashboard flow already scaffolded.

## License

This project is currently unlicensed unless otherwise specified in the repository.

## Contributing

Pull requests and improvements are welcome. If you plan to make changes:

1. Create a feature branch
2. Keep environment variables out of the repo
3. Test backend and frontend flows before submitting
