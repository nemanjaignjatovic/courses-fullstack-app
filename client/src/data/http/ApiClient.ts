import type { Credentials } from '../../domain/repositories/AuthRepository';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class ApiClient {
  constructor(private readonly baseUrl: string) {}

  request(path: string, method: HttpMethod = 'GET', body?: unknown, credentials?: Credentials): Promise<Response> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json; charset=utf-8',
    };

    if (credentials) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      headers.Authorization = `Basic ${encodedCredentials}`;
    }

    return fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  }
}
