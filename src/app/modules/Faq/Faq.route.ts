import { Router } from 'express';

import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { FAQValidation } from './Faq.validation';
import { FAQController } from './Faq.controller';

const router = Router();

router.post(
    '/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(FAQValidation.createFAQ),
    FAQController.insertDB
  );
  
  router.get('/', FAQController.getAllDb);
  router.get('/:id', FAQController.getSingleDataById);
  
  router.patch(
    '/:id',
    validateRequest(FAQValidation.updateFAQ),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    FAQController.updateOneInDB
  );
  
  router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    FAQController.deleteByIdFromDB
  );

export const FAQRoutes = router;
