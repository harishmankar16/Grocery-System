import { UserModel } from "./user.model";
import { DatabaseConnectionManager } from "../../connection/databaseConnection";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GroceryItemModel } from "../grocery_items/grocery_items.model";
import { Op } from "sequelize";
const ENVConfig = require(`../../config/${process.env.NODE_ENV}.json`);

export class UserService {

    private readonly userModel: UserModel;
    private readonly groceryItemModel: GroceryItemModel;
    private dbConnectionManager: DatabaseConnectionManager;
    

    constructor() {
        this.userModel = UserModel.getInstance();
        this.groceryItemModel = GroceryItemModel.getInstance();
        this.dbConnectionManager = DatabaseConnectionManager.getInstance();
       
    }

    public async createUser(payload) {
        try {
            const user = await this.userModel.user.create(payload);
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async signToken(id): Promise<any> {
        return jwt.sign({ id: id }, ENVConfig.JWT_SECRET_KEY);
    }

    public async login(email: string, password: string): Promise<any> {
        try {
            let result = null;

            const userData = await this.dbConnectionManager.dbClient.transaction(
                async (t) => {
                    const user = await await this.userModel.user.findOne({
                        raw: true,
                        where: { email },
                        transaction: t,
                    });
                    return user;
                }
            );


            if (!userData || !bcrypt.compareSync(password, userData.password)) {
                throw new Error("wrong user id or password");
            } else {
                const token = await this.signToken(userData.id);

                const updateUserData =
                    await this.dbConnectionManager.dbClient.transaction(async (t) => {
                        const updateUser = await this.userModel.user.update(
                            { token: token },
                            { where: { id: userData.id }, transaction: t }
                        );

                        return updateUser;
                    });


                const updatedUser = await this.userModel.user.findOne({
                    where: { email }
                });

                result = updatedUser;
            }

            return result;
        } catch (error) {
            error.statusCode = 400;
            console.log(error);
            throw error;
        }
    }

    public async createAdmin(payload) {
        try {
            const user = await this.userModel.user.create(payload);
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


   

}