
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
  
  router.get('/',
  auth(ENUM_USER_ROLE.USER,ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN), 
  CartController.getAllDb);
  
  router.get('/:id', CartController.getSingleDataById);
  
  router.patch(
    '/:id',
    auth(ENUM_USER_ROLE.USER),
    CartController.updateOneInDB
  );
  
  router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.USER),
    CartController.deleteByIdFromDB
  );

export const cartRoutes = router;
