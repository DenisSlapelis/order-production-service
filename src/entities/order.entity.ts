import { CreateOrderDTO, OrderStatusENUM } from "@dtos/order.dto";

export class Order {
    readonly orderId: string;
    readonly status: OrderStatusENUM;

    constructor(params: CreateOrderDTO) {
        this.orderId = params.orderId;
        this.status = params.status;
    }
}
