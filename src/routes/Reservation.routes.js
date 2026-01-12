import { Router } from "express";
import { ReservationController } from "../controllers/Reservation.controller.js";
import { validateRequest } from "../middleware/validation.js";
import { createReservationRules } from "../validators/reservation.validator.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post(
  "/create",
  authenticate,
  validateRequest(createReservationRules),
  ReservationController.create
);

export default router;
