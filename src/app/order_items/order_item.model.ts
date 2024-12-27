
import { Sequelize } from "sequelize";
import { OrderItemsSchema } from "./order_itme.schema";
export class OrderItemsModel {
    private static instance: OrderItemsModel;
    public orderItems;

    public static getInstance() {
        if (!OrderItemsModel.instance) {
            OrderItemsModel.instance = new OrderItemsModel();
        }
        return OrderItemsModel.instance;
    }

    public initializeModel(sequelize : Sequelize){
        this.orderItems = sequelize.define("tbl_order_items",OrderItemsSchema());
    }

    public associatedModel(){
        
    }

}