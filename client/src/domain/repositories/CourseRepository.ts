import type { Credentials } from './AuthRepository';
import type { Course, CourseInput, CourseSummary } from '../models/Course';

export interface CourseRepository {
  getCourses(): Promise<CourseSummary[]>;
  getCourseDetails(courseId: number): Promise<Course | null>;
  createCourse(course: CourseInput, credentials: Credentials): Promise<string[]>;
  updateCourse(courseId: number, course: CourseInput, credentials: Credentials): Promise<string[] | null>;
  deleteCourse(courseId: number, credentials: Credentials): Promise<string[] | null>;
}
