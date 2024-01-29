import { OrderStatusENUM } from '@dtos/order.dto';
import { OrderRepository } from '@interfaces/order-repository.interface';

export class UpdateOrderStatusUseCase {
    constructor(private repository: OrderRepository) { }

    update = async (orderId: number, status: OrderStatusENUM) => {
        const order = await this.repository.getByOrderId(orderId);

        if (!order) throw new Error(`Order with id ${orderId} was not found.`);

        const currentStatus = order.status;

        this.validateStatus(currentStatus, status);

        return this.repository.update({ orderId, status });
    }

    validateStatus = (currentStatus: OrderStatusENUM, newStatus: OrderStatusENUM) => {
        const handleStatus = {
            [OrderStatusENUM.RECEIVED]: OrderStatusENUM.PREPARATION,
            [OrderStatusENUM.PREPARATION]: OrderStatusENUM.READY,
            [OrderStatusENUM.READY]: OrderStatusENUM.FINISHED,
        }

        if (handleStatus[currentStatus] != newStatus) throw new Error(`Invalid status. You can't change status ${currentStatus} to ${newStatus}.`);
    }
}
