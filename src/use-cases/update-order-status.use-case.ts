import { OrderStatusENUM } from '@dtos/order.dto';
import { OrderRepository } from '@interfaces/order-repository.interface';

export class UpdateOrderStatusUseCase {
    constructor(private repository: OrderRepository) { }

    update = async (orderId: number, status: OrderStatusENUM) => {
        const order = await this.repository.getByOrderId(orderId);

        if (!order) throw new Error(`Order with id ${orderId} was not found.`);

        const currentStatus = order.status;

        this.validateStatus(currentStatus, status);

        await this.repository.update({ orderId, status });
    }

    private validateStatus = async (currentStatus: OrderStatusENUM, newStatus: OrderStatusENUM) => {
        const handleStauts = {
            [OrderStatusENUM.PREPARATION]: OrderStatusENUM.RECEIVED,
            [OrderStatusENUM.READY]: OrderStatusENUM.PREPARATION,
            [OrderStatusENUM.FINISHED]: OrderStatusENUM.READY,
        }

        if (handleStauts[currentStatus] != newStatus) throw new Error(`Invalid status. You can't change status ${currentStatus} to ${newStatus}.`);
    }
}
