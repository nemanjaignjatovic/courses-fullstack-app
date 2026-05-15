import type { CreateUserInput, User } from '../models/User';

export interface Credentials {
  username: string;
  password: string;
}

export interface AuthRepository {
  getUser(credentials: Credentials): Promise<User | null>;
  createUser(user: CreateUserInput): Promise<string[]>;
}
