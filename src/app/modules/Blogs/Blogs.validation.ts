import { z } from 'zod';
const createBlogs = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is Required ' }),
    content: z.string({ required_error: 'content is Required ' }),
    author: z.string({ required_error: 'author is Required ' }),
    img: z.string({ required_error: 'img is Required '}),
    portal: z.string({ required_error: 'portal is Required ' }),
    publishedTime: z.string({ required_error: 'publishedTime is Required ' }),
    postBy: z.string({ required_error: 'postBy is Required ' }),
  }),
});
const updateBlogs = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is Required ' }).optional(),
    content: z.string({ required_error: 'content is Required ' }).optional(),
    author: z.string({ required_error: 'author is Required ' }).optional(),
    img: z.string({ required_error: 'img is Required ' }).optional(),
    portal: z.string({ required_error: 'portal is Required ' }).optional(),
    publishedTime: z
      .string({ required_error: 'publishedTime is Required ' })
      .optional(),
    postBy: z.string({ required_error: 'postBy is Required ' }).optional(),
  }),
});

export const BlogsValidation = { createBlogs, updateBlogs };
