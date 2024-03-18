import { CreateOrderUseCase } from "@useCases/create-order.use-case";
import { STATUS_CODE, STATUS_CODE_CAUSE } from "@utils/constants.utils";
import { Request, Response } from 'express';
import * as logger from '@logger';

export class CreateOrderController {
    constructor(private useCase: CreateOrderUseCase) { }

    handle = async (req: Request, res: Response) => {
        try {
            this.validRequiredBodyParams(req.body);
            const orderId = req.body.orderId;

            const result = await this.useCase.create(orderId, req['sysUserId']);

            res.status(STATUS_CODE.CREATED).json(result);
        } catch (error: any) {
            logger.error(error, {
                origin: 'CreateOrderController',
                stack: error.stack,
            });

            const statusCode = STATUS_CODE_CAUSE[error.cause] ?? STATUS_CODE.SERVER_ERROR;

            res.status(statusCode).json({ message: error?.message ?? error });
        }
    }

    private validRequiredBodyParams = (params) => {
        if (!params.orderId) throw new Error(`Required param 'orderId' was not found.`, { cause: 'Validation Error' });
    }
}
