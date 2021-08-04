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

    /**
     *  Nombre: insert
     *  Descripcion: insertar datos de un nuevo username
     *  Resultado: json con mensaje.
     */
    public async insert(req: Request, res: Response) {
        try {
            const { username, password, nombre,apellidos } = req.body;
        
        // verificar parametros 
        if(username == null || password == null ||nombre==null || apellidos==null) {
            return res.status(409).json({message: "Los campos son requeridos"});
        }

        // Verificar longitud de caracteres
        
        if(username.length > 150){
            return res.status(500).json({message: "La longitud maxima del username es de 150 caracteres"});
        }

        // Verificar nombre de username
        const verify = await dao.verifyUser(username);
        if(verify.length > 0){
            return res.status(500).json({message: "El username ya existe"});
        }

        // Insercion de datos
        const encryptedPassword = await utils.hashPassword(password);

        // Llenar objetos
        const userObject = {
            username,
            password : encryptedPassword,
            nombre,
            apellidos
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