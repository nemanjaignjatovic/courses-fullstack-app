import type { ZodError, ZodIssue } from 'zod';

export function zodErrors(error: ZodError): string[] {
  return error.issues.map((issue: ZodIssue) => issue.message);
}

export function parseId(value: string): number | null {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}
