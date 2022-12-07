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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var servicePrice_controller_1 = __importStar(require("../controllers/servicePrice.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var ServicePrice = /** @class */ (function (_super) {
    __extends(ServicePrice, _super);
    function ServicePrice() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.servicePriceController = new servicePrice_controller_1.default();
        _this.routes();
        return _this;
    }
    // create service price
    ServicePrice.prototype.routes = function () {
        this.router.post("/service-price/total-price", 
        // super.isManager,
        _super.prototype.isAuthenticated, servicePrice_controller_1.ServicePriceControllerValidation.createServicePrice, this.servicePriceController.createServicePrice);
        this.router.post("/service-price", 
        // super.isManager,
        _super.prototype.isAuthenticated, servicePrice_controller_1.ServicePriceControllerValidation.createServicePrice, this.servicePriceController.createServicePrice);
        this.router.put("/service-price/:servicePriceId", _super.prototype.isAuthenticated, this.servicePriceController.updateServicePrice);
        this.router.get("/service-price/all", this.servicePriceController.getServicePrice);
        this.router.get("/service-prices/:model", 
        // super.isAuthenticated,
        servicePrice_controller_1.ServicePriceControllerValidation.getAllServicePrice, this.servicePriceController.getAllServicePrice);
        this.router.post("/service-price/summery", _super.prototype.isAuthenticated, servicePrice_controller_1.ServicePriceControllerValidation.serviceSummery, this.servicePriceController.serviceSummery);
        this.router.delete("/service-price/:servicePriceId", _super.prototype.isAuthenticated, this.servicePriceController.deleteServicePrice);
    };
    return ServicePrice;
}(authenticate_middleware_1.default));
exports.default = ServicePrice;
