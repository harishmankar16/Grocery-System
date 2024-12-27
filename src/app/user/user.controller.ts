import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { handleResult } from "../../utilities/app.util";
import { AppServerConstant } from "../../constants/constants";

export class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.createUser(req.body);
            handleResult(res, AppServerConstant.RESPONSE_CODE.OK, AppServerConstant.SUCCESS_MESSAGES.SUCCESS, user);
        } catch (error) {
            console.log(error);
            error.statusCode = 400;
            return next(error);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body);
            
            const user = await this.userService.login(req.body.email, req.body.password);
            handleResult(res, AppServerConstant.RESPONSE_CODE.OK, AppServerConstant.SUCCESS_MESSAGES.SUCCESS, user);
        } catch (error) {
            console.log(error);
            error.statusCode = 400;
            return next(error);
        }
    }

    public async createAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.createAdmin(req.body);
            handleResult(res, AppServerConstant.RESPONSE_CODE.OK, AppServerConstant.SUCCESS_MESSAGES.SUCCESS, user);
        } catch (error) {
            console.log(error);
            error.statusCode = 400;
            return next(error);
        }
    }

}