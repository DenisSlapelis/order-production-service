import { CreateOrderDTO, SaveHistoryDTO, UpdateOrderDTO } from "@dtos/order.dto";
import { database } from "@env";
import { OrderRepository } from "@interfaces/order-repository.interface";

export class SQLiteOrderRepository implements OrderRepository {
    create(params: CreateOrderDTO) {
        return database.create('Order', params);
    }

    getByOrderId(orderId: number) {

    }

    saveHistory(params: SaveHistoryDTO) {

    }

    update(params: UpdateOrderDTO) {

    }
}
