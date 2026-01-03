import { DataTypes, Model } from 'sequelize';
import { db } from '../config/db.js';
 
 

class Role extends Model {}
    
   
    Role.init({

        id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

        name: {
            type: DataTypes.STRING(35),
            allowNull: false,
            unique: true,
        
        },

    },  
    
        {
        sequelize: db,
        modelName: 'Role',
        tableName: 'roles', 
    }

)    


export default Role;