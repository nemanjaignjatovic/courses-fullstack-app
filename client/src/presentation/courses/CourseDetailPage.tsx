import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import type { Course } from '../../domain/models/Course';
import { useAuth } from '../auth/AuthContext';

interface CourseRouteParams {
  id: string;
}

export function CourseDetailPage() {
  const { id } = useParams<CourseRouteParams>();
  const history = useHistory();
  const { authenticatedUser, authenticatedPassword, courseRepository } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);

  const courseId = Number(id);
  const isOwner = Boolean(course && authenticatedUser?.id === course.user.id);

  useEffect(() => {
    if (!Number.isInteger(courseId) || courseId <= 0) {
      history.push('/notfound');
      return;
    }

    courseRepository
      .getCourseDetails(courseId)
      .then((courseData) => {
        if (!courseData) history.push('/notfound');
        else setCourse(courseData);
      })
      .catch(() => history.push('/error'));
  }, [courseId, courseRepository, history]);

  async function handleDelete() {
    if (!authenticatedUser || !authenticatedPassword) {
      history.push('/signin');
      return;
    }

    try {
      await courseRepository.deleteCourse(courseId, {
        username: authenticatedUser.emailAddress,
        password: authenticatedPassword,
      });
      history.push('/');
    } catch {
      history.push('/error');
    }
  }

  if (!course) return null;

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {isOwner && (
            <>
              <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
              <button className="button" onClick={handleDelete}>Delete Course</button>
            </>
          )}
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>By {course.user.firstName} {course.user.lastName}</p>
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <div className="course--detail--list">
                <ReactMarkdown>{course.materialsNeeded ?? ''}</ReactMarkdown>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
