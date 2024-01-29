import { Router } from 'express';
import { makeCreateOrderController, makeUpdateOrderController } from 'src/factories/order.factory';

export const orderRoutes = Router();

// ** POST **
orderRoutes.post('/', makeCreateOrderController().handle);

// ** GET **

// ** PUT **
orderRoutes.put('/', makeUpdateOrderController().handle);

// ** DELETE **
