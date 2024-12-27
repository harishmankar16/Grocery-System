
import { DatabaseConnectionManager } from "../../connection/databaseConnection";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GroceryItemModel } from "./grocery_items.model";
import { Op } from "sequelize";
const ENVConfig = require(`../../config/${process.env.NODE_ENV}.json`);

export class GroceryItemService {

    private readonly groceryItemModel: GroceryItemModel;
    private dbConnectionManager: DatabaseConnectionManager;


    constructor() {
        this.groceryItemModel = GroceryItemModel.getInstance();
        this.dbConnectionManager = DatabaseConnectionManager.getInstance();

    }

    public async createGroceryItems(payload) {
        const groceryItem = await this.groceryItemModel.groceryItem.create(payload);
        return groceryItem;
    }

    public async getAllGroceryItems() {
        const groceryItem = await this.groceryItemModel.groceryItem.findAll();
        return groceryItem;
    }

    public async deleteGroceryItem(id: number) {
        const groceryItem = await this.groceryItemModel.groceryItem.findByPk(id);
    
        if (!groceryItem) {
          throw new Error("Grocery item not found");
        }
    
        await groceryItem.destroy();
        return { message: "Grocery item deleted successfully" };
      }
    
      public async updateGroceryItem(id: number, payload: Partial<any>) {
        const groceryItem = await this.groceryItemModel.groceryItem.findByPk(id);
    
        if (!groceryItem) {
          throw new Error("Grocery item not found");
        }
    
        const updatedGroceryItem = await groceryItem.update(payload);
        return updatedGroceryItem;
      }

      
    public async getAvailableGroceryItem() {
        try {
          const availableItems = await this.groceryItemModel.groceryItem.findAll({
            where: {
              inventory: {
                [Op.gt]: 0,
              },
            },
          });
      
          return availableItems;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
}