import { CreateOrderDTO, SaveHistoryDTO, UpdateOrderDTO } from "@dtos/order.dto";
import { database } from "@env";
import { OrderRepository } from "@interfaces/order-repository.interface";

export class SQLiteOrderRepository implements OrderRepository {
    async create(params: CreateOrderDTO) {
        return database.create('Order', params);
    }

    async getByOrderId(orderId: number) {
        return database.findOne("Order", {
            where: { orderId }
        });
    }

    saveHistory(params: SaveHistoryDTO) {

    }

    update(params: UpdateOrderDTO) {
        const { status, orderId } = params;

        return database.update("Order", { status }, {
            where: { orderId }
        });
    }
}
