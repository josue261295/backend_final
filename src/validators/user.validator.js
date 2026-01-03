import { body, param } from "express-validator";

export const registerRules = [
  body("names")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("el nombre debe tener al menos 3 caràcteres")
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/)
    .withMessage("El nombre solo puede contener letras y espacios"),

  body("surnames")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("el apellido debe tener al menos 3 caràcteres")
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/)
    .withMessage("El apellido solo puede contener letras y espacios"),

  body("ci")
    .trim()
    .isLength({ min: 8, max: 10 })
    .withMessage("la cedula debe tener entre 8 caràcteres")
    .matches(/^[a-zA-Z0-9\s-]+$/) // Permite letras, números, espacios y guiones
    .withMessage("Formato de CI inválido"),

  body("phone")
    .trim()
    .isMobilePhone(["es-BO", "any"])
    .withMessage("Debe ser un número de celular válido"),

  body("email")
    .isEmail()
    .withMessage("El formato del correo no es válido")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("la contraseña debe tener al menos 8 caràcteres")
    .matches(/[a-z]/)
    .withMessage("la contraseña debe tener al menos una letra minuscula")
    .matches(/[A-Z]/)
    .withMessage("la contraseña debe tener al menos una letra mayuscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe contener al menos un número")
    .matches(/[\W_]/)
    .withMessage("La contraseña debe contener al menos un carácter especial"),

  body("idRol")
    .isInt({ gt: 0 })
    .withMessage("El cargo debe eser obligatorio")
    .toInt(),
];

export const paramsGetRules = [
  param("id")
    .isInt({ gt: 0 })
    .toInt()
    .withMessage("El ID debe ser un número entero"),
];

export const updateRules = [
  ...paramsGetRules,

  body("names")
    .optional()
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("el nombre debe tener al menos 3 caràcteres")
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/)
    .withMessage("El nombre solo puede contener letras y espacios"),

  body("surnames")
    .optional()
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("el apellido debe tener al menos 3 caràcteres")
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/)
    .withMessage("El apellido solo puede contener letras y espacios"),

  body("ci")
    .optional()
    .trim()
    .isLength({ min: 8, max: 10 })
    .withMessage("la cedula debe tener entre 8 caràcteres")
    .matches(/^[a-zA-Z0-9\s-]+$/) // Permite letras, números, espacios y guiones
    .withMessage("Formato de CI inválido"),

  body("phone")
    .optional()
    .trim()
    .isMobilePhone(["es-BO", "any"])
    .withMessage("Debe ser un número de celular válido"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("El formato del correo no es válido")
    .normalizeEmail(),

  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("la contraseña debe tener al menos 8 caràcteres")
    .matches(/[a-z]/)
    .withMessage("la contraseña debe tener al menos una letra minuscula")
    .matches(/[A-Z]/)
    .withMessage("la contraseña debe tener al menos una letra mayuscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe contener al menos un número")
    .matches(/[\W_]/)
    .withMessage("La contraseña debe contener al menos un carácter especial"),
];
