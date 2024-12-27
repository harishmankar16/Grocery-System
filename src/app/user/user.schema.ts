import { DataTypes } from "sequelize";
import bcrypt from 'bcryptjs';
export const UserSchema = () => {
    return {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
            field: "id"
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "first_name"
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "last_name"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "email"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "password",
            set(value:string){

                let hashedPassword=bcrypt.hashSync(value,10);
                this.setDataValue('password',hashedPassword);
            }
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "role"
        },
        token:{
            type: DataTypes.STRING,
            allowNull: true,
            field: "token"
        }
    }
}