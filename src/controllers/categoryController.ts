import { Request, Response } from "express";
import { dao } from "../dao/categoryDAO";

class CategoryController {
  public async lista(req: Request, res: Response) {
    const result = await dao.lista();
    res.json(result);
  }

  public async insert(req: Request, res: Response) {
    try {
      const { nombre, descripcion, tipo, cveRegistro } = req.body;

      if (
        nombre == null ||
        descripcion == null ||
        tipo == null ||
        cveRegistro == null
      ) {
        return res.status(409).json({ message: "Los campos son requeridos" });
      }

      if (nombre.length > 150) {
        return res.status(500).json({
          message: "La longitud maxima del nombre es de 250 caracteres",
        });
      }

      if (descripcion.length > 500) {
        return res.status(500).json({
          message: "La longitud maxima de la descripción es de 500 caracteres",
        });
      }

      const verify = await dao.verifyCategory(nombre);
      if (verify.length > 0) {
        return res.status(500).json({ message: "La categoria ya existe" });
      }

      const categoryObject = {
        nombre,
        descripcion,
        tipo,
        cveRegistro,
      };

      const result = await dao.insert(categoryObject);

      if (result.affectedRows > 0) {
        return res.json({ message: "Datos guardados exitosamente" });
      } else {
        return res.status(409).json({ message: result.message });
      }
    } catch (ex) {
      res.status(500).json({ message: ex.message });
    }
  }
}
export const categoryController = new CategoryController();
