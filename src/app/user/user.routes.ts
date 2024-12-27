import { Router } from "express";
import { UserController } from "./user.controller";



export class UserRoutes{
    public router:Router;

    private readonly userController:UserController;


    constructor(){
        this.router = Router();
        this.userController = new UserController();
        this.routes()
    }

    public routes():void{
        this.router.post(
            "/users/register",
            this.userController.createUser.bind(this.userController)
        );

        this.router.post(
            "/user/login",
            this.userController.login.bind(this.userController)
        );

        this.router.post(
            "/admin/register",
            this.userController.createAdmin.bind(this.userController)
        );
    }
}