import { configController } from '@utils/dependency.utils';
import { orderRoutes } from './order.routes';
import { Router } from 'express';

export const router = Router();

router.use('/configs', configController.getRouter());
router.use('/orders', orderRoutes);
