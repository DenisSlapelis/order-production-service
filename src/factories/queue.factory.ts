import { env, queue } from '@env';
import { makeCreateOrderUseCase, makeUpdateOrderUseCase } from './order.factory';
import { UpdateOrderDTO } from '@dtos/order.dto';
import * as logger from '@logger';

export const listenQueues = async () => {
    await queue.connect({
        host: env.getValue('AMQP_HOST'),
        user: env.getValue('AMQP_USER'),
        password: env.getValue('AMQP_PASS'),
    });

    await Promise.all([
        queue.listen(env.getValue('NEW_ORDER_QUEUE'), newOrderCallback),
        queue.listen(env.getValue('CHANGE_STATUS_QUEUE'), changeStatusCallback),
    ]);
};

const newOrderCallback = async (item: any) => {
    const useCase = makeCreateOrderUseCase();

    const createdBy = item.createdBy ?? 1;
    const orderId = item.id;

    await useCase.create(orderId, createdBy).catch(async (err) => {
        logger.error(`== newOrderCallback error: ${err.message}`);

        const errorQueue = env.getValue('NEW_ORDER_ERROR_QUEUE');

        await queue.send(errorQueue, JSON.stringify({ message: err.message, item })).catch((queueError) => {
            logger.error(`== newOrderCallback queue error: ${queueError.message}`);
        });
    });

    logger.info(`Pedido criado - id: ${orderId}`);
};

const changeStatusCallback = async (item: UpdateOrderDTO) => {
    const useCase = makeUpdateOrderUseCase();

    await useCase.update(item).catch(async (err) => {
        logger.error(`== changeStatusCallback error: ${err.message}`);

        const errorQueue = env.getValue('CHANGE_STATUS_ERROR_QUEUE');

        await queue.send(errorQueue, JSON.stringify({ message: err.message, item })).catch((queueError) => {
            logger.error(`== changeStatusCallback queue error: ${queueError.message}`);
        });
    });
};
