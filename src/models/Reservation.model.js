import { Model, DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const RESERVATION_STATUS = {
  RECIBIDO: "recibido",
  PREPARANDO: "preparando",
  COMPLETADO: "completado",
};

class Reservation extends Model {}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    state: {
      type: DataTypes.ENUM(
        RESERVATION_STATUS.RECIBIDO,
        RESERVATION_STATUS.PREPARANDO,
        RESERVATION_STATUS.COMPLETADO
      ),
      allowNull: false,
      defaultValue: RESERVATION_STATUS.RECIBIDO,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      model: "users",
      key: "id",
    },
  },
  {
    sequelize: db,
    modelName: "Reservation",
    tableName: "reservations",
    timestamps: true,
  }
);

export default Reservation;
