"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const jwt_1 = require("../middleware/jwt");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', [jwt_1.checkJwt], userController_1.userController.lista);
        this.router.put('/', userController_1.userController.insert);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
