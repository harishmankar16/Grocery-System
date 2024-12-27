
import { DatabaseConnectionManager } from "../../connection/databaseConnection";
import { GroceryItemModel } from "../grocery_items/grocery_items.model";
import { OrderModel } from "../orders/order.model";
import { OrderItemsModel } from "./order_item.model";
const ENVConfig = require(`../../config/${process.env.NODE_ENV}.json`);

export class OrderItemService {

    private readonly groceryItemModel: GroceryItemModel;
    private readonly orderModel: OrderModel;
    private readonly orderItemModel:OrderItemsModel
    private dbConnectionManager: DatabaseConnectionManager;


    constructor() {
        this.groceryItemModel = GroceryItemModel.getInstance();
        this.orderModel = OrderModel.getInstance();
        this.orderItemModel = OrderItemsModel.getInstance()
        this.dbConnectionManager = DatabaseConnectionManager.getInstance();

    }

    
    public async orderGroceryItems(userId: number, items: { groceryItemId: number, quantity: number }[]) {
        const transaction = await this.dbConnectionManager.dbClient.transaction();
        try {
            // Calculate total price and validate inventory
            let totalPrice = 0;
            for (const item of items) {
                const groceryItem = await this.groceryItemModel.groceryItem.findByPk(item.groceryItemId);
                if (!groceryItem) {
                    throw new Error(`Grocery item with ID ${item.groceryItemId} not found`);
                }
                if (groceryItem.inventory < item.quantity) {
                    throw new Error(`Insufficient inventory for item ${groceryItem.name}`);
                }
                totalPrice += groceryItem.price * item.quantity;
            }

            // Create an order
            const order = await this.orderModel.order.create({
                userId,
                status: "Pending",
                totalPrice
            }, { transaction });

            // Create order items and update inventory
            for (const item of items) {
                await this.orderItemModel.orderItems.create({
                    orderId: order.id,
                    groceryItemId: item.groceryItemId,
                    quantity: item.quantity
                }, { transaction });

                // Update inventory
                const groceryItem = await this.groceryItemModel.groceryItem.findByPk(item.groceryItemId);
                await groceryItem.update({
                    inventory: groceryItem.inventory - item.quantity
                }, { transaction });
            }

            await transaction.commit();
            return { orderId: order.id, status: "Order placed successfully" };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
   
}