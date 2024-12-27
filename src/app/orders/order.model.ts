
import { Sequelize } from "sequelize";
import { OrderSchema } from "./order.schema";
export class OrderModel {
    private static instance: OrderModel;
    public order;

    public static getInstance() {
        if (!OrderModel.instance) {
            OrderModel.instance = new OrderModel();
        }
        return OrderModel.instance;
    }

    public initializeModel(sequelize : Sequelize){
        this.order = sequelize.define("tbl_orders",OrderSchema());
    }

    public associatedModel(){
        
    }

}