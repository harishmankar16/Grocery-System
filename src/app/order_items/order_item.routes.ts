import { Router } from "express";
import { OrderItemController } from "./order_item.controller";
import { AuthenticationMiddleWare } from "../authentication/authentication.middleware";


export class OrderItemRoutes{
    public router:Router;

    private readonly orderItemController:OrderItemController;
    private authenticationMiddleware: AuthenticationMiddleWare;

    constructor(){
        this.router = Router();
        this.orderItemController = new OrderItemController();
        this.authenticationMiddleware = new AuthenticationMiddleWare()
        this.routes()
    }

    public routes():void{
        

        this.router.post(
            "/user/grocery-items/order",
            this.authenticationMiddleware.authorization.bind(this.authenticationMiddleware),
            this.authenticationMiddleware.authorizeUser.bind(this.authenticationMiddleware),
            this.orderItemController.orderGroceryItems.bind(this.orderItemController)
        );
    }
}