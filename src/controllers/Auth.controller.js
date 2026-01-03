import { Role, User } from "../models/index.js";
import { generateJWT } from "../utils/jwt.js";
import { checkPassword } from "../utils/auth.js";

export class AuthController {
  static login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: "credenciales incorrectas" });
      }

      if (!user.isActive) {
        return res
          .status(400)
          .json({ error: "el usuario no se encuentra activo" });
      }

      const isPasswordCorrect = await checkPassword(password, user.password);
      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({ error: "Correo o contraseña incorrectos" });
      }
      const role = await Role.findByPk(user.idRol);

      const token = await generateJWT(user.id);

      return res.status(200).json({
        token,
        user: {
          id: user.id,
          names: user.names,
          surnames: user.surnames,
          email: user.email,
          role: role.name,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Error en el servidor vuelva a intentarlo mas tarde...",
      });
    }
  };
}
