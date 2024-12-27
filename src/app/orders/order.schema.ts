import { DataTypes } from "sequelize";


export const OrderSchema = () => {
    return {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "id"
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id"
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "status"
        },
        totalPrice:{
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'total_price'
        }
    }
}