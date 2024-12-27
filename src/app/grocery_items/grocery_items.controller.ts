import { NextFunction, Request, Response } from "express";
import { handleResult } from "../../utilities/app.util";
import { AppServerConstant } from "../../constants/constants";
import { GroceryItemService } from "./grocery_items.service";

export class GroceryItemController {

    private groceryItemService: GroceryItemService;

    constructor() {
        this.groceryItemService = new GroceryItemService();
    }

    public async createGroceryItems(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.groceryItemService.createGroceryItems(req.body);
            handleResult(res, AppServerConstant.RESPONSE_CODE.OK, AppServerConstant.SUCCESS_MESSAGES.SUCCESS, user);
        } catch (error) {
            console.log(error);
            error.statusCode = 400;
            return next(error);
        }
    }

    public async getAllGroceryItems(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.groceryItemService.getAllGroceryItems();
            handleResult(res, AppServerConstant.RESPONSE_CODE.OK, AppServerConstant.SUCCESS_MESSAGES.SUCCESS, user);
        } catch (error) {
            console.log(error);
            error.statusCode = 400;
            return next(error);
        }
    }

    public async updateGroceryItem(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.body;
            const data = await this.groceryItemService.updateGroceryItem(+req.params.id, payload);
            handleResult(res, AppServerConstant.RESPONSE_CODE.OK, AppServerConstant.SUCCESS_MESSAGES.SUCCESS, data);
        } catch (error) {
            console.log(error);
            error.statusCode = 400;
            return next(error);
        }
    }

    public async deleteGroceryItem(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.groceryItemService.deleteGroceryItem(+req.params.id);
            handleResult(res, AppServerConstant.RESPONSE_CODE.OK, AppServerConstant.SUCCESS_MESSAGES.SUCCESS, data);
        } catch (error) {
            console.log(error);
            error.statusCode = 400;
            return next(error);
        }
    }

    
    public async getAvailableGroceryItem(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.groceryItemService.getAvailableGroceryItem();
            handleResult(res, AppServerConstant.RESPONSE_CODE.OK, AppServerConstant.SUCCESS_MESSAGES.SUCCESS, data);
        } catch (error) {
            console.log(error);
            error.statusCode = 400;
            return next(error);
        }
    }
}