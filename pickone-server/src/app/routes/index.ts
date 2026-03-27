import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { OrderRoutes } from '../modules/order/order.route';
import { ProductRoutes } from '../modules/product/product.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { UserRoutes } from '../modules/user/user.route';
import { TrackingRoutes } from '../modules/tracking/tracking.route';
import { FacebookEventsRoutes } from '../modules/facebook-events/facebook-events.route';
import { SiteSettingsRoutes } from '../modules/site-settings/site-settings.route';

const router = express.Router();

const moduleRoutes = [
   // ... routes
   {
      path: '/user',
      routes: UserRoutes,
   },
   {
      path: '/auth',
      routes: AuthRoutes,
   },
   {
      path: '/categories',
      routes: CategoryRoutes,
   },
   {
      path: '/product',
      routes: ProductRoutes,
   },
   {
      path: '/order',
      routes: OrderRoutes,
   },
   {
      path: '/review',
      routes: ReviewRoutes,
   },
   {
      path: '/tracking',
      routes: TrackingRoutes,
   },
   {
      path: '/facebook-events',
      routes: FacebookEventsRoutes,
   },
   {
      path: '/site-settings',
      routes: SiteSettingsRoutes,
   },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
