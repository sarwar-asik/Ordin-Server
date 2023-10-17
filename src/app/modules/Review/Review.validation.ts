
import { z } from 'zod';
const createReview = z.object({
  body: z.object({
    year: z.number({
      required_error: 'year is Required (zod)',
    }),
    title: z.string({
      required_error: 'title is Required (zod)',
    })
  }),
});

export const ReviewValidation = { createReview };


