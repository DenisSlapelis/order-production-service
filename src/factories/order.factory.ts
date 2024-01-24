import { CreateOrderController } from "@controllers/order/create-order.controller";
import { SQLiteOrderRepository } from "@repositories/order/sqlite-order.repository";
import { CreateOrderUseCase } from "@useCases/create-order.use-case";

export const makeCreateOrderController = () => {
    const createOrderUseCase = makeCreateOrderUseCase();

    return new CreateOrderController(createOrderUseCase);
}

export const makeCreateOrderUseCase = () => {
    const repository = new SQLiteOrderRepository();

    return new CreateOrderUseCase(repository);
}
