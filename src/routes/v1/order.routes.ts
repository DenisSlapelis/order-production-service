import { Router } from 'express';
import { makeCreateOrderController } from 'src/factories/order.factory';

export const orderRoutes = Router();

// ** POST **
orderRoutes.post('/', makeCreateOrderController().handle);

// // ** GET **

// // ** PUT **
// orderRoutes.put('/:id', makeUpdateOrderStatusController().handle);

// // ** DELETE **
