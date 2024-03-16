import { OrderStatusENUM, UpdateOrderDTO } from '@dtos/order.dto';
import { OrderRepository } from '@interfaces/order-repository.interface';
import { SendSMSUseCase } from './send-sms.use-case';
import { QueueService } from '@interfaces/queue.service';
import { database, env } from '@env';

export class UpdateOrderStatusUseCase {
    constructor(
        private repository: OrderRepository,
        private readonly smsUseCase: SendSMSUseCase,
        private readonly queueService: QueueService
    ) {}

    update = async (params: UpdateOrderDTO) => {
        const { orderId, status, customerName, customerNumber } = params;
        const order = await this.repository.getByOrderId(orderId);

        if (!order) throw new Error(`Order with id ${orderId} was not found.`);

        const currentStatus = order.status;

        this.validateStatus(currentStatus, status);

        const transaction = await database.transaction();

        try {
            const result = await this.repository.update(params);

            if (status == OrderStatusENUM.READY || status == OrderStatusENUM.FINISHED) {
                await this.queueService.sendToExchange(
                    env.getValue('CHANGE_STATUS_EXCHANGE'),
                    env.getValue('CHANGE_STATUS_EXCHANGE_TYPE'),
                    true,
                    JSON.stringify({
                        id: result.orderId,
                        status: result.status,
                    })
                );
            }

            if (customerName && customerNumber) await this.smsUseCase.send(status, customerName, customerNumber);

            transaction.commit();

            return result;
        } catch (err) {
            transaction.rollback();
        }
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
