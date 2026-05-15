import type { User } from './User';

export interface CourseSummary {
  id: number;
  title: string;
}

export interface Course extends CourseSummary {
  description: string;
  estimatedTime?: string | null;
  materialsNeeded?: string | null;
  userId: number;
  user: User;
}

export interface CourseInput {
  title: string;
  description: string;
  estimatedTime?: string;
  materialsNeeded?: string;
  userId: number;
}
