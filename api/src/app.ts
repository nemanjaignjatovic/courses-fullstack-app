import cors from 'cors';
import express, { type ErrorRequestHandler, type RequestHandler } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { coursesRouter } from './routes/courses';
import { usersRouter } from './routes/users';

const app = express();

const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173';

/*
  Global middleware is registered before the routes.

  Order matters:
  1. security headers
  2. CORS
  3. JSON body parsing
  4. request logging
  5. API routes
  6. 404 handler
  7. global error handler
*/
app.use(helmet());
app.use(cors({ origin: clientOrigin }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.json({
    message: 'Courses API with TypeScript, Prisma and Zod is running.',
    apiBaseUrl: '/api',
    database: 'SQLite via Prisma'
  });
});

app.use('/api', usersRouter);
app.use('/api', coursesRouter);

const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ errors: ['Route not found.'] });
};

app.use(notFoundHandler);

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  res.status(500).json({
    errors: ['Something went wrong on the server.']
  });
};

app.use(errorHandler);

export default app;
