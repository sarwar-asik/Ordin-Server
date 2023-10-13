/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { CategoryController } from './Category.controller';
import {CategoryValidation } from './Category.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
const router = Router();

router.post(
    '/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(CategoryValidation.createCategory),
    CategoryController.insertDB
  );
  
  router.get('/', CategoryController.getAllDb);
  router.get('/:id', CategoryController.getSingleDataById);
  
  router.patch(
    '/:id',
    validateRequest(CategoryValidation.updateCategory),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    CategoryController.updateOneInDB
  );
  
  router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    CategoryController.deleteByIdFromDB
  );

export const CategoryRoutes = router;
