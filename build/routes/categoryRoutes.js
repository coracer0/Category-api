"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const jwt_1 = require("../middleware/jwt");
class CategoryRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', [jwt_1.checkJwt], categoryController_1.categoryController.lista);
        this.router.put('/', [jwt_1.checkJwt], categoryController_1.categoryController.insert);
        this.router.post('/', [jwt_1.checkJwt], categoryController_1.categoryController.update);
        this.router.delete('/:cveCategoria', [jwt_1.checkJwt], categoryController_1.categoryController.delete);
    }
}
const categoryRoutes = new CategoryRoutes();
exports.default = categoryRoutes.router;
