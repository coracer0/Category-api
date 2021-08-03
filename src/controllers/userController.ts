import { Request, Response } from 'express';
import { dao } from '../dao/userDAO';
import { utils } from '../utils/utils'

class UserController {
    /**
     *  Nombre: lista
     *  Descripcion: lista de users de la base de datos
     *  Resultado: json con informacion de  users registrados.
     */
    public async lista(req: Request, res :Response) {
        const result = await dao.lista();
        res.json(result);
    }

    /*
    
    */
    public async listaMedicos(req: Request,res :Response){
        const result = await dao.listaMedico();
        res.json(result);
    }
    /**
     *
     */
    public async listaPacientes(req: Request,res: Response){
        const result = await dao.listaPaciente();
        res.json(result);
    }
    /**
     *  Nombre: insert
     *  Descripcion: insertar datos de un nuevo usuario
     *  Resultado: json con mensaje.
     */
    public async insert(req: Request, res: Response) {
        try {
            const { usuario, password, nombre, apellido_paterno, apellido_materno,sexo,fecha_nacimiento,idRol  } = req.body;
        
        // verificar parametros 
        if(usuario == null || password == null || idRol == null|| nombre==null || apellido_paterno==null || apellido_materno==null ||fecha_nacimiento==null || sexo==null) {
            return res.status(409).json({message: "Los campos son requeridos"});
        }

        // Verificar longitud de caracteres
        
        if(usuario.length > 150){
            return res.status(500).json({message: "La longitud maxima del usuario es de 150 caracteres"});
        }

        // Verificar nombre de usuario
        const verify = await dao.verifyUser(usuario);
        if(verify.length > 0){
            return res.status(500).json({message: "El usuario ya existe"});
        }

        // Verificar Rol
        const verifyRol = await dao.verifyRol(idRol);
        if(verifyRol.length <= 0){
            return res.status(500).json({message: "El rol no existe o no esta diponible"});
        }

        // Insercion de datos
        const encryptedPassword = await utils.hashPassword(password);

        // Llenar objetos
        const userObject = {
            usuario,
            password : encryptedPassword,
            nombre,
            apellido_paterno,
            apellido_materno,
            sexo,
            fecha_nacimiento,
            idRol
        }

        const result = await dao.insert(userObject);

        if(result.affectedRows > 0){
            return res.json({message: "Datos guardados exitosamente"});
        } else {
            return res.status(409).json({message: result.message});
        }
        res.json(result);
        } catch (ex) {
            res.status(500).json({message: ex.message});
        }
    }
}

export const userController = new UserController();