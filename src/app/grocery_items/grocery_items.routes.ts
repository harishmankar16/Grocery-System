import { Router } from "express";
import { GroceryItemController } from "./grocery_items.controller";
import { AuthenticationMiddleWare } from "../authentication/authentication.middleware";




export class GroceryItemRoutes{
    public router:Router;

    private readonly groceryItemController:GroceryItemController;
    private authenticationMiddleware: AuthenticationMiddleWare;

    constructor(){
        this.router = Router();
        this.groceryItemController = new GroceryItemController();
        this.authenticationMiddleware = new AuthenticationMiddleWare()
        this.routes()
    }

    public routes():void{
        this.router.post(
            "/admin/grocery-items",
            this.authenticationMiddleware.authorization.bind(this.authenticationMiddleware),
            this.authenticationMiddleware.authorizeAdmin.bind(this.authenticationMiddleware),
            this.groceryItemController.createGroceryItems.bind(this.groceryItemController)
        );

        this.router.get(
            "/admin/grocery-items",
            this.authenticationMiddleware.authorization.bind(this.authenticationMiddleware),
            this.authenticationMiddleware.authorizeAdmin.bind(this.authenticationMiddleware),
            this.groceryItemController.getAllGroceryItems.bind(this.groceryItemController)
        );

        this.router.patch(
            "/admin/grocery-items/:id",
            this.authenticationMiddleware.authorization.bind(this.authenticationMiddleware),
            this.authenticationMiddleware.authorizeAdmin.bind(this.authenticationMiddleware),
            this.groceryItemController.updateGroceryItem.bind(this.groceryItemController)
        );

        this.router.delete(
            "/admin/grocery-items/:id",
            this.authenticationMiddleware.authorization.bind(this.authenticationMiddleware),
            this.authenticationMiddleware.authorizeAdmin.bind(this.authenticationMiddleware),
            this.groceryItemController.deleteGroceryItem.bind(this.groceryItemController)
        );

        this.router.get(
            "/user/grocery-items/available",
            this.groceryItemController.getAvailableGroceryItem.bind(this.groceryItemController)
        );
    }
}