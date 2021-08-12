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
exports.userController = void 0;
const userDAO_1 = require("../dao/userDAO");
const utils_1 = require("../utils/utils");
class UserController {
    /**
     *  Nombre: lista
     *  Descripcion: lista de users de la base de datos
     *  Resultado: json con informacion de  users registrados.
     */
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userDAO_1.dao.lista();
            res.json(result);
        });
    }
    /**
     *  Nombre: insert
     *  Descripcion: insertar datos de un nuevo username
     *  Resultado: json con mensaje.
     */
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, nombre, apellidos } = req.body;
                // verificar parametros 
                if (username == null || password == null || nombre == null || apellidos == null) {
                    return res.status(409).json({ message: "Los campos son requeridos" });
                }
                // Verificar longitud de caracteres
                if (username.length > 150) {
                    return res.status(500).json({ message: "La longitud maxima del username es de 150 caracteres" });
                }
                // Verificar nombre de username
                const verify = yield userDAO_1.dao.verifyUser(username);
                if (verify.length > 0) {
                    return res.status(500).json({ message: "El username ya existe" });
                }
                // Insercion de datos
                const encryptedPassword = yield utils_1.utils.hashPassword(password);
                // Llenar objetos
                const userObject = {
                    username,
                    password: encryptedPassword,
                    nombre,
                    apellidos
                };
                const result = yield userDAO_1.dao.insert(userObject);
                if (result.affectedRows > 0) {
                    return res.json({ message: "Datos guardados exitosamente" });
                }
                else {
                    return res.status(409).json({ message: result.message });
                }
                res.json(result);
            }
            catch (ex) {
                res.status(500).json({ message: ex.message });
            }
        });
    }
}
exports.userController = new UserController();
