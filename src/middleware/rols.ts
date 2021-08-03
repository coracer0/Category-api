import { NextFunction, Request, Response } from "express";
import { dao } from "../dao/authDAO";

export const checkRol = (rols: Array<number>) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { idUsuario } = res.locals.jwtPayLoad;

        const isUsuario = await dao.getUserById(idUsuario);

      for (const usuario of isUsuario) {
          if (rols.includes(usuario.idRol)) {
              next();              
          }else{
            res.status(404).json({ message: "No autorizado" });
          }
      }
    } catch (error) {
      res.status(404).json({ message: "No autorizado" });
    }
  };

  // (req:Request, res:Response, next:NextFunction)=>{
};
