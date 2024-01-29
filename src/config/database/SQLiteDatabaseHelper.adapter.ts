import { CountOptions, ModelStatic, Sequelize } from "sequelize";
import { singleton } from "tsyringe";
import * as logger from '@logger';
import { Database, Models } from "@interfaces/database.interface";
import { OrderDB, OrderDBProps } from "./models/sequelize-order.model";

@singleton()
export class SQLiteDatabaseHelper implements Database {
    private database: Sequelize;
    private readonly models: Record<Models, ModelStatic<any> | null>;

    constructor() {
        this.database = new Sequelize({
            dialect: 'sqlite',
            storage: './src/config/database/order_production_db.sqlite',
            logging: console.log,
        });
        this.models = {
            Order: null
        };
    }

    private initModels() {
        const Order = this.database.define<OrderDB>('Order', OrderDBProps, { tableName: 'orders', paranoid: true, underscored: true });

        this.models.Order = Order;
    }

    connect = async () => {
        this.initModels();

        await this.database.sync({ force: true });

        await this.authenticate();
    };

    authenticate = async () => {
        await this.database.authenticate().catch(err => {
            logger.error(`SEQUELIZE ERROR ON AUTHENTICATE: ${JSON.stringify(err)}`);

            throw err;
        });
    }

    async create(model: Models, params: any): Promise<any> {
        const result = await this.models[model]?.create(params);

        return result?.dataValues;
    }

    async findAll(model: Models, options: any) {
        const results = await this.models[model]?.findAll(options);

        return results?.map(result => result.dataValues) ?? [];
    }

    async findOne(model: Models, options: any) {
        const result = await this.models[model]?.findOne(options);

        return result?.dataValues;
    }

    async findById(model: Models, id: any) {
        const result = await this.models[model]?.findByPk(id);

        return result?.dataValues;
    }

    async getById(model: Models, id: number) {
        return this.models[model]?.findByPk(id);
    }

    async update(model: Models, newValues: any, filter: any) {
        return this.models[model]?.update({
            ...newValues,
            updatedAt: new Date(),
        }, filter);
    }

    async delete(model: Models, newValues: any, filter: any) {
        return this.models[model]?.update({
            ...newValues,
            deletedAt: new Date(),
        }, {
            where: { ...filter },
        });
    }

    async count(model: Models, options: CountOptions) {
        return this.models[model]?.count(options);
    }

    async sum(model: Models, field: string) {
        return this.models[model]?.sum(field);
    }
}

