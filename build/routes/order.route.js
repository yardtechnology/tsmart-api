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
var order_controller_1 = __importDefault(require("../controllers/order.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.orderController = new order_controller_1.default();
        _this.createOrderRoute();
        _this.createMailInOrderRoute();
        _this.createCallOutOrderRoute();
        _this.createProductOrderRoute();
        _this.createCartOrderRoute();
        _this.getOrderDetailsRoute();
        _this.updateOrderStatusRoute();
        _this.createOrderPaymentRoute();
        _this.reactNativePaymentIntentsControllerRoute();
        _this.makeOrderPaidRoute();
        _this.createSellOrderRoute();
        _this.getOrderSummaryRoute();
        _this.addExtraChargesRoute();
        _this.getJobRequest();
        _this.acceptJobRequest();
        _this.getAllOrders();
        _this.orderCancelationRoute();
        _this.getOrderInvoiceRoute();
        _this.updateOrderDetailsRoute();
        _this.verifyOrderOtpRoute();
        _this.downloadOrderInvoiceRoute();
        return _this;
    }
    //get all orders
    Order.prototype.getAllOrders = function () {
        this.router.get("/orders", this.isAuthenticated, this.orderController.getAllOrdersController);
    };
    // place store service order
    Order.prototype.createOrderRoute = function () {
        this.router.post("/order/repair/in-store", _super.prototype.isAuthenticated, this.orderController.validateOrderPlaceFields, this.orderController.placeInStoreOrderController);
    };
    // place mail in service order
    Order.prototype.createMailInOrderRoute = function () {
        this.router.post("/order/repair/mail-in", _super.prototype.isAuthenticated, this.orderController.validateMailInOrderPlaceFields, this.orderController.placeMailInOrderController);
    };
    // place mail in service order
    Order.prototype.createCallOutOrderRoute = function () {
        this.router.post("/order/repair/call-out", _super.prototype.isAuthenticated, this.orderController.validateCallOutOrderPlaceFields, this.orderController.placeCallOutOrderController);
    };
    // place mail in service order
    Order.prototype.createSellOrderRoute = function () {
        this.router.post("/order/sell", _super.prototype.isAuthenticated, this.orderController.validateSellOrderPlaceFields, this.orderController.placeSellOrderController);
    };
    // place mail in service order
    Order.prototype.createProductOrderRoute = function () {
        this.router.post("/order/product", _super.prototype.isAuthenticated, this.orderController.validateProductOrderPlaceFields, this.orderController.placeProductOrderController);
    };
    // place mail in service order
    Order.prototype.createCartOrderRoute = function () {
        this.router.post("/order/cart", _super.prototype.isAuthenticated, this.orderController.validateCartOrderPlaceFields, this.orderController.placeCartOrderController);
    };
    // get order details
    Order.prototype.getOrderDetailsRoute = function () {
        this.router.get("/orders/:orderId", _super.prototype.isAuthenticated, this.orderController.validateGetOrderDetails, this.orderController.getOrderDetailsController);
    };
    // get order details
    Order.prototype.updateOrderDetailsRoute = function () {
        this.router.put("/orders/:orderId", _super.prototype.isAuthenticated, this.orderController.updateOrderDetailsController);
    };
    // get order invoice
    Order.prototype.getOrderInvoiceRoute = function () {
        this.router.put("/orders/:orderId/invoice", _super.prototype.isAuthenticated, this.orderController.validateGetOrderInvoice, this.orderController.getOrderInvoiceController);
    };
    // get order invoice
    Order.prototype.downloadOrderInvoiceRoute = function () {
        this.router.get("/orders/:orderId/invoice", _super.prototype.isAuthenticated, this.orderController.downloadOrderInvoiceController);
    };
    //order status and ETA update
    Order.prototype.updateOrderStatusRoute = function () {
        this.router.put("/orders/:orderId/status", _super.prototype.isAuthenticated, this.orderController.validateUpdateOrderStatus, this.orderController.updateOrderStatusController);
    };
    //order status and ETA update
    Order.prototype.verifyOrderOtpRoute = function () {
        this.router.post("/orders/:orderId/verify-otp", _super.prototype.isAuthenticated, this.orderController.verifyOrderOtpController);
    };
    //order payment
    Order.prototype.createOrderPaymentRoute = function () {
        this.router.post("/orders/bill/payment", _super.prototype.isAuthenticated, this.orderController.validateOrderPaymentFields, this.orderController.payOrderAmount);
    };
    //react-native payment initiate
    Order.prototype.reactNativePaymentIntentsControllerRoute = function () {
        this.router.post("/orders/bill/payment-initiate", _super.prototype.isAuthenticated, this.orderController.reactNativePaymentIntentsController);
    };
    //make order paid
    Order.prototype.makeOrderPaidRoute = function () {
        this.router.post("/orders/bill/payment-paid", _super.prototype.isAuthenticated, this.orderController.makeOrderPaidController);
    };
    //get order summary
    Order.prototype.getOrderSummaryRoute = function () {
        this.router.get("/order/summary", _super.prototype.isAuthenticated, this.orderController.productOrderSummery);
    };
    // add  extra fees
    Order.prototype.addExtraChargesRoute = function () {
        this.router.post("/orders/:orderId/extra-fees", _super.prototype.isAuthenticated, this.orderController.addExtraChargesController);
    };
    //get job requests
    Order.prototype.getJobRequest = function () {
        this.router.get("/technician/job-requests", this.isAuthenticated, this.orderController.getJobRequestController);
    };
    //accept job requests
    Order.prototype.acceptJobRequest = function () {
        this.router.put("/orders/:orderId/job-accept", this.isAuthenticated, this.orderController.validateAcceptJobRequestFields, this.orderController.acceptJobRequestController);
    };
    //order cancelation
    Order.prototype.orderCancelationRoute = function () {
        this.router.put("/orders/:orderId/cancel", this.isAuthenticated, this.orderController.orderCancelationController);
    };
    return Order;
}(authenticate_middleware_1.default));
exports.default = Order;
