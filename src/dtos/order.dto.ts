export const enum OrderStatusENUM {
    RECEIVED = 'RECEIVED',
    PREPARATION = 'PREPARATION',
    READY = 'READY',
    FINISHED = 'FINISHED',
}

export interface CreateOrderDTO {
    orderId: number;
    status: OrderStatusENUM;
}

export interface UpdateOrderDTO extends CreateOrderDTO {
    updatedBy: number;
    customerName?: string;
    customerNumber?: string;
 };

export interface UpdateOrderModelDTO extends UpdateOrderDTO { };

export interface SaveHistoryDTO {
    orderId: number;
    prev: OrderStatusENUM;
    current: OrderStatusENUM;
}

