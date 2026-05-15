import bcrypt from 'bcryptjs';
import type { NextFunction, Request, Response } from 'express';

import { prisma } from '../db/prisma';
import { withoutPassword } from '../types/api';
import { readBasicAuth } from './readBasicAuth';

/*
  This middleware protects private routes.

  It checks the Basic Auth header, verifies the email/password combination
  against the database, and attaches the authenticated user to the request.

  After this middleware succeeds, route handlers can safely use:
  - req.currentUser
  - req.safeCurrentUser
*/
export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const credentials = readBasicAuth(req.get('Authorization'));

    if (!credentials) {
      res.set('WWW-Authenticate', 'Basic realm="Courses API"');
      res.status(401).json({ errors: ['Access denied. Missing credentials.'] });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        emailAddress: credentials.emailAddress.toLowerCase()
      }
    });

    if (!user) {
      res.status(401).json({ errors: ['Access denied. User not found.'] });
      return;
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ errors: ['Access denied. Incorrect password.'] });
      return;
    }

    req.currentUser = user;
    req.safeCurrentUser = withoutPassword(user);

    next();
  } catch (error) {
    next(error);
  }
}
