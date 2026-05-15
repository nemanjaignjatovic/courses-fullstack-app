import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import type { User } from '../../domain/models/User';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import type { CourseRepository } from '../../domain/repositories/CourseRepository';
import { ApiClient } from '../../data/http/ApiClient';
import { ApiAuthRepository } from '../../data/repositories/ApiAuthRepository';
import { ApiCourseRepository } from '../../data/repositories/ApiCourseRepository';
import { appConfig } from '../../data/config/appConfig';

interface AuthContextValue {
  authenticatedUser: User | null;
  authenticatedPassword: string | null;
  authRepository: AuthRepository;
  courseRepository: CourseRepository;
  signIn: (emailAddress: string, password: string) => Promise<User | null>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readJsonCookie<T>(name: string): T | null {
  const value = Cookies.get(name);
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return value as T;
  }
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(() => readJsonCookie<User>('authenticatedUser'));
  const [authenticatedPassword, setAuthenticatedPassword] = useState<string | null>(() => readJsonCookie<string>('authenticatedPassword'));

  const services = useMemo(() => {
    const apiClient = new ApiClient(appConfig.apiBaseUrl);

    return {
      authRepository: new ApiAuthRepository(apiClient),
      courseRepository: new ApiCourseRepository(apiClient),
    };
  }, []);

  async function signIn(emailAddress: string, password: string): Promise<User | null> {
    const user = await services.authRepository.getUser({ username: emailAddress, password });

    if (user) {
      setAuthenticatedUser(user);
      setAuthenticatedPassword(password);
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
      Cookies.set('authenticatedPassword', JSON.stringify(password), { expires: 1 });
    }

    return user;
  }

  function signOut(): void {
    setAuthenticatedUser(null);
    setAuthenticatedPassword(null);
    Cookies.remove('authenticatedUser');
    Cookies.remove('authenticatedPassword');
  }

  return (
    <AuthContext.Provider value={{ authenticatedUser, authenticatedPassword, ...services, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}
