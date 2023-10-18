import { Router } from 'express';

import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { BlogsValidation } from './Blogs.validation';
import { BlogsController } from './Blogs.controller';
const router = Router();

router.post(
    '/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(BlogsValidation.createBlogs),
    BlogsController.insertDB
  );
  
  router.get('/', BlogsController.getAllDb);
  router.get('/:id', BlogsController.getSingleDataById);
  
  router.patch(
    '/:id',
    validateRequest(BlogsValidation.updateBlogs),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    BlogsController.updateOneInDB
  );
  
  router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    BlogsController.deleteByIdFromDB
  );

export const blogsRoutes = router;
