import Reservation from "../models/Reservation.model.js";

export class ReservationController {
  static create = async (req, res) => {
    try {
      const newReservation = await Reservation.create({});
      return res
        .status(201)
        .json({ message: "Reservacion creada", reservation: newReservation });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error al crear la reservacion" });
    }
  };
}



