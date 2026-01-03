import { verifyJWT } from "../utils/jwt.js";
import User from "../models/User.model.js";

export const authenticate = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({ error: "No autorizado" });
  }
  const [, token] = bearer.split(" ");

  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }

  try {
    const decoded = verifyJWT(token);
    if (typeof decoded === "object" && decoded.id) {
      const user = await User.findByPk(decoded.id, {
        attributes: ["password", "email", "names", "idRol"],
      });

      if (!user) {
        return res.status(401).json({ error: "usuario no encontrado" });
      }

      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "token no valido" });
  }
};
