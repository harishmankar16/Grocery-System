import { DataTypes } from "sequelize";


export const groceryItemsSchema = () => {
    return {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "id"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "name"
        },
        inventory: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: "inventory"
          },
          
        price:{
            type: DataTypes.INTEGER,
            field:"price"
        }
    }
}