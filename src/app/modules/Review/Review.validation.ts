
import { z } from 'zod';
const createReview = z.object({
  body: z.object({
    rating: z.number({ required_error: 'rating is Required '}),
    reviews: z.string({required_error: 'reviews is Required '}).optional(),
    userId: z.string({required_error: 'userId is Required '}),
    serviceId: z.string({required_error: 'serviceId is Required '}),
    comments: z.string({required_error: 'comments is Required '}).optional(),
    suggestions: z.string({required_error: 'suggestions is Required '}).optional(),
  }),
});

export const ReviewValidation = { createReview };


