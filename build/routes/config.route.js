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
var ConfigRoutes = /** @class */ (function (_super) {
    __extends(ConfigRoutes, _super);
    function ConfigRoutes() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.configController = new controllers_1.ConfigController();
        _this.routes();
        return _this;
    }
    ConfigRoutes.prototype.routes = function () {
        // create
        this.router.put("/config/", _super.prototype.isAuthenticated, controllers_1.ConfigControllerValidation.create, this.configController.createAndUpdate);
        // get all
        this.router.get("/config", _super.prototype.isAuthenticated, this.configController.getAll);
        // add news latter
        this.router.post("/config/news-latter", controllers_1.ConfigControllerValidation.newsLatter, this.configController.addNewsLatter);
    };
    return ConfigRoutes;
}(authenticate_middleware_1.default));
exports.default = ConfigRoutes;
