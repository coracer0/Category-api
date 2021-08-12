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
exports.indexController = void 0;
const indexDAO_1 = require("../dao/indexDAO");
class IndexController {
    constructor() { }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield indexDAO_1.dao.test();
            res.json(result);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield indexDAO_1.dao.test();
            res.json(result);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield indexDAO_1.dao.test();
            res.json(result);
        });
    }
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield indexDAO_1.dao.test();
            res.json(result);
        });
    }
}
exports.indexController = new IndexController();
