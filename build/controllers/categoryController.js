"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const categoryDAO_1 = require("../dao/categoryDAO");
class CategoryController {
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield categoryDAO_1.dao.lista();
            res.json(result);
        });
    }
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, descripcion, tipo, cveRegistro } = req.body;
                if (nombre == null ||
                    descripcion == null ||
                    tipo == null ||
                    cveRegistro == null) {
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
                const verify = yield categoryDAO_1.dao.verifyCategory(nombre);
                if (verify.length > 0) {
                    return res.status(500).json({ message: "La categoria ya existe" });
                }
                const categoryObject = {
                    nombre,
                    descripcion,
                    tipo,
                    cveRegistro,
                };
                const result = yield categoryDAO_1.dao.insert(categoryObject);
                if (result.affectedRows > 0) {
                    return res.json({ message: "Datos guardados exitosamente" });
                }
                else {
                    return res.status(409).json({ message: result.message });
                }
            }
            catch (ex) {
                res.status(500).json({ message: ex.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = req.body;
                if (category.cveCategoria == null) {
                    return res.status(500).json({ message: "No se puede actualizar" });
                }
                const result = yield categoryDAO_1.dao.update(category);
                if (result.affectedRows > 0) {
                    res.json({ message: "Actualizado Correctamente" });
                }
                else {
                    res.status(400).json({ message: result.message });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cveCategoria } = req.params;
                if (cveCategoria === null) {
                    return res.status(500).json({ message: "No se puede Eliminar" });
                }
                const result = yield categoryDAO_1.dao.delete(parseInt(cveCategoria));
                if (result.affectedRows > 0) {
                    res.json({ message: "Eliminado Correctamente" });
                }
                else {
                    res.status(400).json({ message: result.message });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.categoryController = new CategoryController();
