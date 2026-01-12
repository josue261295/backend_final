import Reservation from "../models/Reservation.model.js";
import User from "../models/User.model.js";

export class ReservationController {
  static create = async (req, res) => {
    const { idUser, state } = req.body;

    try {
      const UserExists = await User.findByPk(idUser);
      if (!UserExists)
        return res.status(404).json({ error: "Usuario no encontrado" });

      const newReservation = await Reservation.create({ idUser, state });
      return res
        .status(201)
        .json({ message: "Reservacion creada", reservation: newReservation });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error al crear la reservacion" });
    }
  };
}
