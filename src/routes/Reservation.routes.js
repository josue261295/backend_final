import { Router } from "express";
import { ReservationController } from "../controllers/Reservation.controller.js";

const router = Router();

router.post("/create", ReservationController.create);

export default router;
