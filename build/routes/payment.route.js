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
var payment_controller_1 = __importDefault(require("../controllers/payment.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var Payment = /** @class */ (function (_super) {
    __extends(Payment, _super);
    function Payment() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.orderController = new payment_controller_1.default();
        _this.createPaymentRoute();
        return _this;
    }
    // place store service order
    Payment.prototype.createPaymentRoute = function () {
        this.router.post("/payment", _super.prototype.isAuthenticated, this.orderController.validatePaymentFields, this.orderController.createPaymentController);
    };
    return Payment;
}(authenticate_middleware_1.default));
exports.default = Payment;
// change
