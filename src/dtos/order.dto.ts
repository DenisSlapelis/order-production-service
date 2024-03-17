export const enum OrderStatusENUM {
    RECEIVED = 'RECEIVED',
    PREPARATION = 'PREPARATION',
    READY = 'READY',
    FINISHED = 'FINISHED',
    CANCELED = 'CANCELED',
}

export interface CreateOrderDTO {
    orderId: string;
    status: OrderStatusENUM;
}

export interface UpdateOrderDTO extends CreateOrderDTO {
    updatedBy: number;
    customerName?: string;
    customerNumber?: string;
 };

export interface UpdateOrderModelDTO extends UpdateOrderDTO { };

export interface SaveHistoryDTO {
    orderId: string;
    prev: OrderStatusENUM;
    current: OrderStatusENUM;
}

