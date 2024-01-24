import { OrderStatusENUM } from '@dtos/order.dto';
import { OrderRepository } from '@interfaces/order-repository.interface';

export class CreateOrderUseCase {
    constructor(private repository: OrderRepository) { }

    create = async (orderId: number, createdBy: number) => {
        await this.checkIfAlreadyExists(orderId);

        const initialStatus = OrderStatusENUM.RECEIVED;

        await this.repository.create({ orderId, status: initialStatus, createdBy });
    }

    private checkIfAlreadyExists = async (orderId: number) => {
        const result = await this.repository.getByOrderId(orderId);

        if (result) throw new Error('Order already exists');
    }
}
