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
var service_controller_1 = __importDefault(require("../controllers/service.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var Service = /** @class */ (function (_super) {
    __extends(Service, _super);
    function Service() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.serviceController = new service_controller_1.default();
        _this.createServiceRoute();
        _this.updateServiceRoute();
        _this.getServiceRoute();
        _this.getAllServiceRoute();
        _this.deleteServiceRoute();
        return _this;
    }
    // create user
    Service.prototype.createServiceRoute = function () {
        this.router.post("/service", _super.prototype.isAuthenticated, this.serviceController.validateCreateServiceFields, this.serviceController.createService);
    };
    // update service
    Service.prototype.updateServiceRoute = function () {
        this.router.put("/service/:serviceId", _super.prototype.isAuthenticated, this.serviceController.updateService);
    };
    // get service
    Service.prototype.getServiceRoute = function () {
        this.router.get("/service/:serviceId", this.serviceController.getService);
    };
    // get my categories
    Service.prototype.getAllServiceRoute = function () {
        this.router.get("/services", this.serviceController.getAllService);
    };
    // delete service
    Service.prototype.deleteServiceRoute = function () {
        this.router.delete("/service/:serviceId", _super.prototype.isAuthenticated, this.serviceController.deleteService);
    };
    return Service;
}(authenticate_middleware_1.default));
exports.default = Service;
