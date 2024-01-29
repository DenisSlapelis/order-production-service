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
        throw new Error(`Method not implemented yet. Params: ${params}`);
    }

    async update(params: UpdateOrderDTO) {
        const { status, orderId } = params;

        await database.update("Order", { status }, {
            where: { orderId }
        });

        return this.getByOrderId(params.orderId);
    }
}
