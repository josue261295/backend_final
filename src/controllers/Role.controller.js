import Role  from "../models/Role.model.js";
 
export class RoleController {
    static create = async (req, res) => {
        const { name } = req.body;
 
        try {
            const rolExists = await Role.findOne({ where: { name } });
            if (rolExists) {
                return res.status(409).json({ error: "El rol ya existe" });
            }
            await Role.create(req.body);
            return res.status(201).json({ message: "Rol creado correctamente" });
 
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al crear un Rol' })
        }
    }

    static update = async (req, res) => {

        const { id } = req.params;
    const { password, ...userData } = req.body;

         try {
    const userUpdate = await User.findOne({ where: { id } });
    if (!userUpdate) {
       return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (password) {
    userData.password = await hashPassword(password);

      }  

     req.body.password = await hashPassword(password);

        await userUpdate.update(req.body);
        return res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.log(error);
        
             return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }


    }



}