/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UsersController } from './Users.controller';
const router = Router();

router.get(
  '/profile',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UsersController.userProfile
);
router.post('/');

export const userRoutes = router;
