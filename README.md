# Courses Full-Stack App

A full-stack courses application built with a modern React frontend and a TypeScript/Express backend.

The project includes a Vite React client, a Node.js API, Prisma ORM, SQLite database, Zod validation, and Basic Auth. It can be run locally for development and is also deployed live using GitHub Pages and Railway.

## Live Demo

Frontend:

```txt
https://nemanjaignjatovic.github.io/courses-fullstack-app/
```

Backend API:

```txt
https://courses-fullstack-app-production.up.railway.app/api
```

## Project Structure

```txt
courses-fullstack-app/
  api/
    src/
    prisma/
    package.json
    tsconfig.json

  client/
    src/
    package.json
    vite.config.ts

  README.md
  .gitignore
```

## Tech Stack

### Frontend

```txt
React
TypeScript
Vite
React Router
CSS
GitHub Pages
```

### Backend

```txt
Node.js
Express
TypeScript
Prisma
SQLite
Zod
Basic Auth
bcryptjs
CORS
Helmet
Morgan
Railway
```

## What the App Does

Users can:

```txt
View all courses
View course details
Sign in
Create a new course
Update their own courses
Delete their own courses
Create a new user account
```

The backend protects course creation, update, and delete routes with Basic Auth.

## Architecture Overview

```txt
React frontend
  ↓
HTTP request
  ↓
Express API
  ↓
Middleware
  ↓
Zod validation
  ↓
Prisma
  ↓
SQLite database
  ↓
JSON response
```

## Local Development

You need two terminal windows.

### 1. Start the Backend

From the project root:

```bash
cd api
npm install
npm run seed
npm run dev
```

Backend runs on:

```txt
http://localhost:5001
```

API base URL:

```txt
http://localhost:5001/api
```

### 2. Start the Frontend

From the project root:

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

## Environment Variables

### Backend

Create this file:

```txt
api/.env
```

Example:

```env
DATABASE_URL="file:./dev.db"
PORT=5001
CLIENT_ORIGIN="http://localhost:5173"
```

For Railway deployment, `CLIENT_ORIGIN` is set to:

```env
CLIENT_ORIGIN=https://nemanjaignjatovic.github.io
```

### Frontend

Create this file:

```txt
client/.env
```

For local development:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

For production build, create:

```txt
client/.env.production
```

```env
VITE_API_BASE_URL=https://courses-fullstack-app-production.up.railway.app/api
```

## Test Login Users

```txt
Email: joe@smith.com
Password: joepassword
```

```txt
Email: sally@jones.com
Password: sallypassword
```

## API Endpoints

### Courses

```txt
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses
PUT    /api/courses/:id
DELETE /api/courses/:id
```

### Users

```txt
GET    /api/users
POST   /api/users
```

Protected endpoints require Basic Auth.

## Example API Requests

### Get All Courses

```txt
GET http://localhost:5001/api/courses
```

### Get Current User

Requires Basic Auth.

```txt
GET http://localhost:5001/api/users
```

Authorization:

```txt
Username: joe@smith.com
Password: joepassword
```

### Create Course

```txt
POST http://localhost:5001/api/courses
```

Body:

```json
{
  "title": "New Course",
  "description": "Course description",
  "estimatedTime": "3 hours",
  "materialsNeeded": "Laptop and internet"
}
```

## Backend Details

The backend is built with Express and TypeScript.

Main backend flow:

```txt
server.ts
  starts the API server

app.ts
  configures Express middleware and routes

routes/
  defines API endpoints

middleware/
  handles auth and async errors

schemas/
  contains Zod validation schemas

db/prisma.ts
  exports Prisma Client

prisma/schema.prisma
  defines database models

prisma/seed.ts
  inserts starter data
```

## Prisma Models

The backend uses two main models:

```txt
User
Course
```

Relationship:

```txt
One User can have many Courses
One Course belongs to one User
```

## Authentication

This project currently uses Basic Auth.

For protected requests, the client sends:

```txt
Authorization: Basic base64(email:password)
```

The backend:

```txt
Reads the Basic Auth header
Finds the user by email
Compares the password with bcrypt
Attaches the authenticated user to the request
Allows or blocks the request
```

## Validation

The backend uses Zod for request validation.

Example validations:

```txt
Course title is required
Course description is required
Email must be valid
Password is required
```

Invalid requests return `400 Bad Request`.

## Deployment

### Frontend

The frontend is deployed to GitHub Pages.

Build and deploy from the `client` folder:

```bash
npm run deploy
```

GitHub Pages URL:

```txt
https://nemanjaignjatovic.github.io/courses-fullstack-app/
```

### Backend

The backend is deployed to Railway.

Railway settings:

```txt
Root Directory: /api
Build Command: npm install && npm run build && npm run seed
Start Command: npx tsx src/server.ts
```

Railway environment variables:

```env
DATABASE_URL=file:./dev.db
NODE_ENV=production
CLIENT_ORIGIN=https://nemanjaignjatovic.github.io
NPM_CONFIG_PRODUCTION=false
```

## Notes

The current live backend uses SQLite for simplicity. This works for a demo project, but for a more production-ready setup, the database should be moved to PostgreSQL.

Recommended future production setup:

```txt
Frontend: GitHub Pages or Vercel
Backend: Railway or Render
Database: PostgreSQL, such as Railway PostgreSQL, Neon, or Supabase
```

## Future Improvements

Possible next steps:

```txt
Move from SQLite to PostgreSQL
Replace Basic Auth with JWT auth
Add automated tests
Split backend routes into controllers and services
Improve error response formatting
Add loading and error states in the frontend
Add user profile management
Add pagination/search for courses
```

## Status

This project is a working full-stack application and portfolio/demo project. It is designed to demonstrate frontend/backend communication, API development, authentication, validation, database access, and deployment.
