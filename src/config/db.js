import Sequelize from "sequelize";
import { envs } from "./envs.js";

export const db = new Sequelize(envs.DATABASE_URL, {
  logging: false, // datos de la data base
  ssl: false,

  // dialect: 'postgres',
  // dialectOptions: {
  //     ssl: {
  //         require: false
  //     }
  // }
});
