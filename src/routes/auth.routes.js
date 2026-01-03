import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller.js";
import { validateRequest } from "../middleware/validation.js";
import { loginRules } from "../validators/auth.validator.js";

const router = Router();

router.post("/login", validateRequest(loginRules), AuthController.login);

export default router;
