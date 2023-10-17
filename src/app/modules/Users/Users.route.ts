/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UsersController } from './Users.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UsersValidation } from './Users.validation';
const router = Router();

router.get(
  '/profile',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UsersController.userProfile
);
router.get(
  '/',
  auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UsersController.getAllUsers
);
router.patch('/update',auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
validateRequest(UsersValidation.updateProfile),
UsersController.updateProfile);

export const userRoutes = router;
