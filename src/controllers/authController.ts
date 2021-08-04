import { Request,Response } from "express";
import jwt from 'jsonwebtoken';
import secretKey from '../config/jwtKeys';
import { dao } from "../dao/authDAO";
import {utils} from '../utils/utils';

class AuthController{

    public async login(req:Request, res:Response){
        const{username,password} = req.body;
        

        if(username == null || password == null ){
            return res.status(400).json({message: "username y Contraseña incorrecta"});
        }

        const usuarios = await dao.getUser(username);

        

        if (usuarios.length <=0){
            return res.status(400).json({message:'El username no existe'});
        }

        for (const username of usuarios) {
            if(await utils.checkPassword(password, username.password)){
                const token = jwt.sign({cveUsuario: username.cveUsuario, username,email:username.username},secretKey.jwtSecret,{expiresIn: '1h'});
                return res.json({message:'OK',token,cveUsuario: username.cveUsuario,username,idRol: username.idRol, rol: username.rol,email: username.username});
            }else{
                return res.status(400).json({message:"La contraseña es incorrecta"});
            }
        }

    }
}
export const authController =new AuthController();
