
import { z } from 'zod';
const updateProfile = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is Required.',
    }).optional(),
    email: z.string({ required_error: 'email is Required.' }).optional(),
    contact: z.string({ required_error: 'contact is Required.' }).optional(),
    img: z.string({ required_error: 'img is Required.' }).optional(),
  }),
});

export const UsersValidation = {  updateProfile };


