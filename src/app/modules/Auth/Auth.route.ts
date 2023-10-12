/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './Auth.controller';
import { AuthValidation } from './Auth.validation';
const router = Router();

router.post(
  '/sign-up',
  validateRequest(AuthValidation.signUp),
  AuthController.SignUp
);
router.post('/login',validateRequest(AuthValidation.loginUser),AuthController.login);

export const authRoutes = router;
