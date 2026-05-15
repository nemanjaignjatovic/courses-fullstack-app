import 'dotenv/config';

import app from './app';

/*
  server.ts is the runtime entry point.

  app.ts defines the Express application.
  server.ts starts the HTTP server by calling app.listen().
*/
const port = Number(process.env.PORT ?? 5001);

app.listen(port, () => {
  console.log(`Courses API with TypeScript, Prisma and Zod is running on http://localhost:${port}`);
});
