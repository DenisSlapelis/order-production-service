import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model } from 'sequelize';

export interface OrderDB extends Model<InferAttributes<OrderDB>, InferCreationAttributes<OrderDB>> {
    id: CreationOptional<number>;
    orderId: number;
    status: string;
}

export const OrderDBProps = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
};
