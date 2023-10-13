
import { z } from 'zod';
const createBooking = z.object({
  body: z.object({
    userId: z.string({required_error: 'userId is Required'}),
    serviceId: z.string({required_error: 'serviceId is Required'}),
   
  }),
});

export const BookingValidation = { createBooking };


