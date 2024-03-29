import { ConnectQueueOptions, QueueService } from '@interfaces/queue.service';
import { singleton } from 'tsyringe';
import * as logger from '@logger';
import amqplib from 'amqplib';

@singleton()
export class AmqplibQueueService implements QueueService {
    private conn: amqplib.Connection | undefined;

    constructor() {
        this.conn = undefined;
    }

    connect = async (options: ConnectQueueOptions): Promise<void> => {
        const { user, password, host } = options;

        this.conn = await amqplib.connect(`amqps://${user}:${password}@${host}/${user}`);
    };

    listen = async (queue: string, callback: Function): Promise<void> => {
        const channel = await this.conn!.createChannel();

        await channel.assertQueue(queue);

        channel.consume(queue, async (msg) => {
            if (!msg) return;

            logger.info(`[${queue}] Recieved: ${msg.content.toString()}`);

            try {
                const data = JSON.parse(msg.content.toString());

                await callback(data);
            } catch (err) {
                console.log(`[${queue}] Error on parse object ${msg.content.toString()}`);
            } finally {
                channel.ack(msg);
            }
        });
    };

    send = async (queue: string, content: string): Promise<void> => {
        const channel = await this.conn!.createChannel();

        channel.sendToQueue(queue, Buffer.from(content));
    };

    sendToExchange = async (name: string, type: string, durable: boolean, content: string): Promise<void> => {
        const channel = await this.conn!.createChannel();

        await channel.assertExchange(name, type, { durable });

        channel.publish(name, '', Buffer.from(content));
    };
}
