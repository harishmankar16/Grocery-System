import { Sequelize } from "sequelize";
import { AppServerConstant } from "../constants/constants";
import { logger } from "../utilities/log";
import { UserModel } from "../app/user/user.model";
import { OrderModel } from "../app/orders/order.model";
import { OrderItemsModel } from "../app/order_items/order_item.model";
import { GroceryItemModel } from "../app/grocery_items/grocery_items.model";

export class ModelLoader
{

    private static instance: ModelLoader;
    private userModel : UserModel
    private ordersModel : OrderModel
    private orderItemsModel : OrderItemsModel;
    private groceryItemsModel : GroceryItemModel;


    private constructor ()
    {

        this.userModel = UserModel.getInstance();
        this.ordersModel = OrderModel.getInstance();
        this.orderItemsModel = OrderItemsModel.getInstance();
        this.groceryItemsModel = GroceryItemModel.getInstance()


    }

    public static getInstance (): ModelLoader
    {
        if ( !ModelLoader.instance )
        {
            ModelLoader.instance = new ModelLoader();
        }
        return ModelLoader.instance;
    }

    public initializeModels ( sequelize: Sequelize ): void
    {
        try
        {
            this.userModel.initializeModel(sequelize);
            this.ordersModel.initializeModel(sequelize);
            this.orderItemsModel.initializeModel(sequelize);
            this.groceryItemsModel.initializeModel(sequelize);
           
            

        } catch ( error )
        {
            logger.error( `${ AppServerConstant.ERROR_MESSAGES.DB_MODELS_INIT_FAILED } - ${ error.message }` );
            console.log( error )
        }
    }

    public associateModels (): void
    {
        try
        {

            this.userModel.associatedModel();
            this.ordersModel.associatedModel();
            this.orderItemsModel.associatedModel();
            this.groceryItemsModel.associatedModel();

        } catch ( error )
        {
            
            logger.error( `${ AppServerConstant.ERROR_MESSAGES.DB_MODELS_ASSOCIATION_FAILED } - ${ error.message }` );
            console.log( error );

        }
    }
}


