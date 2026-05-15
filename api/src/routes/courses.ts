import { Router } from 'express';

import { prisma } from '../db/prisma';
import { asyncHandler } from '../middleware/asyncHandler';
import { authenticateUser } from '../middleware/authenticateUser';
import { courseSchema } from '../schemas/course.schema';
import { parseId, zodErrors } from '../schemas/validation';
import { courseResponse } from '../types/api';

export const coursesRouter = Router();

/*
  GET /api/courses

  Public route that returns all courses.
  Each course includes its owner, but the password is removed from the response.
*/
coursesRouter.get('/courses', asyncHandler(async (_req, res) => {
  const courses = await prisma.course.findMany({
    include: {
      user: true
    },
    orderBy: {
      id: 'asc'
    }
  });

  res.status(200).json(courses.map(courseResponse));
}));

/*
  GET /api/courses/:id

  Public route that returns one course by id.
*/
coursesRouter.get('/courses/:id', asyncHandler(async (req, res) => {
  const rawId = req.params.id;

  if (typeof rawId !== 'string') {
    res.status(400).json({ errors: ['Course id must be a positive number.'] });
    return;
  }

  const id = parseId(rawId);

  if (!id) {
    res.status(400).json({ errors: ['Course id must be a positive number.'] });
    return;
  }

  const course = await prisma.course.findUnique({
    where: {
      id
    },
    include: {
      user: true
    }
  });

  if (!course) {
    res.status(404).json({ errors: ['Course not found.'] });
    return;
  }

  res.status(200).json(courseResponse(course));
}));

/*
  POST /api/courses

  Protected route that creates a new course for the current authenticated user.
*/
coursesRouter.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
  const parsed = courseSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ errors: zodErrors(parsed.error) });
    return;
  }

  if (!req.currentUser) {
    res.status(401).json({ errors: ['Access denied.'] });
    return;
  }

  const input = parsed.data;

  const newCourse = await prisma.course.create({
    data: {
      title: input.title,
      description: input.description,
      estimatedTime: input.estimatedTime,
      materialsNeeded: input.materialsNeeded,
      userId: req.currentUser.id
    }
  });

  res.location(`/api/courses/${newCourse.id}`).status(201).end();
}));

/*
  PUT /api/courses/:id

  Protected route that updates a course.
  Only the owner of the course can update it.
*/
coursesRouter.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  const rawId = req.params.id;

  if (typeof rawId !== 'string') {
    res.status(400).json({ errors: ['Course id must be a positive number.'] });
    return;
  }

  const id = parseId(rawId);

  if (!id) {
    res.status(400).json({ errors: ['Course id must be a positive number.'] });
    return;
  }

  if (!req.currentUser) {
    res.status(401).json({ errors: ['Access denied.'] });
    return;
  }

  const course = await prisma.course.findUnique({
    where: {
      id
    }
  });

  if (!course) {
    res.status(404).json({ errors: ['Course not found.'] });
    return;
  }

  if (course.userId !== req.currentUser.id) {
    res.status(403).json({ errors: ['You are not authorized to modify this course.'] });
    return;
  }

  const parsed = courseSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ errors: zodErrors(parsed.error) });
    return;
  }

  const input = parsed.data;

  await prisma.course.update({
    where: {
      id
    },
    data: {
      title: input.title,
      description: input.description,
      estimatedTime: input.estimatedTime,
      materialsNeeded: input.materialsNeeded
    }
  });

  res.status(204).end();
}));

/*
  DELETE /api/courses/:id

  Protected route that deletes a course.
  Only the owner of the course can delete it.
*/
coursesRouter.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  const rawId = req.params.id;

  if (typeof rawId !== 'string') {
    res.status(400).json({ errors: ['Course id must be a positive number.'] });
    return;
  }

  const id = parseId(rawId);

  if (!id) {
    res.status(400).json({ errors: ['Course id must be a positive number.'] });
    return;
  }

  if (!req.currentUser) {
    res.status(401).json({ errors: ['Access denied.'] });
    return;
  }

  const course = await prisma.course.findUnique({
    where: {
      id
    }
  });

  if (!course) {
    res.status(404).json({ errors: ['Course not found.'] });
    return;
  }

  if (course.userId !== req.currentUser.id) {
    res.status(403).json({ errors: ['You are not authorized to delete this course.'] });
    return;
  }

  await prisma.course.delete({
    where: {
      id
    }
  });

  res.status(204).end();
}));
