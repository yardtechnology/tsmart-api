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
var NotificationRoutes = /** @class */ (function (_super) {
    __extends(NotificationRoutes, _super);
    function NotificationRoutes() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.NotificationController = new controllers_1.NotificationController();
        _this.routes();
        return _this;
    }
    NotificationRoutes.prototype.routes = function () {
        // create
        this.router.post("/notification/", _super.prototype.isAuthenticated, controllers_1.NotificationControllerValidation.create, this.NotificationController.create);
        // get all
        this.router.get("/notification", _super.prototype.isAuthenticated, controllers_1.NotificationControllerValidation.getAll, this.NotificationController.getAll);
        // update
        this.router.put("/notification", _super.prototype.isAuthenticated, controllers_1.NotificationControllerValidation.update, this.NotificationController.update);
        // delete
        this.router.delete("/notification", _super.prototype.isAuthenticated, controllers_1.NotificationControllerValidation.delete, this.NotificationController.delete);
    };
    return NotificationRoutes;
}(authenticate_middleware_1.default));
exports.default = NotificationRoutes;
