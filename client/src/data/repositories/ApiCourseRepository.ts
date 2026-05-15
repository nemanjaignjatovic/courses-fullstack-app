import type { Course, CourseInput, CourseSummary } from '../../domain/models/Course';
import type { Credentials } from '../../domain/repositories/AuthRepository';
import type { CourseRepository } from '../../domain/repositories/CourseRepository';
import type { ApiClient } from '../http/ApiClient';
import { readErrors } from '../http/responseHelpers';

export class ApiCourseRepository implements CourseRepository {
  constructor(private readonly apiClient: ApiClient) {}

  async getCourses(): Promise<CourseSummary[]> {
    const response = await this.apiClient.request('/courses');

    if (response.status === 200) return response.json();
    if (response.status === 400) return readErrors(response) as unknown as CourseSummary[];

    throw new Error('Unable to get courses.');
  }

  async getCourseDetails(courseId: number): Promise<Course | null> {
    const response = await this.apiClient.request(`/courses/${courseId}`);

    if (response.status === 200) return response.json();
    if (response.status === 404) return null;
    if (response.status === 400) return null;

    throw new Error('Unable to get course details.');
  }

  async createCourse(course: CourseInput, credentials: Credentials): Promise<string[]> {
    const response = await this.apiClient.request('/courses', 'POST', course, credentials);

    if (response.status === 201) return [];
    if (response.status === 400) return readErrors(response);

    throw new Error('Unable to create course.');
  }

  async updateCourse(courseId: number, course: CourseInput, credentials: Credentials): Promise<string[] | null> {
    const response = await this.apiClient.request(`/courses/${courseId}`, 'PUT', course, credentials);

    if (response.status === 204) return [];
    if (response.status === 401) return null;
    if (response.status === 400 || response.status === 403) return readErrors(response);

    throw new Error('Unable to update course.');
  }

  async deleteCourse(courseId: number, credentials: Credentials): Promise<string[] | null> {
    const response = await this.apiClient.request(`/courses/${courseId}`, 'DELETE', undefined, credentials);

    if (response.status === 204) return [];
    if (response.status === 401) return null;
    if (response.status === 403) return readErrors(response);

    throw new Error('Unable to delete course.');
  }
}
