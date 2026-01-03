import { Router } from "express";
import userRoutes from "./user.routes.js";
import roleRoutes from "./role.routes.js";
import ReservationRoutes from "./Reservation.routes.js";
import authRoutes from "./auth.routes.js";
const router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/role", roleRoutes);
router.use("/reservation", ReservationRoutes);

export default router;
