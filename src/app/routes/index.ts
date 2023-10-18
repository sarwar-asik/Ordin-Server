import express from 'express';
import { authRoutes } from '../modules/Auth/Auth.route';
import { blogsRoutes } from '../modules/Blogs/Blogs.route';
import { BookingRoutes } from '../modules/Booking/Booking.route';
import { cartRoutes } from '../modules/Cart/Cart.route';
import { categoryRoutes } from '../modules/Category/Category.route';
import { reviewRoutes } from '../modules/Review/Review.route';
import { servicesRoutes } from '../modules/Services/Services.route';
import { userRoutes } from '../modules/Users/Users.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/user',
    routes: userRoutes,
  },
  {
    path: '/auth',
    routes: authRoutes,
  },
  {
    path: '/category',
    routes: categoryRoutes,
  },
  {
    path: '/service',
    routes: servicesRoutes,
  },
  {
    path: '/cart',
    routes: cartRoutes,
  },
  {
    path: '/booking',
    routes: BookingRoutes,
  },
  {
    path: '/reviews',
    routes: reviewRoutes,
  },
  {
    path: '/blogs',
    routes: blogsRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
