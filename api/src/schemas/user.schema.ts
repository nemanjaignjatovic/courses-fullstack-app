import { z } from 'zod';

/*
  Zod validates request body data at runtime.

  TypeScript types help during development, but they do not protect the app
  from invalid JSON sent by a browser, Postman, or another client. Zod gives us
  a runtime checkpoint before we trust req.body.
*/
export const createUserSchema = z.object({
  firstName: z.string().trim().min(1, 'Please provide a value for "firstName"'),
  lastName: z.string().trim().min(1, 'Please provide a value for "lastName"'),
  emailAddress: z
    .string()
    .trim()
    .min(1, 'Please provide a value for "emailAddress"')
    .email('Please provide a valid email address'),
  password: z.string().min(1, 'Please provide a value for "password"')
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
