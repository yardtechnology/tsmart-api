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
var ServicePropertyValueRoutes = /** @class */ (function (_super) {
    __extends(ServicePropertyValueRoutes, _super);
    function ServicePropertyValueRoutes() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.servicePropertyValueController = new controllers_1.ServicePropertyValueController();
        _this.routes();
        return _this;
    }
    ServicePropertyValueRoutes.prototype.routes = function () {
        // create
        this.router.post("/service-property-value/", _super.prototype.isAuthenticated, controllers_1.ServicePropertyValueControllerValidation.create, this.servicePropertyValueController.create);
        // get all
        this.router.get("/service-property-value", _super.prototype.isAuthenticated, controllers_1.ServicePropertyValueControllerValidation.getAll, this.servicePropertyValueController.getAll);
        // get all
        this.router.get("/service-property-value/:servicePrice/:serviceProperty", _super.prototype.isAuthenticated, controllers_1.ServicePropertyValueControllerValidation.getAllAccordingServicePrice, this.servicePropertyValueController.getAllAccordingServicePrice);
        // update
        this.router.put("/service-property-value/:servicePropertyValueId", _super.prototype.isAuthenticated, controllers_1.ServicePropertyValueControllerValidation.update, this.servicePropertyValueController.update);
        // delete
        this.router.delete("/service-property-value/:servicePropertyValueId", _super.prototype.isAuthenticated, controllers_1.ServicePropertyValueControllerValidation.delete, this.servicePropertyValueController.delete);
    };
    return ServicePropertyValueRoutes;
}(authenticate_middleware_1.default));
exports.default = ServicePropertyValueRoutes;
