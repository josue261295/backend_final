import { DataTypes, Model } from "sequelize";
import { db } from "../config/db.js";


class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    names: {
        type: DataTypes.STRING(40),
        allowNull: false

    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,

    },

    surnames: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },

    ci: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },

    phone: {
        type: DataTypes.STRING(15),
        allowNull : false,
    },


    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        }


    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        defaultValue: true,
    }



}, {
    sequelize: db,
    modelName: 'User',
    tableName: 'users',
}
            
)

export default User;