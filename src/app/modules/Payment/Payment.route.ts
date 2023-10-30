/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { PaymentController } from './Payment.controller';
const router = Router();
router.get('/');
router.post('/', PaymentController.initPayment);
router.get('/webhook', PaymentController.webHook);

export const paymentRoutes = router;
