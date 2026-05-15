# Modern Courses API TypeScript

A modern TypeScript backend for the Courses app.

Stack:

- Node.js
- TypeScript
- Express
- Prisma
- SQLite
- Zod
- Basic Auth
- bcryptjs
- CORS
- Helmet
- Morgan

## Setup

```bash
npm install
```

Create `.env`:

```env
DATABASE_URL="file:./dev.db"
PORT=5001
CLIENT_ORIGIN="http://localhost:5173"
```

Seed the database:

```bash
npm run seed
```

Run the backend:

```bash
npm run dev
```

Backend URL:

```txt
http://localhost:5001
```

API URL:

```txt
http://localhost:5001/api
```

## Test Users

```txt
Email:    joe@smith.com
Password: joepassword
```

```txt
Email:    sally@jones.com
Password: sallypassword
```

## Useful Commands

```bash
npm run dev
npm run build
npm start
npm run seed
npm run db:studio
```

## Important Files

```txt
src/server.ts
  Starts the backend server.

src/app.ts
  Configures Express middleware, routes and error handling.

src/db/prisma.ts
  Exports Prisma Client.

src/routes/users.ts
  User registration and current user route.

src/routes/courses.ts
  Course CRUD routes.

src/middleware/authenticateUser.ts
  Basic Auth middleware.

src/schemas/
  Zod validation schemas.

src/types/
  Shared API types and Express Request augmentation.

prisma/schema.prisma
  Database models.

prisma/seed.ts
  Starter data.
```

## Notes

This version keeps Basic Auth for now, but it is ready for a future JWT refactor.

Zod is used for runtime validation.

TypeScript is used for safer refactoring, better autocomplete and stronger Prisma integration.
