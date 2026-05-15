import { z } from 'zod';

const optionalString = z
  .string()
  .optional()
  .transform(value => value?.trim() ?? '');

/*
  Course validation is shared by create and update routes.

  title and description are required.
  estimatedTime and materialsNeeded are optional and normalized to empty strings.
*/
export const courseSchema = z.object({
  title: z.string().trim().min(1, 'Please provide a value for "title"'),
  description: z.string().trim().min(1, 'Please provide a value for "description"'),
  estimatedTime: optionalString,
  materialsNeeded: optionalString
});

export type CourseInput = z.infer<typeof courseSchema>;
