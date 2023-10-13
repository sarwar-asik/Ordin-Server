import express from 'express';
import { authRoutes } from '../modules/Auth/Auth.route';
import { userRoutes } from '../modules/Users/Users.route';
import { servicesRoutes } from '../modules/Services/Services.route';
import { cartRoutes } from '../modules/Cart/Cart.route';
import { categoryRoutes } from '../modules/Category/Category.route';

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
    routes:cartRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
