import { Request,Response } from "express";
import jwt from 'jsonwebtoken';
import secretKey from '../config/jwtKeys';
import { dao } from "../dao/authDAO";
import {utils} from '../utils/utils';

class AuthController{

    public async login(req:Request, res:Response){
        const{usuario,password} = req.body;
        

        if(usuario == null || password == null ){
            return res.status(400).json({message: "Usuario y Contraseña incorrecta"});
        }

        const usuarios = await dao.getUser(usuario);

        

        if (usuarios.length <=0){
            return res.status(400).json({message:'El usuario no existe'});
        }

        for (const usuario of usuarios) {
            if(await utils.checkPassword(password, usuario.password)){
                const token = jwt.sign({idUsuario: usuario.idUsuario, usuario,idRol: usuario.idRol, rol: usuario.rol,email:usuario.usuario},secretKey.jwtSecret,{expiresIn: '1h'});
                return res.json({message:'OK',token,idUser: usuario.idUser,usuario,idRol: usuario.idRol, rol: usuario.rol,email: usuario.usuario});
            }else{
                return res.status(400).json({message:"La contraseña es incorrecta"});
            }
        }

    }
}
export const authController =new AuthController();
