import { z } from 'zod';
const signUp = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is Required.',
    }),
    password: z.string({ required_error: 'password is Required.' }),
    email: z.string({ required_error: 'email is Required.' }),
    contact: z.string({ required_error: 'contact is Required.' }),
    img: z.string({ required_error: 'img is Required.' }),
  }),
});

const loginUser = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required (zod)',
    }),
    password: z.string({
      required_error: 'password is required (zod)',
    }),
  }),
});

export const AuthValidation = { signUp, loginUser };
