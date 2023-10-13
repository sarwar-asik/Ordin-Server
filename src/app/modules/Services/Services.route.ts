/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServicesValidation } from './Services.validation';
import { ServiceController } from './Services.controller';
const router = Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(ServicesValidation.createServices),
  ServiceController.insertDB
);

router.get('/', ServiceController.getAllDb);
router.get('/:id', ServiceController.getSingleDataById);

router.patch(
  '/:id',
  validateRequest(ServicesValidation.updateService),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ServiceController.updateOneInDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ServiceController.deleteByIdFromDB
);

export const servicesRoutes = router;
