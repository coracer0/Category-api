"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
const jwt_1 = require("../middleware/jwt");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', indexController_1.indexController.list);
        this.router.post('/', [jwt_1.checkJwt], indexController_1.indexController.update);
        this.router.put('/', [jwt_1.checkJwt], indexController_1.indexController.insert);
        this.router.delete('/', [jwt_1.checkJwt], indexController_1.indexController.delete);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
