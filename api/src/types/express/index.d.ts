import type { User } from '@prisma/client';
import type { SafeUser } from '../api';

/*
  Express does not know about custom properties that our middleware adds to req.

  The auth middleware adds:
  - req.currentUser
  - req.safeCurrentUser

  This declaration extends Express.Request so TypeScript understands those
  properties everywhere in the project.
*/
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
      safeCurrentUser?: SafeUser;
    }
  }
}

export {};
