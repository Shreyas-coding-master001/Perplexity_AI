# Perplexity

A full-stack AI-powered search assistant inspired by Perplexity. The project currently includes a backend API with authentication and email verification, plus a frontend folder for the user interface.

## Project structure

- Backend/ - Express + MongoDB API with auth and mail features
- Frontend/ - Client app (to be built)
- TO-DO.md - task tracking notes

## Tech stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- dotenv for environment variables
- Nodemailer for email delivery
- Gmail OAuth2 mail configuration
- React/Vite or similar frontend (planned)

## Backend features

The backend now includes:

- User registration
- Login flow with JWT-based sessions
- Email verification on registration
- Nodemailer integration to send verification emails
- Verification endpoint that marks the user as verified in the database

## Authentication flow

1. A user registers with name, email, and password.
2. The backend creates the user and sends a verification email.
3. The email contains a JWT link that hits the verification endpoint.
4. The backend verifies the token and updates the user as verified.
5. The user can then proceed with login and access protected features.

## Getting started

### 1. Install backend dependencies

```bash
cd Backend
npm install
```

### 2. Setup environment variables

Create a `.env` file in the `Backend` folder with the following values:

```env
PORT=5000
NODE_ENVIRONMENT=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
OAUTH_CLIENT_ID=your_google_oauth_client_id
OAUTH_CLIENT_SECRET=your_google_oauth_client_secret
OAUTH_REFREASH_TOKEN=your_google_refresh_token
USER_EMAIL=your_email@gmail.com
```

> Note: the app currently expects Gmail-based OAuth credentials for the mail service.

### 3. Run the server

```bash
npm run dev
```

The backend will start with nodemon for development.

## Current status

The backend authentication flow is actively being developed and the email verification feature has been implemented. The frontend is still in the planning/scaffolding stage.

## Notes

- Keep secrets out of source control using `.env`
- Use the `.gitignore` file to avoid committing `node_modules` and local environment files
- Make sure Gmail OAuth credentials are valid before testing email verification
