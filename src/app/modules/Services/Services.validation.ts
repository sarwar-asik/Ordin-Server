import { z } from 'zod';
const createServices = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is Required ' }),
    description: z.string({ required_error: 'description is Required ' }),
    price: z.string({ required_error: 'price is Required ' }),
    address: z.string({ required_error: 'address is Required ' }),
    contact: z.string({ required_error: 'contact is Required ' }),
    img: z.string({ required_error: 'img is Required ' }),
    serviceTime: z.string({ required_error: 'serviceTime is Required ' }),
    categoryId: z.string({ required_error: 'categoryId is Required ' }),
    publisherId: z.string({ required_error: 'publisherId is Required ' }),
  }),
});

const updateService = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is Required ' }).optional(),
    description: z.string({ required_error: 'description is Required ' }).optional(),
    price: z.string({ required_error: 'price is Required ' }).optional(),
    address: z.string({ required_error: 'address is Required ' }).optional(),
    contact: z.string({ required_error: 'contact is Required ' }).optional(),
    img: z.string({ required_error: 'img is Required ' }).optional(),
    serviceTime: z.string({ required_error: 'serviceTime is Required ' }).optional(),
    categoryId: z.string({ required_error: 'categoryId is Required ' }).optional(),
    publisherId: z.string({ required_error: 'publisherId is Required ' }).optional(),
  }),
});
export const ServicesValidation = { createServices,updateService };
