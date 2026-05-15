import bcrypt from 'bcryptjs';
import { Router } from 'express';

import { prisma } from '../db/prisma';
import { asyncHandler } from '../middleware/asyncHandler';
import { authenticateUser } from '../middleware/authenticateUser';
import { createUserSchema } from '../schemas/user.schema';
import { zodErrors } from '../schemas/validation';
import { withoutPassword } from '../types/api';

export const usersRouter = Router();

/*
  GET /api/users

  Returns the currently authenticated user.

  This route is protected by Basic Auth. The authenticateUser middleware sets
  req.safeCurrentUser, which excludes the password field.
*/
usersRouter.get('/users', authenticateUser, (req, res) => {
  res.status(200).json(req.safeCurrentUser);
});

/*
  POST /api/users

  Creates a new user account.

  Zod validates the request body.
  bcrypt hashes the password before it is stored.
*/
usersRouter.post('/users', asyncHandler(async (req, res) => {
  const parsed = createUserSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ errors: zodErrors(parsed.error) });
    return;
  }

  const input = parsed.data;
  const emailAddress = input.emailAddress.toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: {
      emailAddress
    }
  });

  if (existingUser) {
    res.status(400).json({ errors: ['The email address already exists.'] });
    return;
  }

  const passwordHash = await bcrypt.hash(input.password, 10);

  const newUser = await prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      emailAddress,
      password: passwordHash
    }
  });

  res.location('/').status(201).json(withoutPassword(newUser));
}));
