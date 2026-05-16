import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './presentation/layout/Header';
import { SignInPage } from './presentation/auth/SignInPage';
import { SignUpPage } from './presentation/auth/SignUpPage';
import { SignOutPage } from './presentation/auth/SignOutPage';
import { CoursesPage } from './presentation/courses/CoursesPage';
import { CourseDetailPage } from './presentation/courses/CourseDetailPage';
import { CourseFormPage } from './presentation/courses/CourseFormPage';
import { ForbiddenPage } from './presentation/pages/ForbiddenPage';
import { NotFoundPage } from './presentation/pages/NotFoundPage';
import { UnhandledErrorPage } from './presentation/pages/UnhandledErrorPage';
import { PrivateRoute } from './presentation/routing/PrivateRoute';

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={CoursesPage} />
            <PrivateRoute exact path="/courses/create">
              <CourseFormPage mode="create" />
            </PrivateRoute>
            <Route exact path="/courses/:id" component={CourseDetailPage} />
            <PrivateRoute exact path="/courses/:id/update">
              <CourseFormPage mode="update" />
            </PrivateRoute>
            <Route path="/signin" component={SignInPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/signout" component={SignOutPage} />
            <Route path="/notfound" component={NotFoundPage} />
            <Route path="/error" component={UnhandledErrorPage} />
            <Route path="/forbidden" component={ForbiddenPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
