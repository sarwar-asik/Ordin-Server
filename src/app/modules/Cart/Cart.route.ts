/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CartValidation } from './Cart.validation';
import { CartController } from './Cart.controller';

const router = Router();
router.post(
    '/',
    auth(ENUM_USER_ROLE.USER),
    validateRequest(CartValidation.createCart),
    CartController.insertDB
  );
  
  router.get('/', CartController.getAllDb);
  router.get('/:id', CartController.getSingleDataById);
  
  router.patch(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    CartController.updateOneInDB
  );
  
  router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    CartController.deleteByIdFromDB
  );

export const CartRoutes = router;
