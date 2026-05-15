import { FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import type { CourseInput } from '../../domain/models/Course';
import { useAuth } from '../auth/AuthContext';
import { ErrorsDisplay } from '../components/ErrorsDisplay';

interface CourseRouteParams {
  id?: string;
}

interface CourseFormPageProps {
  mode: 'create' | 'update';
}

export function CourseFormPage({ mode }: CourseFormPageProps) {
  const history = useHistory();
  const { id } = useParams<CourseRouteParams>();
  const { authenticatedUser, authenticatedPassword, courseRepository } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const courseId = id ? Number(id) : undefined;

  useEffect(() => {
    if (mode !== 'update' || !courseId || !authenticatedUser) return;

    courseRepository
      .getCourseDetails(courseId)
      .then((course) => {
        if (!course) {
          history.push('/notfound');
          return;
        }

        if (course.user.id !== authenticatedUser.id) {
          history.push('/forbidden');
          return;
        }

        setTitle(course.title);
        setDescription(course.description);
        setEstimatedTime(course.estimatedTime ?? '');
        setMaterialsNeeded(course.materialsNeeded ?? '');
      })
      .catch(() => history.push('/error'));
  }, [authenticatedUser, courseId, courseRepository, history, mode]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!authenticatedUser || !authenticatedPassword) {
      history.push('/signin');
      return;
    }

    const course: CourseInput = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authenticatedUser.id,
    };

    try {
      const credentials = {
        username: authenticatedUser.emailAddress,
        password: authenticatedPassword,
      };

      const apiErrors = mode === 'create'
        ? await courseRepository.createCourse(course, credentials)
        : await courseRepository.updateCourse(courseId!, course, credentials);

      if (apiErrors?.length) {
        setErrors(apiErrors);
        return;
      }

      history.push(mode === 'create' ? '/' : `/courses/${courseId}`);
    } catch {
      history.push('/error');
    }
  }

  function cancel() {
    history.push(mode === 'create' ? '/' : `/courses/${courseId}`);
  }

  return (
    <div className="wrap">
      <h2>{mode === 'create' ? 'Create Course' : 'Update Course'}</h2>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
            {authenticatedUser && <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>}
            <label htmlFor="courseDescription">Course Description</label>
            <textarea id="courseDescription" name="courseDescription" value={description} onChange={(event) => setDescription(event.target.value)} />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={(event) => setEstimatedTime(event.target.value)} />
            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={(event) => setMaterialsNeeded(event.target.value)} />
          </div>
        </div>
        <button className="button" type="submit">{mode === 'create' ? 'Create Course' : 'Update Course'}</button>
        <button className="button button-secondary" onClick={(event) => { event.preventDefault(); cancel(); }}>Cancel</button>
      </form>
    </div>
  );
}
