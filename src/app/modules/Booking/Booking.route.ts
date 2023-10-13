/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { BookingController } from './Booking.controller';
import {BookingValidation } from './Booking.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
const router = Router();

router.post(
    '/',
    auth(ENUM_USER_ROLE.USER),
    validateRequest(BookingValidation.createBooking),
    BookingController.insertDB
  );
  
  router.get('/', BookingController.getAllDb);
  router.get('/:id', BookingController.getSingleDataById);
  
//   router.patch(
//     '/:id',
//     validateRequest(BookingValidation.updateBooking),
//     auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//     BookingController.updateOneInDB
//   );
  
  router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    BookingController.deleteByIdFromDB
  );

export const BookingRoutes = router;
