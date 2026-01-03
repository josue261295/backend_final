import User from "../models/User.model.js";
import { hashPassword } from "../utils/auth.js";
import Role from "../models/Role.model.js";
export class UserController {
  static create = async (req, res) => {
    console.log(req.body);

    const { email, password, ci } = req.body;

    const userExists = await User.findOne({ where: { email } });
    const ciExists = await User.findOne({ where: { ci: req.body.ci } });

    if (userExists) {
      const error = new Error("El usuario ya esta registrado");
      return res.status(409).json({ error: error.message });
    }

    if (ciExists) {
      return res.status(409).json({ error: "La cedula ya esta registrada" });
    }

    try {
      const passwordHash = await hashPassword(password);
      const user = await User.create(req.body);
      user.password = passwordHash;
      await user.save();
      //const user = await User.create(req.body);
      res.status(201).json({ message: "Usuario creado correctamente" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Error al crear el usuario vuelva a intentarlo mas tarde",
      });
    }
  };

  static getAll = async (req, res) => {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Role,
            as: "rol",
            attributes: ["id", "name"],
          },
        ],
        attributes: {
          exclude: ["password"],
        },
      });
      return res.status(200).json({ users });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Error al obtener todos los usuarios" });
    }
  };

  static getById = async (req, res) => {
    const { id } = req.params;
    try {
      const userById = await User.findByPk(id, {
        include: [
          {
            model: Role,
            as: "rol",
            attributes: ["id", "name"],
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      });

      if (!userById) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      return res.status(200).json({ userById });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al obtener el usuario" });
    }
  };

  static update = async (req, res) => {
    const { id } = req.params;
    const { password, ...userData } = req.body;
    try {
      const userUpdate = await User.findOne({ where: { id } });
      if (!userUpdate) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      if (password) {
        userData.password = await hashPassword(password);
      }

      await userUpdate.update(userData);
      return res
        .status(200)
        .json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al actualizar el usuario" });
    }
  };

  static delete = async (req, res) => {
    const { id } = req.params;

    try {
      const userExists = await User.findByPk(id);
      if (!userExists) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      if (!userExists.isActive) {
        return res.status(400).json({ error: " el usuario fue desactivado" });
      }

      await userExists.update({ isActive: false });
      return res
        .status(200)
        .json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al eliminar el usuario" });
    }
  };
  static activate = async (req, res) => {
    const { id } = req.params;
    try {
      const userExists = await User.findByPk(id);
      if (!userExists) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      if (userExists.isActive) {
        return res
          .status(400)
          .json({ error: "El usuario ya se encuentra activado" });
      }
      await userExists.update({ isActive: true });
      return res
        .status(200)
        .json({ message: "Usuario activado correctamente" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al activar el usuario" });
    }
  };
}
