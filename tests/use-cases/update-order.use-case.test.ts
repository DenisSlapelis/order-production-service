import { OrderStatusENUM } from "@dtos/order.dto";
import { database } from "@env";
import { OrderRepository } from "@interfaces/order-repository.interface";
import { SQLiteOrderRepository } from "@repositories/order/sqlite-order.repository";
import { UpdateOrderStatusUseCase } from "@useCases/update-order-status.use-case";

describe('Update order use case', () => {
    let repository: OrderRepository;
    let useCase: UpdateOrderStatusUseCase;

    beforeAll(async () => {
        await database.connect();

        repository = new SQLiteOrderRepository();
        useCase = new UpdateOrderStatusUseCase(repository);
    });

    describe('update', () => {
        beforeEach(async () => {
            await database.delete("Order", {}, { orderId: 1 });
            await repository.create({ orderId: 1, status: OrderStatusENUM.RECEIVED, createdBy: 1 });
        });

        test('should update the order status', async () => {
            const spyRepostoryGetByOrderId = jest.spyOn(repository, 'getByOrderId');
            const spyUseCaseValidateStatus = jest.spyOn(useCase, 'validateStatus');
            const spyRepositoryUpdate = jest.spyOn(repository, 'update');

            const result = await useCase.update(1, OrderStatusENUM.PREPARATION);

            delete result.createdAt;
            delete result.updatedAt;
            delete result.deletedAt;

            expect(spyRepostoryGetByOrderId).toHaveBeenCalledWith(1);
            expect(spyUseCaseValidateStatus).toHaveBeenCalledWith(OrderStatusENUM.RECEIVED, OrderStatusENUM.PREPARATION);
            expect(spyRepositoryUpdate).toHaveBeenCalledWith({ orderId: 1, status: OrderStatusENUM.PREPARATION });

            expect(result).toEqual({
                id: 1,
                orderId: 1,
                status: 'PREPARATION',
                createdBy: 1
            });
        });

        test('should throw an error for invalid status order', async () => {
            await expect(useCase.update(1, OrderStatusENUM.RECEIVED)).rejects.toThrow();
        });
    });

    describe('validateStatus', () => {
        test('should throw an error for invalid status order', async () => {
            expect(() => { useCase['validateStatus'](OrderStatusENUM.RECEIVED, OrderStatusENUM.RECEIVED) }).toThrow('Invalid status');
        });
    });
});
