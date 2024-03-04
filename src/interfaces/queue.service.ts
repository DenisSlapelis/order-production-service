export interface QueueService {
    connect: (options: ConnectQueueOptions) => Promise<void>;
    listen: (queue: string, callback: Function) => Promise<void>;
    send: (queue: string, content: string) => Promise<void>;
}

export interface ConnectQueueOptions {
    host: string;
    user: string;
    password: string;
}
