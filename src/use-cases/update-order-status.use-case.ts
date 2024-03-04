import { OrderStatusENUM, UpdateOrderDTO } from '@dtos/order.dto';
import { OrderRepository } from '@interfaces/order-repository.interface';
import { SendSMSUseCase } from './send-sms.use-case';

export class UpdateOrderStatusUseCase {
    constructor(
        private repository: OrderRepository,
        private readonly smsUseCase: SendSMSUseCase
    ) {}

    update = async (params: UpdateOrderDTO) => {
        const { orderId, status, customerName, customerNumber } = params;
        const order = await this.repository.getByOrderId(orderId);

        if (!order) throw new Error(`Order with id ${orderId} was not found.`);

        const currentStatus = order.status;

        this.validateStatus(currentStatus, status);

        await this.repository.update(params);

        if (customerName && customerNumber) await this.smsUseCase.send(status, customerName, customerNumber);
    };

    validateStatus = (currentStatus: OrderStatusENUM, newStatus: OrderStatusENUM) => {
        const handleStatus = {
            [OrderStatusENUM.RECEIVED]: OrderStatusENUM.PREPARATION,
            [OrderStatusENUM.PREPARATION]: OrderStatusENUM.READY,
            [OrderStatusENUM.READY]: OrderStatusENUM.FINISHED,
        };

        if (handleStatus[currentStatus] != newStatus)
            throw new Error(`Invalid status. You can't change status ${currentStatus} to ${newStatus}.`);
    };
}
