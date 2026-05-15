import type { Course, User } from '@prisma/client';

export type SafeUser = Omit<User, 'password'>;

export type CourseWithUser = Course & {
  user: User;
};

export type CourseResponse = {
  id: number;
  title: string;
  description: string;
  estimatedTime: string;
  materialsNeeded: string;
  userId: number;
  user: SafeUser;
};

export type ApiErrorResponse = {
  errors: string[];
};

export function withoutPassword(user: User): SafeUser {
  const { password, ...safeUser } = user;
  return safeUser;
}

export function courseResponse(course: CourseWithUser): CourseResponse {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    estimatedTime: course.estimatedTime ?? '',
    materialsNeeded: course.materialsNeeded ?? '',
    userId: course.userId,
    user: withoutPassword(course.user)
  };
}
