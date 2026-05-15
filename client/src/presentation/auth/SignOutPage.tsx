import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function SignOutPage() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return <Redirect to="/" />;
}
