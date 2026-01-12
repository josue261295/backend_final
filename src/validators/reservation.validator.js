import { body, param, query } from "express-validator";
import { RESERVATION_STATUS } from "../models/Reservation.model.js";

export const createReservationRules = [
  body("idUser")
    .exists()
    .withMessage("El idUser es obligatorio")
    .isInt({ gt: 0 })
    .withMessage("El idUser debe ser un número entero válido")
    .toInt(),

  body("state")
    .trim()
    .isIn(Object.values(RESERVATION_STATUS))
    .withMessage(
      `El estado no es válido. Valores permitidos: ${Object.values(
        RESERVATION_STATUS
      ).join(", ")}`
    ),
];

export const paramReservation = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El ID de la reserva es inválido")
    .toInt(),
];

export const updateReservationRules = [
  ...paramReservation,
  body("idUser")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("El ID de la reserva es inválido")
    .toInt(),

  body("state")
    .optional()
    .trim()
    .isIn(Object.values(RESERVATION_STATUS))
    .withMessage(
      `Estado inválido. Valores permitidos: ${Object.values(
        RESERVATION_STATUS
      ).join(", ")}`
    ),
];

// ?limit=texto o ?page=-5
export const filterReservationRules = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La página debe ser un número mayor a 0")
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("El límite debe ser entre 1 y 100")
    .toInt(),

  query("state")
    .optional()
    .isIn(Object.values(RESERVATION_STATUS))
    .withMessage("Filtro de estado inválido"),
];
