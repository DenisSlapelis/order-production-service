import { OrderStatusENUM } from '@dtos/order.dto';
import { OrderRepository } from '@interfaces/order-repository.interface';

export class CreateOrderUseCase {
    constructor(private repository: OrderRepository) { }

    create = async (orderId: string, createdBy: number) => {
        await this.checkIfAlreadyExists(orderId);

        const initialStatus = OrderStatusENUM.RECEIVED;

        return this.repository.create({ orderId, status: initialStatus, createdBy });
    }

    private checkIfAlreadyExists = async (orderId: string) => {
        const result = await this.repository.getByOrderId(orderId);

        if (result) throw new Error('Order already exists');
    }
}
