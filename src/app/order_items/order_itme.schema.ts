import { DataTypes } from "sequelize";


export const OrderItemsSchema = () => {
    return {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "id"
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "order_id"
        },
        groceryItemId : {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "grocery_item_id"
        },
        quantity:{
            type: DataTypes.INTEGER,
            field:"quantity"
        }
    }
}