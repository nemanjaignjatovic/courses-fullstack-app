export interface User {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}
