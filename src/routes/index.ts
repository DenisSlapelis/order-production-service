import { healthCheckController, loginController } from '../utils/dependency.utils';
import { Router } from 'express';
import { router as routesV1 } from './v1/routes'

export const router = Router();

// health check
const healthCheckRoutes = Router();
healthCheckRoutes.get('/', healthCheckController.check);

// login
const loginRoutes = Router();
loginRoutes.post('/', loginController.login);

// custom routes
router.use('/healthcheck', healthCheckRoutes);
router.use('/login', loginRoutes);

// v1 routes
router.use('/api/v1', routesV1);
