import { OrderStatusENUM } from "@dtos/order.dto";
import { database } from "@env";
import { OrderRepository } from "@interfaces/order-repository.interface";
import { SQLiteOrderRepository } from "@repositories/order/sqlite-order.repository";

describe('Update order use case', () => {
    let repository: OrderRepository;

    beforeAll(async () => {
        await database.connect();

        repository = new SQLiteOrderRepository();
    });

    test('should be called with the correct parameters - create', async () => {
        const databaseSpy = jest.spyOn(database, 'create');

        const result = await repository.create({ orderId: 1, createdBy: 1, status: OrderStatusENUM.RECEIVED });

        delete result.createdAt;
        delete result.updatedAt;
        delete result.deletedAt;

        expect(databaseSpy).toHaveBeenCalledTimes(1);
        expect(databaseSpy).toHaveBeenCalledWith('Order', { orderId: 1, createdBy: 1, status: OrderStatusENUM.RECEIVED });

        expect(result).toEqual({
            id: 1,
            orderId: 1,
            status: OrderStatusENUM.RECEIVED,
            createdBy: 1
        });
    });

    test('should be called with the correct parameters - getByOrderId', async () => {
        const databaseSpy = jest.spyOn(database, 'findOne');

        const result = await repository.getByOrderId(1);

        delete result.createdAt;
        delete result.updatedAt;
        delete result.deletedAt;

        expect(databaseSpy).toHaveBeenCalledTimes(1);
        expect(databaseSpy).toHaveBeenCalledWith('Order', {
            where: { orderId: 1 }
        });

        expect(result).toEqual({
            id: 1,
            orderId: 1,
            status: OrderStatusENUM.RECEIVED,
            createdBy: 1
        });
    });

    test('should be called with the correct parameters - update', async () => {
        const databaseSpy = jest.spyOn(database, 'update');

        const result = await repository.update({ orderId: 1, status: OrderStatusENUM.PREPARATION, updatedBy: 1 });

        delete result.createdAt;
        delete result.updatedAt;
        delete result.deletedAt;

        expect(databaseSpy).toHaveBeenCalledTimes(1);
        expect(databaseSpy).toHaveBeenCalledWith("Order", { status: OrderStatusENUM.PREPARATION }, {
            where: { orderId: 1 }
        });

        expect(result).toEqual({
            id: 1,
            orderId: 1,
            status: OrderStatusENUM.PREPARATION,
            createdBy: 1
        });
    });
});
