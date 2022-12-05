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
var ServicePropertyRoutes = /** @class */ (function (_super) {
    __extends(ServicePropertyRoutes, _super);
    function ServicePropertyRoutes() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.servicePropertyController = new controllers_1.ServicePropertyController();
        _this.routes();
        return _this;
    }
    ServicePropertyRoutes.prototype.routes = function () {
        // create
        this.router.post("/service-property/", _super.prototype.isAuthenticated, controllers_1.ServicePropertyControllerValidation.create, this.servicePropertyController.create);
        // get all
        this.router.get("/service-property/:service", 
        // super.isAuthenticated,
        controllers_1.ServicePropertyControllerValidation.getAll, this.servicePropertyController.getAll);
        // update
        this.router.put("/service-property/:servicePropertyId", 
        // super.isAuthenticated,
        controllers_1.ServicePropertyControllerValidation.update, this.servicePropertyController.update);
        // delete
        this.router.delete("/service-property/:servicePropertyId", _super.prototype.isAuthenticated, controllers_1.ServicePropertyControllerValidation.delete, this.servicePropertyController.delete);
    };
    return ServicePropertyRoutes;
}(authenticate_middleware_1.default));
exports.default = ServicePropertyRoutes;
