
import { Sequelize } from "sequelize";
import { groceryItemsSchema } from "./grocery_items.schema";
export class GroceryItemModel {
    private static instance: GroceryItemModel;
    public groceryItem;

    public static getInstance() {
        if (!GroceryItemModel.instance) {
            GroceryItemModel.instance = new GroceryItemModel();
        }
        return GroceryItemModel.instance;
    }

    public initializeModel(sequelize : Sequelize){
        this.groceryItem = sequelize.define("tbl_grocery_items",groceryItemsSchema());
    }

    public associatedModel(){
        
    }

}