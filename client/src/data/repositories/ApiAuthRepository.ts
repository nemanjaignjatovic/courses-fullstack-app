import type { AuthRepository, Credentials } from '../../domain/repositories/AuthRepository';
import type { CreateUserInput, User } from '../../domain/models/User';
import type { ApiClient } from '../http/ApiClient';
import { readErrors } from '../http/responseHelpers';

export class ApiAuthRepository implements AuthRepository {
  constructor(private readonly apiClient: ApiClient) {}

  async getUser(credentials: Credentials): Promise<User | null> {
    const response = await this.apiClient.request('/users', 'GET', undefined, credentials);

    if (response.status === 200) return response.json();
    if (response.status === 401) return null;

    throw new Error('Unable to get authenticated user.');
  }

  async createUser(user: CreateUserInput): Promise<string[]> {
    const response = await this.apiClient.request('/users', 'POST', user);

    if (response.status === 201) return [];
    if (response.status === 400) return readErrors(response);

    throw new Error('Unable to create user.');
  }
}
