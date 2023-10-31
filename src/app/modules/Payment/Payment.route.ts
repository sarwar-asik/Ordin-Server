/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { PaymentController } from './Payment.controller';
const router = Router();
router.get('/');
router.post('/', PaymentController.initPayment);
router.post('/webhook', PaymentController.webHook);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  PaymentController.getAllPayment
);

router.get(
  '/userPayment',
  auth(ENUM_USER_ROLE.USER),
  PaymentController.getUserAllPayment
);

router.get('/:serviceId', PaymentController.getUserPaymentByService);

router.get('/:id', PaymentController.getSingleDataById);

export const paymentRoutes = router;
