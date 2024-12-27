import { UserSchema } from "./user.schema";
import { Sequelize } from "sequelize";


export class UserModel {
    private static instance: UserModel;
    public user;

    public static getInstance() {
        if (!UserModel.instance) {
            UserModel.instance = new UserModel();
        }
        return UserModel.instance;
    }

    public initializeModel(sequelize : Sequelize){
        this.user = sequelize.define("tbl_user",UserSchema());
    }

    public associatedModel(){
       
    }

}