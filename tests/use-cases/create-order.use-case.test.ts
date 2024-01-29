import { database } from "@env";
import { OrderRepository } from "@interfaces/order-repository.interface";
import { SQLiteOrderRepository } from "@repositories/order/sqlite-order.repository";
import { CreateOrderUseCase } from "@useCases/create-order.use-case";

describe('Create order use case', () => {
    let repository: OrderRepository;
    let useCase: CreateOrderUseCase;

    beforeAll(async () => {
        await database.connect();

        repository = new SQLiteOrderRepository();
        useCase = new CreateOrderUseCase(repository);
    });

    describe('create', () => {
        test('should create correctly', async () => {
            const result = await useCase.create(1, 1);

            delete result.createdAt;
            delete result.updatedAt;

            expect(result).toEqual({
                createdBy: 1,
                id: 1,
                orderId: 1,
                status: "RECEIVED",
            });
        });

        test('should throw an error on create with duplicate orderId', async () => {
            expect(async () => {
                await useCase.create(1, 1)
            }).rejects.toThrow();
        });
    });

    describe('checkIfAlreadyExists method', () => {
        test('should not throw an error on checks with new orderId', async () => {
            const spyUseCase = {
                checkIfAlreadyExists: (orderId) => useCase['checkIfAlreadyExists'],
            };

            const spy = jest.spyOn(spyUseCase, 'checkIfAlreadyExists');

            spyUseCase.checkIfAlreadyExists(2);

            expect(spy).toHaveBeenCalled();
        });

        test('should throw an error on create with duplicate orderId', async () => {
            expect(useCase['checkIfAlreadyExists'](1)).rejects.toThrow();
        });
    });
});
