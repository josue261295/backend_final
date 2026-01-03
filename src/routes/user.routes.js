import { Router } from "express";
import { validateRequest } from "../middleware/validation.js";
import {
  paramsGetRules,
  registerRules,
  updateRules,
} from "../validators/user.validator.js";
import { UserController } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post("/create", validateRequest(registerRules), UserController.create);

router.use(authenticate);
router.get("/", UserController.getAll);
router.get("/:id", validateRequest(paramsGetRules), UserController.getById);
router.patch("/:id", validateRequest(updateRules), UserController.update);
router.delete("/:id", validateRequest(paramsGetRules), UserController.delete);
router.patch(
  "/:id/activate",
  validateRequest(paramsGetRules),
  UserController.activate
);

export default router;

//TODO: en el findAll agregar los paraametros
// TODO : crear las reservaciones
// TODO : actualizar el modelo del usuario [deleteAt]
