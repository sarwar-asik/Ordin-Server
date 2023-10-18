import { z } from 'zod';
const createFAQ = z.object({
  body: z.object({
    question: z.string({ required_error: 'question is Required ' }),
    answer: z.string({ required_error: 'answer is Required ' }),
    userId: z.string({ required_error: 'userId is Required ' })
  }),
});
const updateFAQ = z.object({
  body: z.object({
    question: z.string({ required_error: 'question is Required ' }).optional(),
    answer: z.string({ required_error: 'answer is Required ' }).optional(),
    userId: z.string({ required_error: 'userId is Required ' })
  }).optional(),
});

export const FAQValidation = { createFAQ,updateFAQ };
