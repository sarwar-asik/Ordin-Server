import { z } from 'zod';
const createCategory = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is Required' }),
    img: z.string({ required_error: 'img is Required' }),
    // details: z.string({ required_error: 'details is Required' }),
  }),
});
const updateCategory = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is Required' }).optional(),
    img: z.string({ required_error: 'img is Required' }).optional(),
  }),
});

export const CategoryValidation = { createCategory, updateCategory };
