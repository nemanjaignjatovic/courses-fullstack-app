import { ReactNode } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

interface PrivateRouteProps extends Omit<RouteProps, 'children' | 'render' | 'component'> {
  children: ReactNode;
}

export function PrivateRoute({ children, ...routeProps }: PrivateRouteProps) {
  const { authenticatedUser } = useAuth();

  return (
    <Route
      {...routeProps}
      render={({ location }) =>
        authenticatedUser ? children : <Redirect to={{ pathname: '/signin', state: { from: location } }} />
      }
    />
  );
}
