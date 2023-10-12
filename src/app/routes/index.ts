import express from 'express';
import { userRoutes } from '../modules/Users/Users.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/user",
    routes: userRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
