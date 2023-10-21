
import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './Auth.controller';
import { AuthValidation } from './Auth.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = Router();

router.post(
  '/sign-up',
  validateRequest(AuthValidation.signUp),
  AuthController.SignUp
);
router.post('/login',validateRequest(AuthValidation.loginUser),AuthController.login);

router.patch('/change-password',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.USER),validateRequest(AuthValidation.changePassword),AuthController.changePassword);

export const authRoutes = router;
