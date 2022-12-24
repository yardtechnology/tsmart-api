"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var memoryRoutes = /** @class */ (function (_super) {
    __extends(memoryRoutes, _super);
    function memoryRoutes() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.memoryController = new controllers_1.MemoryController();
        _this.routes();
        return _this;
    }
    memoryRoutes.prototype.routes = function () {
        // create
        this.router.post("/memory/", _super.prototype.isAuthenticated, controllers_1.MemoryControllerValidation.create, this.memoryController.create);
        // get all
        this.router.get("/memory", controllers_1.MemoryControllerValidation.getAll, _super.prototype.isAuthenticated, this.memoryController.getAll);
        // update
        this.router.put("/memory/:memoryId", _super.prototype.isAuthenticated, controllers_1.MemoryControllerValidation.update, this.memoryController.update);
        // delete
        this.router.delete("/memory/:memoryId", _super.prototype.isAuthenticated, controllers_1.MemoryControllerValidation.delete, this.memoryController.delete);
    };
    return memoryRoutes;
}(authenticate_middleware_1.default));
exports.default = memoryRoutes;
