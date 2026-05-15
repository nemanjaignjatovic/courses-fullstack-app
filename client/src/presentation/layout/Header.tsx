import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function Header() {
  const { authenticatedUser } = useAuth();

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo"><Link to="/">Courses</Link></h1>
        <nav>
          {authenticatedUser ? (
            <ul className="header--signedin">
              <li>Hello, {authenticatedUser.firstName} {authenticatedUser.lastName}</li>
              <li><Link to="/signout">Sign Out</Link></li>
            </ul>
          ) : (
            <ul className="header--signedout">
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/signin">Sign In</Link></li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}
