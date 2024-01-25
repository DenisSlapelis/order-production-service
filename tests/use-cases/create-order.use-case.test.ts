import { database } from "@env";
import { OrderRepository } from "@interfaces/order-repository.interface";
import { SQLiteOrderRepository } from "@repositories/order/sqlite-order.repository";
import { CreateOrderUseCase } from "@useCases/create-order.use-case";

describe('Create rural producer use case', () => {
    let repository: OrderRepository;
    let useCase: CreateOrderUseCase;

    beforeAll(async () => {
        await database.connect();

        repository = new SQLiteOrderRepository();
        useCase = new CreateOrderUseCase(repository);
    });

    beforeEach(() => {

    });

    describe('create', () => {
        test('should create correctly', async () => {
            const result = await useCase.create(1, 1);

            delete result.createdAt;
            delete result.updatedAt;

            expect(result).toEqual({
                "createdBy": 1,
                "id": 1,
                "orderId": 1,
                "status": "RECEIVED",
            });
        });
    });
});
