
import { UpdateOrderStatusUseCase } from "@useCases/update-order-status.use-case";
import { STATUS_CODE, STATUS_CODE_CAUSE } from "@utils/constants.utils";
import { Request, Response } from 'express';
import * as logger from '@logger';

export class UpdateOrderController {
    constructor(private useCase: UpdateOrderStatusUseCase) { }

    handle = async (req: Request, res: Response) => {
        try {
            this.validRequiredBodyParams(req.body);

            const orderId = Number(req.body.orderId);
            const status = req.body.status;

            const result = await this.useCase.update({ orderId, status, updatedBy: req['sysUserId'] });

            res.status(STATUS_CODE.OK).json(result);
        } catch (error: any) {
            logger.error(error, {
                origin: 'UpdateOrderController',
                stack: error.stack,
            });

            const statusCode = STATUS_CODE_CAUSE[error.cause] ?? STATUS_CODE.SERVER_ERROR;

            res.status(statusCode).json({ message: error?.message ?? error });
        }
    }

    private validRequiredBodyParams = (params) => {
        if (!params.orderId) throw new Error(`Required param 'orderId' was not found.`, { cause: 'Validation Error' });
        if (!params.status) throw new Error(`Required param 'status' was not found.`, { cause: 'Validation Error' });
    }
}
