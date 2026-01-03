import { body } from "express-validator";

export const rolRegisterRules = [
  body("name")
    .trim()
    .toLowerCase()
    .isLength({ min: 1, max: 25 })
    .withMessage("El nombre debe tener como mínimo 1 caracter")
    .matches(/^[a-zA-Z0-9 ]+$/)
    .withMessage("El nombre solo puede contener letras, números y espacios"),
];
