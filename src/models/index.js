import Role from "./Role.model.js";
import User from "./User.model.js";
import Reservation from "./Reservation.model.js";

//de usuario a rol
Role.hasMany(User, {
  foreignKey: "idRol",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "idRol",
  as: "rol",
});

// reservacxiones de usuario
User.hasMany(Reservation, {
  foreignKey: "idUser",
  as: "reservations",
});
Reservation.belongsTo(User, {
  foreignKey: "idUser",
  as: "user",
});

export { Role, User, Reservation };
