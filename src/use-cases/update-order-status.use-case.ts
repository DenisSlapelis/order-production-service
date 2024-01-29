import { OrderStatusENUM, UpdateOrderDTO } from '@dtos/order.dto';
import { OrderRepository } from '@interfaces/order-repository.interface';

export class UpdateOrderStatusUseCase {
    constructor(private repository: OrderRepository) { }

    update = async (params: UpdateOrderDTO) => {
        const { orderId, status } = params;
        const order = await this.repository.getByOrderId(orderId);

        if (!order) throw new Error(`Order with id ${orderId} was not found.`);

        const currentStatus = order.status;

        this.validateStatus(currentStatus, status);

        return this.repository.update(params);
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
