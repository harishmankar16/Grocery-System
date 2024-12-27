import { NextFunction, Request, Response } from "express";
import { handleResult } from "../../utilities/app.util";
import { AppServerConstant } from "../../constants/constants";
import { OrderItemService } from "./order_item.service";

export class OrderItemController {

    private orderItemService: OrderItemService;

    constructor() {
        this.orderItemService = new OrderItemService();
    }


    public async orderGroceryItems(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = 2; 
            const items = req.body.items; 
            if (!items || items.length === 0) {
                return res.status(400).json({ message: "Items cannot be empty" });
            }
            const result = await this.orderItemService.orderGroceryItems(userId, items);
            handleResult(res, AppServerConstant.RESPONSE_CODE.OK, AppServerConstant.SUCCESS_MESSAGES.SUCCESS, result);
        } catch (error) {
            console.log(error);
            error.statusCode = 400;
            return next(error);
        }
    }
}