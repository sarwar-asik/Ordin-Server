/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './Booking.controller';
import { BookingValidation } from './Booking.validation';
const router = Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(BookingValidation.createBooking),
  BookingController.insertDB
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), BookingController.getAllDb);
router.get(
  '/userBooking',
  auth(ENUM_USER_ROLE.USER),
  BookingController.getUserAllBooking
);

router.get('/:serviceId', BookingController.getUserDataBooking);

router.get('/:id', BookingController.getSingleDataById);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
  BookingController.deleteByIdFromDB
);

export const BookingRoutes = router;
