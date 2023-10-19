import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './Review.controller';
import { ReviewValidation } from './Review.validation';

const router = Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ReviewValidation.createReview),
  ReviewController.insertDB
);

router.get('/',  ReviewController.getAllDb);
router.get(
  '/userReview',
  auth(ENUM_USER_ROLE.USER),
  ReviewController.getUserAllReview
);

router.get('/:serviceId', ReviewController.getUserReviewByService);

router.get('/:id', ReviewController.getSingleDataById);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  ReviewController.updateOneInDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ReviewController.deleteByIdFromDB
);

export const reviewRoutes = router;
