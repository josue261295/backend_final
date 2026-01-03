import { body } from "express-validator";

export const loginRules = [
  body("email")
    .isEmail()
    .withMessage("El formato del correo no es válido")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];
