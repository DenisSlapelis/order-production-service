import { CreateOrderController } from "@controllers/order/create-order.controller";
import { UpdateOrderController } from "@controllers/order/update-order.controller";
import { SQLiteOrderRepository } from "@repositories/order/sqlite-order.repository";
import { CreateOrderUseCase } from "@useCases/create-order.use-case";
import { UpdateOrderStatusUseCase } from "@useCases/update-order-status.use-case";
import { makeSendSMSUseCase } from "./sms.factory";
import { queue } from '@env';

export const makeCreateOrderController = () => {
    const useCase = makeCreateOrderUseCase();

    return new CreateOrderController(useCase);
}

export const makeUpdateOrderController = () => {
    const useCase = makeUpdateOrderUseCase();

    return new UpdateOrderController(useCase);
}

export const makeCreateOrderUseCase = () => {
    const repository = new SQLiteOrderRepository();

    return new CreateOrderUseCase(repository);
}

export const makeUpdateOrderUseCase = () => {
    const repository = new SQLiteOrderRepository();
    const SMSUseCase = makeSendSMSUseCase();

    return new UpdateOrderStatusUseCase(repository, SMSUseCase, queue);
}
