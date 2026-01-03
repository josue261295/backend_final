import jwt from "jsonwebtoken";
import { envs } from "../config/envs.js";

export const generateJWT = (id) => {
  if (!envs.JWT_SECRET) {
    throw new Error("no se ha definido el JWT en las variables de entorno ");
  }

  const payload = { id };

  const token = jwt.sign(payload, envs.JWT_SECRET, {
    expiresIn: "3d",
  });
  return token;
};

export const verifyJWT = (token) => {
  return jwt.verify(token, envs.JWT_SECRET);
};
