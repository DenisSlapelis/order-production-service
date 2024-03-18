import { CreateDTO } from "@dtos/generic.dto";
import { CreateOrderDTO, SaveHistoryDTO, UpdateOrderDTO } from "@dtos/order.dto";

export interface OrderRepository {
    create(params: CreateOrderDTO & CreateDTO);
    update(params: UpdateOrderDTO);
    getByOrderId(orderId: string);
    saveHistory(params: SaveHistoryDTO);
}
