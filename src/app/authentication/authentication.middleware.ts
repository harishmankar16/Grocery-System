import { NextFunction, Request, Response } from "express";
import { UserModel } from "../user/user.model";
import jwt from "jsonwebtoken";
import { IRequest } from "./authentication.interface";
const ENVConfig = require('../../config/development.json');

export class AuthenticationMiddleWare {



    private readonly userModel: UserModel;

    constructor() {

        this.userModel = UserModel.getInstance();
    }

    public async authorizeAdmin(req: IRequest, res: Response, next: NextFunction): Promise<void> {

        try {


            if (req.user.role !== 'admin') {
                const error = new Error('Access denied. Only admins are allowed.');
                error['statusCode'] = 403; // Forbidden
                throw error;
            }

            next();
        } catch (error) {

            console.log(error)
            error.statusCode = 400;

            return next(error)
        }
    }

    public async authorizeUser(req: IRequest, res: Response, next: NextFunction): Promise<void> {

        try {


            if (req.user.role !== 'user') {
                const error = new Error('Access denied. Only users are allowed.');
                error['statusCode'] = 403; // Forbidden
                throw error;
            }

            next();
        } catch (error) {

            console.log(error)
            error.statusCode = 400;

            return next(error)
        }
    }


    public async authorization(req: IRequest, res: Response, next: NextFunction) {
        try {
            let token;

            if (!req.headers.authorization) {
                throw new Error("You are not logged in!");
            }

            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer")
            ) {
                token = req.headers.authorization.split(" ")[1];
            }

            if (!token) {
                throw new Error("You are not logged in!");
            }

            const decoded: any = jwt.verify(token, ENVConfig.JWT_SECRET_KEY);

            const user = await this.userModel.user.findOne({
                where: { id: decoded.id },
                attributes: { exclude: ["password"] },
            });

            if (!user) {
                throw new Error("The user belonging to this token does not exist");
            }

            if (!user.token) {
                throw new Error("user is logged out!");
            }

            req.user = user;

            next();
        } catch (error) {
            console.log(error);
            return next(error)

        }
    }

}