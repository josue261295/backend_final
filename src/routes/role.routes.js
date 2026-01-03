import { Router } from "express";
import { validateRequest } from "../middleware/validation.js";
import { rolRegisterRules } from "../validators/rol.validator.js";
import { RoleController } from "../controllers/Role.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post(
  "/create",
  authenticate,
  validateRequest(rolRegisterRules),
  RoleController.create
);

export default router;
