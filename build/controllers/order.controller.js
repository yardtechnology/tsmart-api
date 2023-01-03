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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var mongoose_1 = require("mongoose");
var socket_io_client_1 = require("socket.io-client");
var helper_1 = require("../helper");
var core_helper_1 = require("../helper/core.helper");
var billing_logic_1 = __importDefault(require("../logic/billing.logic"));
var cart_logic_1 = __importDefault(require("../logic/cart.logic"));
var notification_logics_1 = __importDefault(require("../logic/notification.logics"));
var order_logic_1 = __importDefault(require("../logic/order.logic"));
var stripe_logic_1 = __importDefault(require("../logic/stripe.logic"));
var models_1 = require("../models");
var billing_model_1 = require("../models/billing.model");
var cartItem_model_1 = require("../models/cartItem.model");
var product_model_1 = require("../models/product.model");
var user_model_1 = require("../models/user.model");
var order_model_1 = require("./../models/order.model");
var servicePrice_model_1 = require("./../models/servicePrice.model");
var mail_controller_1 = __importDefault(require("./mail.controller"));
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.validateOrderPlaceFields = [
            (0, express_validator_1.body)("storeId")
                .not()
                .isEmpty()
                .withMessage("Store Id is required")
                .isMongoId()
                .withMessage("Not a valid Store Id"),
            (0, express_validator_1.body)("serviceTime").not().isEmpty().withMessage("Service time is required"),
            (0, express_validator_1.body)("serviceIds.*")
                .isMongoId()
                .withMessage("serviceIds must be a valid service id"),
            (0, express_validator_1.body)("modelId")
                .not()
                .isEmpty()
                .withMessage("modelId is required")
                .isMongoId()
                .withMessage("modelId must be a valid modelId"),
            (0, express_validator_1.body)("makeId")
                .not()
                .isEmpty()
                .withMessage("makeId is required")
                .isMongoId()
                .withMessage("makeId must be a valid makeId"),
            (0, express_validator_1.body)("deviceId")
                .not()
                .isEmpty()
                .withMessage("deviceId is required")
                .isMongoId()
                .withMessage("deviceId must be a valid deviceId"),
        ];
        _this.validateMailInOrderPlaceFields = [
            (0, express_validator_1.body)("addressId")
                .not()
                .isEmpty()
                .withMessage("AddressId is required")
                .isMongoId()
                .withMessage("Not a valid Address Id"),
            (0, express_validator_1.body)("serviceIds.*")
                .isMongoId()
                .withMessage("serviceIds must be a valid service id"),
            (0, express_validator_1.body)("modelId")
                .not()
                .isEmpty()
                .withMessage("modelId is required")
                .isMongoId()
                .withMessage("modelId must be a valid modelId"),
            (0, express_validator_1.body)("makeId")
                .not()
                .isEmpty()
                .withMessage("makeId is required")
                .isMongoId()
                .withMessage("makeId must be a valid makeId"),
            (0, express_validator_1.body)("deviceId")
                .not()
                .isEmpty()
                .withMessage("deviceId is required")
                .isMongoId()
                .withMessage("deviceId must be a valid deviceId"),
        ];
        _this.validateCallOutOrderPlaceFields = [
            (0, express_validator_1.body)("address.latitude")
                .not()
                .isEmpty()
                .withMessage("latitude is required"),
            (0, express_validator_1.body)("address.longitude")
                .not()
                .isEmpty()
                .withMessage("longitude is required"),
            (0, express_validator_1.body)("address.city")
                .optional()
                .isLength({ min: 3 })
                .withMessage("City must be at least 3 characters long")
                .isLength({ max: 21 })
                .withMessage("City must be at most 21 characters long"),
            (0, express_validator_1.body)("address.houseNumber")
                .optional()
                .isLength({ min: 3 })
                .withMessage("houseNumber must be at least 3 characters long")
                .isLength({ max: 21 })
                .withMessage("houseNumber must be at most 21 characters long"),
            (0, express_validator_1.body)("address.state")
                .optional()
                .isLength({ min: 3 })
                .withMessage("State must be at least 3 characters long")
                .isLength({ max: 25 })
                .withMessage("State must be at most 25 characters long"),
            (0, express_validator_1.body)("address.country")
                .not()
                .isEmpty()
                .withMessage("country is required")
                .isLength({ min: 2 })
                .withMessage("Country must be at least 2 characters long")
                .isLength({ max: 25 })
                .withMessage("Country must be at most 25 characters long"),
            (0, express_validator_1.body)("address.zip")
                .optional()
                .isLength({ min: 5 })
                .withMessage("zip code must be grater then 5 characters long")
                .isLength({ max: 11 })
                .withMessage("zip code must be at most 11 characters long"),
            (0, express_validator_1.body)("serviceIds.*")
                .not()
                .isEmpty()
                .isMongoId()
                .withMessage("serviceIds must be a valid service id"),
            (0, express_validator_1.body)("modelId")
                .not()
                .isEmpty()
                .withMessage("modelId is required")
                .isMongoId()
                .withMessage("modelId must be a valid modelId"),
            (0, express_validator_1.body)("makeId")
                .not()
                .isEmpty()
                .withMessage("makeId is required")
                .isMongoId()
                .withMessage("makeId must be a valid makeId"),
            (0, express_validator_1.body)("scheduledTime")
                .not()
                .isEmpty()
                .withMessage("Scheduled time is required"),
            (0, express_validator_1.body)("deviceId")
                .not()
                .isEmpty()
                .withMessage("deviceId is required")
                .isMongoId()
                .withMessage("deviceId must be a valid deviceId"),
        ];
        _this.validateProductOrderPlaceFields = [
            (0, express_validator_1.body)("productId")
                .not()
                .isEmpty()
                .withMessage("productId is required")
                .isString()
                .withMessage("productId must be a string"),
            (0, express_validator_1.body)("quantity")
                .not()
                .isEmpty()
                .withMessage("quantity is required")
                .isNumeric()
                .withMessage("quantity must be a number"),
            (0, express_validator_1.body)("addressId")
                .not()
                .isEmpty()
                .withMessage("AddressId is required")
                .isString()
                .withMessage("AddressId must be a string"),
        ];
        _this.validateCartOrderPlaceFields = [
            (0, express_validator_1.body)("addressId")
                .not()
                .isEmpty()
                .withMessage("AddressId is required")
                .isString()
                .withMessage("AddressId must be a string"),
        ];
        _this.validateOrderPaymentFields = [
            (0, express_validator_1.body)("billingId")
                .not()
                .isEmpty()
                .withMessage("billingId is required")
                .isMongoId()
                .withMessage("not a valid billingId"),
            (0, express_validator_1.body)("paymentToken.id")
                .not()
                .isEmpty()
                .withMessage("paymentToken.id is required"),
            (0, express_validator_1.body)("paymentToken.email")
                .not()
                .isEmpty()
                .withMessage("paymentToken.email is required"),
            // body("amount").not().isEmpty().withMessage("amount is required"),
            // body("currency").not().isEmpty().withMessage("currency is required"),
        ];
        _this.validateAcceptJobRequestFields = [
            (0, express_validator_1.body)("type")
                .not()
                .isEmpty()
                .withMessage("type must be required.")
                .isIn(["ACCEPT", "REJECT"])
                .withMessage("type must be ACCEPT, REJECT"),
        ];
        _this.validateGetOrderDetails = [
            (0, express_validator_1.param)("orderId").isMongoId().withMessage("Not a valid order id"),
        ];
        _this.validateUpdateOrderStatus = [
            (0, express_validator_1.param)("orderId").isMongoId().withMessage("Not a valid order id"),
            (0, express_validator_1.body)("status")
                .isIn([
                "INITIATED",
                "COMPLETED",
                "CANCELLED",
                "CONFIRMED",
                "PACKED",
                "SHIPPED",
                "OUT_FOR_DELIVERY",
                "DELIVERED",
                "RECEIVED",
                "PAID",
                "TECHNICIAN_ASSIGNED",
                "TECHNICIAN_REACHED",
                "REPAIRED",
                "ADD_ON_SERVICE",
                "REPAIRING_STATED",
            ])
                .withMessage("not a valid status"),
            (0, express_validator_1.body)("eta")
                .optional()
                .custom(function (value) { return !isNaN(new Date(value).getMonth()); })
                .withMessage("not a valid date"),
        ];
        _this.validateSellOrderPlaceFields = [
            (0, express_validator_1.body)("addressId")
                .if(function (value, _a) {
                var _b;
                var req = _a.req;
                return ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.paymentMethod) === "CHEQUE";
            })
                .not()
                .isEmpty()
                .withMessage("AddressId is required")
                .isMongoId()
                .withMessage("AddressId is not a valid id"),
            (0, express_validator_1.body)("deviceId")
                .not()
                .isEmpty()
                .withMessage("deviceId is required")
                .isMongoId()
                .withMessage("deviceId is not a valid id"),
            (0, express_validator_1.body)("makeId")
                .not()
                .isEmpty()
                .withMessage("makeId is required")
                .isMongoId()
                .withMessage("makeId is not a valid id"),
            (0, express_validator_1.body)("modelId")
                .not()
                .isEmpty()
                .withMessage("modelId is required")
                .isMongoId()
                .withMessage("modelId is not a valid id"),
            (0, express_validator_1.body)("colorId")
                .not()
                .isEmpty()
                .withMessage("colorId is required")
                .isMongoId()
                .withMessage("colorId is not a valid id"),
            (0, express_validator_1.body)("memoryId")
                .not()
                .isEmpty()
                .withMessage("memoryId is required")
                .isMongoId()
                .withMessage("memoryId is not a valid id"),
            (0, express_validator_1.body)("paymentMethod")
                .not()
                .isEmpty()
                .withMessage("paymentMethod is required")
                .isIn(["ONLINE", "CHEQUE"])
                .withMessage("paymentMethod can only be ONLINE, CHEQUE"),
            (0, express_validator_1.body)("bankDetails.fullName")
                .if(function (value, _a) {
                var _b;
                var req = _a.req;
                return ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.paymentMethod) === "ONLINE";
            })
                .not()
                .isEmpty()
                .withMessage("bankDetails.fullName is required"),
            (0, express_validator_1.body)("bankDetails.accountNumber")
                .if(function (value, _a) {
                var _b;
                var req = _a.req;
                return ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.paymentMethod) === "ONLINE";
            })
                .not()
                .isEmpty()
                .withMessage("bankDetails.accountNumber is required"),
            (0, express_validator_1.body)("bankDetails.sortCode")
                .if(function (value, _a) {
                var _b;
                var req = _a.req;
                return ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.paymentMethod) === "ONLINE";
            })
                .not()
                .isEmpty()
                .withMessage("bankDetails.sortCode is required"),
            (0, express_validator_1.body)("falsyEvaluatedIds").optional(),
            (0, express_validator_1.body)("imei").not().isEmpty().withMessage("IMEI number is required"),
        ];
        _this.validateAddExtraChargesFields = [
            (0, express_validator_1.body)("serviceIds")
                .optional()
                .isArray()
                .isMongoId()
                .withMessage("serviceIds must be an array of serviceId"),
            (0, express_validator_1.body)("accessoryIds")
                .optional()
                .isArray()
                .isMongoId()
                .withMessage("accessoryIds must be an array of accessoryId"),
        ];
        _this.validateGetOrderInvoice = [
            (0, express_validator_1.body)("email")
                .not()
                .isEmpty()
                .withMessage("email is required")
                .isEmail()
                .withMessage("please enter a valid email"),
        ];
        return _this;
    }
    /** make order */
    Order.prototype.placeInStoreOrderController = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var orderData, billingData, error_1;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _k.trys.push([0, 4, , 5]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, _super.prototype.placeInStoreServiceOrder.call(this, {
                                storeId: (_a = req.body) === null || _a === void 0 ? void 0 : _a.storeId,
                                userId: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b._id,
                                serviceTime: (_c = req.body) === null || _c === void 0 ? void 0 : _c.serviceTime,
                                serviceIds: (_d = req.body) === null || _d === void 0 ? void 0 : _d.serviceIds,
                                modelId: (_e = req.body) === null || _e === void 0 ? void 0 : _e.modelId,
                                deviceId: (_f = req.body) === null || _f === void 0 ? void 0 : _f.deviceId,
                                makeId: (_g = req.body) === null || _g === void 0 ? void 0 : _g.makeId,
                            })];
                    case 1:
                        orderData = _k.sent();
                        return [4 /*yield*/, new billing_logic_1.default().createBill({
                                orderIds: orderData === null || orderData === void 0 ? void 0 : orderData._id,
                                status: "PENDING",
                                price: orderData === null || orderData === void 0 ? void 0 : orderData.price,
                                couponId: (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.couponId,
                                userId: (_j = req.currentUser) === null || _j === void 0 ? void 0 : _j._id,
                            })];
                    case 2:
                        billingData = _k.sent();
                        return [4 /*yield*/, (order_model_1.OrderModel === null || order_model_1.OrderModel === void 0 ? void 0 : order_model_1.OrderModel.findByIdAndUpdate(orderData === null || orderData === void 0 ? void 0 : orderData._id, {
                                billing: billingData === null || billingData === void 0 ? void 0 : billingData._id,
                            }, { new: true }))];
                    case 3:
                        orderData = (_k.sent());
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Order placed successfully",
                            data: orderData,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _k.sent();
                        next(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /** make mail in order */
    Order.prototype.placeMailInOrderController = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var orderData, billingData, error_2;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 4, , 5]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, _super.prototype.placeMailInServiceOrder.call(this, {
                                userId: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id,
                                addressId: (_b = req.body) === null || _b === void 0 ? void 0 : _b.addressId,
                                serviceIds: (_c = req.body) === null || _c === void 0 ? void 0 : _c.serviceIds,
                                modelId: (_d = req.body) === null || _d === void 0 ? void 0 : _d.modelId,
                                deviceId: (_e = req.body) === null || _e === void 0 ? void 0 : _e.deviceId,
                                makeId: (_f = req.body) === null || _f === void 0 ? void 0 : _f.makeId,
                            })];
                    case 1:
                        orderData = _j.sent();
                        return [4 /*yield*/, new billing_logic_1.default().createBill({
                                orderIds: orderData === null || orderData === void 0 ? void 0 : orderData._id,
                                status: "PENDING",
                                price: orderData === null || orderData === void 0 ? void 0 : orderData.price,
                                couponId: (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.couponId,
                                userId: (_h = req.currentUser) === null || _h === void 0 ? void 0 : _h._id,
                            })];
                    case 2:
                        billingData = _j.sent();
                        return [4 /*yield*/, (order_model_1.OrderModel === null || order_model_1.OrderModel === void 0 ? void 0 : order_model_1.OrderModel.findByIdAndUpdate(orderData === null || orderData === void 0 ? void 0 : orderData._id, {
                                billing: billingData === null || billingData === void 0 ? void 0 : billingData._id,
                            }, { new: true }))];
                    case 3:
                        orderData = (_j.sent());
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Order placed successfully",
                            data: orderData,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _j.sent();
                        next(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /** make call out order */
    Order.prototype.placeCallOutOrderController = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var orderData, billingData, error_3;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _k.trys.push([0, 4, , 5]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, _super.prototype.placeCallOutOrder.call(this, {
                                userId: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id,
                                address: (_b = req.body) === null || _b === void 0 ? void 0 : _b.address,
                                serviceIds: (_c = req.body) === null || _c === void 0 ? void 0 : _c.serviceIds,
                                modelId: (_d = req.body) === null || _d === void 0 ? void 0 : _d.modelId,
                                deviceId: (_e = req.body) === null || _e === void 0 ? void 0 : _e.deviceId,
                                makeId: (_f = req.body) === null || _f === void 0 ? void 0 : _f.makeId,
                                scheduledTime: (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.scheduledTime,
                            })];
                    case 1:
                        orderData = _k.sent();
                        return [4 /*yield*/, new billing_logic_1.default().createBill({
                                orderIds: orderData === null || orderData === void 0 ? void 0 : orderData._id,
                                status: "PENDING",
                                price: orderData === null || orderData === void 0 ? void 0 : orderData.price,
                                couponId: (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.couponId,
                                userId: (_j = req.currentUser) === null || _j === void 0 ? void 0 : _j._id,
                            })];
                    case 2:
                        billingData = _k.sent();
                        return [4 /*yield*/, (order_model_1.OrderModel === null || order_model_1.OrderModel === void 0 ? void 0 : order_model_1.OrderModel.findByIdAndUpdate(orderData === null || orderData === void 0 ? void 0 : orderData._id, {
                                billing: billingData === null || billingData === void 0 ? void 0 : billingData._id,
                            }, { new: true }))];
                    case 3:
                        orderData = (_k.sent());
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Order placed successfully",
                            data: orderData,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _k.sent();
                        next(error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /** make call out order */
    Order.prototype.placeSellOrderController = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __awaiter(this, void 0, void 0, function () {
            var orderData, error_4;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        _m.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, _super.prototype.placeSellOrder.call(this, {
                                userId: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id,
                                addressId: (_b = req.body) === null || _b === void 0 ? void 0 : _b.addressId,
                                deviceId: (_c = req.body) === null || _c === void 0 ? void 0 : _c.deviceId,
                                makeId: (_d = req.body) === null || _d === void 0 ? void 0 : _d.makeId,
                                modelId: (_e = req.body) === null || _e === void 0 ? void 0 : _e.modelId,
                                falsyEvaluatedIds: (_f = req.body) === null || _f === void 0 ? void 0 : _f.falsyEvaluatedIds,
                                paymentMethod: (_g = req.body) === null || _g === void 0 ? void 0 : _g.paymentMethod,
                                bankDetails: (_h = req.body) === null || _h === void 0 ? void 0 : _h.bankDetails,
                                colorId: (_j = req.body) === null || _j === void 0 ? void 0 : _j.colorId,
                                memoryId: (_k = req.body) === null || _k === void 0 ? void 0 : _k.memoryId,
                                imei: (_l = req.body) === null || _l === void 0 ? void 0 : _l.imei,
                            })];
                    case 1:
                        orderData = _m.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Sell order placed successfully",
                            data: orderData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _m.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** get order details*/
    Order.prototype.getOrderDetailsController = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var orderData, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, _super.prototype.getOrderDetails.call(this, req.params.orderId)];
                    case 1:
                        orderData = _a.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Order details found successfully",
                            data: orderData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** get order details*/
    Order.prototype.getOrderInvoiceController = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                try {
                    // validator error handler
                    (0, helper_1.fieldValidateError)(req);
                    _super.prototype.sendInvoiceToMail.call(this, {
                        orderId: req.params.orderId,
                        mail: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email,
                    });
                    res.status(200).json({
                        status: "SUCCESS",
                        message: "Invoice send successfully",
                    });
                }
                catch (error) {
                    next(error);
                }
                return [2 /*return*/];
            });
        });
    };
    /** get order details*/
    Order.prototype.downloadOrderInvoiceController = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var data, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, _super.prototype.sendInvoiceToMail.call(this, {
                                orderId: req.params.orderId,
                                mail: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email,
                                isDownload: true,
                            })];
                    case 1:
                        data = _b.sent();
                        res.status(200).send(data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _b.sent();
                        next(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** get order details*/
    Order.prototype.updateOrderDetailsController = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var orderData, error_7;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, _super.prototype.updateOrderDetails.call(this, {
                                orderId: req.params.orderId,
                                faceVideo: (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.faceVideo,
                                startImage: (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.startImage,
                                endImage: (_c = req === null || req === void 0 ? void 0 : req.files) === null || _c === void 0 ? void 0 : _c.endImage,
                            })];
                    case 1:
                        orderData = _d.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Order info updated successfully",
                            data: orderData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _d.sent();
                        next(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //TODO: add extra charges
    Order.prototype.addExtraChargesController = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, serviceIds, accessoryIds, orderId, orderPrevData, servicesData, accessoriesData, updateQuery, orderData, accessoryData, servicePriceData, basePrice, extraBilling, error_8;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 7, , 8]);
                        (0, helper_1.fieldValidateError)(req);
                        _c = req.body, serviceIds = _c.serviceIds, accessoryIds = _c.accessoryIds;
                        orderId = req.params.orderId;
                        return [4 /*yield*/, order_model_1.OrderModel.findById(orderId)];
                    case 1:
                        orderPrevData = _d.sent();
                        if (!orderPrevData)
                            throw new Error("order not found");
                        return [4 /*yield*/, servicePrice_model_1.ServicePriceModel.find({
                                _id: { $in: serviceIds },
                            }).populate("service")];
                    case 2:
                        servicesData = _d.sent();
                        return [4 /*yield*/, product_model_1.ProductModel.find({
                                _id: { $in: accessoryIds },
                            }).select("-images")];
                    case 3:
                        accessoriesData = _d.sent();
                        updateQuery = {};
                        (servicesData === null || servicesData === void 0 ? void 0 : servicesData.length) &&
                            (updateQuery["extraServices"] = JSON.parse(JSON.stringify(servicesData)));
                        (accessoriesData === null || accessoriesData === void 0 ? void 0 : accessoriesData.length) &&
                            (updateQuery["accessory"] = JSON.parse(JSON.stringify(accessoriesData)));
                        console.log(updateQuery);
                        return [4 /*yield*/, order_model_1.OrderModel.findByIdAndUpdate(orderId, updateQuery, { new: true })];
                    case 4:
                        orderData = _d.sent();
                        accessoryData = (_a = orderData === null || orderData === void 0 ? void 0 : orderData.accessory) === null || _a === void 0 ? void 0 : _a.reduce(function (prev, curr) {
                            prev = prev + (curr === null || curr === void 0 ? void 0 : curr.salePrice);
                            return prev;
                        }, 0);
                        servicePriceData = (_b = orderData === null || orderData === void 0 ? void 0 : orderData.extraServices) === null || _b === void 0 ? void 0 : _b.reduce(function (prev, curr) {
                            return (prev += curr === null || curr === void 0 ? void 0 : curr.salePrice);
                        }, 0);
                        basePrice = (accessoryData || 0) + (servicePriceData || 0);
                        return [4 /*yield*/, new billing_logic_1.default().createExtraFeesBilling({
                                orderId: [orderId],
                                basePrice: basePrice,
                            })];
                    case 5:
                        extraBilling = _d.sent();
                        return [4 /*yield*/, (order_model_1.OrderModel === null || order_model_1.OrderModel === void 0 ? void 0 : order_model_1.OrderModel.findByIdAndUpdate(orderId, {
                                extraBilling: extraBilling === null || extraBilling === void 0 ? void 0 : extraBilling._id,
                            }))];
                    case 6:
                        _d.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Extra charges added successfully",
                            data: extraBilling,
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        error_8 = _d.sent();
                        next(error_8);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * order status and ETA update
     */
    Order.prototype.updateOrderStatusController = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        return __awaiter(this, void 0, void 0, function () {
            var validETAData, orderData, _t, error_9;
            return __generator(this, function (_u) {
                switch (_u.label) {
                    case 0:
                        _u.trys.push([0, 9, , 10]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        validETAData = ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.eta)
                            ? new Date(req.body.eta)
                            : undefined;
                        return [4 /*yield*/, _super.prototype.updateOrderStatus.call(this, {
                                orderId: req.params.orderId,
                                status: req.body.status,
                                eta: validETAData,
                            })];
                    case 1:
                        orderData = _u.sent();
                        //send mail to user to notify about order status
                        new mail_controller_1.default().sendMail({
                            to: orderData.user.email,
                            subject: "Order status updated",
                            text: "\n        Hi ".concat(orderData.user.displayName, ",\n        ").concat((req.body.status || ((_b = orderData === null || orderData === void 0 ? void 0 : orderData.status) === null || _b === void 0 ? void 0 : _b.replace(/_/g, " "))) &&
                                "Your order ".concat(orderData.id, " has been updated to ").concat(req.body.status || ((_c = orderData === null || orderData === void 0 ? void 0 : orderData.status) === null || _c === void 0 ? void 0 : _c.replace(/_/g, " ")), "."), "\n        ").concat((orderData === null || orderData === void 0 ? void 0 : orderData.ETA)
                                ? "We will deliver your order by ".concat(new Date(orderData === null || orderData === void 0 ? void 0 : orderData.ETA).toLocaleString(), ".")
                                : "", "\n        Thanks,"),
                        });
                        _t = (_d = req.body.status) === null || _d === void 0 ? void 0 : _d.toString().toUpperCase();
                        switch (_t) {
                            case "DELIVERED": return [3 /*break*/, 2];
                            case "COMPLETED": return [3 /*break*/, 3];
                            case "CANCELLED": return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 7];
                    case 2:
                        new notification_logics_1.default().pushNotification({
                            userIds: [(_e = orderData === null || orderData === void 0 ? void 0 : orderData.user) === null || _e === void 0 ? void 0 : _e._id],
                            title: "Order Delivered",
                            body: "Your order ".concat(orderData === null || orderData === void 0 ? void 0 : orderData._id, " is ").concat((_f = (req.body.status || (orderData === null || orderData === void 0 ? void 0 : orderData.status))) === null || _f === void 0 ? void 0 : _f.replace(/_/g, " ")),
                        });
                        //SEND INVOICE TO USER
                        if ((_g = orderData === null || orderData === void 0 ? void 0 : orderData.user) === null || _g === void 0 ? void 0 : _g.email) {
                            new order_logic_1.default().sendInvoiceToMail({
                                mail: (_h = orderData === null || orderData === void 0 ? void 0 : orderData.user) === null || _h === void 0 ? void 0 : _h.email,
                                orderId: orderData === null || orderData === void 0 ? void 0 : orderData._id,
                            });
                        }
                        //SEND INVOICE TO DELIVERED ADDRESS
                        // if (orderData?.address?.email) {
                        //   new OrderLogic().sendInvoiceToMail({
                        //     mail: orderData?.address?.email,
                        //     orderId: orderData?._id,
                        //   });
                        // }
                        return [3 /*break*/, 8];
                    case 3:
                        new notification_logics_1.default().pushNotification({
                            userIds: [(_j = orderData === null || orderData === void 0 ? void 0 : orderData.user) === null || _j === void 0 ? void 0 : _j._id],
                            title: "Order COMPLETED",
                            body: "Your order ".concat(orderData === null || orderData === void 0 ? void 0 : orderData._id, " is ").concat((_k = (req.body.status || (orderData === null || orderData === void 0 ? void 0 : orderData.status))) === null || _k === void 0 ? void 0 : _k.replace(/_/g, " ")),
                        });
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(orderData === null || orderData === void 0 ? void 0 : orderData.quantity)) return [3 /*break*/, 6];
                        return [4 /*yield*/, product_model_1.ProductModel.findByIdAndUpdate((_l = orderData === null || orderData === void 0 ? void 0 : orderData.product) === null || _l === void 0 ? void 0 : _l._id, {
                                $inc: {
                                    stock: orderData === null || orderData === void 0 ? void 0 : orderData.quantity,
                                },
                            })];
                    case 5:
                        _u.sent();
                        _u.label = 6;
                    case 6:
                        new notification_logics_1.default().pushNotification({
                            userIds: [(_m = orderData === null || orderData === void 0 ? void 0 : orderData.user) === null || _m === void 0 ? void 0 : _m._id],
                            title: "Order Cancelled",
                            body: "Your order ".concat(orderData === null || orderData === void 0 ? void 0 : orderData._id, " is ").concat((_o = (req.body.status || (orderData === null || orderData === void 0 ? void 0 : orderData.status))) === null || _o === void 0 ? void 0 : _o.replace(/_/g, " ")),
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        new notification_logics_1.default().pushNotification({
                            userIds: [(_p = orderData === null || orderData === void 0 ? void 0 : orderData.user) === null || _p === void 0 ? void 0 : _p._id],
                            title: "Order status updated",
                            body: "Your order ".concat(orderData === null || orderData === void 0 ? void 0 : orderData._id, " is ").concat((_q = (req.body.status || (orderData === null || orderData === void 0 ? void 0 : orderData.status))) === null || _q === void 0 ? void 0 : _q.replace(/_/g, " ")),
                        });
                        new mail_controller_1.default().sendMail({
                            to: orderData.user.email,
                            subject: "Order status updated",
                            text: "\n            Hi ".concat(orderData.user.displayName, ",\n            ").concat((req.body.status || ((_r = orderData === null || orderData === void 0 ? void 0 : orderData.status) === null || _r === void 0 ? void 0 : _r.replace(/_/g, " "))) &&
                                "Your order ".concat(orderData.id, " has been updated to ").concat(req.body.status || ((_s = orderData === null || orderData === void 0 ? void 0 : orderData.status) === null || _s === void 0 ? void 0 : _s.replace(/_/g, " ")), "."), "\n            ").concat((orderData === null || orderData === void 0 ? void 0 : orderData.ETA)
                                ? "We will deliver your order by ".concat(new Date(orderData === null || orderData === void 0 ? void 0 : orderData.ETA).toLocaleString(), ".")
                                : "", "\n            Thanks,"),
                        });
                        return [3 /*break*/, 8];
                    case 8:
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Order status updated",
                            data: orderData,
                        });
                        return [3 /*break*/, 10];
                    case 9:
                        error_9 = _u.sent();
                        next(error_9);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * verify otp
     */
    Order.prototype.verifyOrderOtpController = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var orderData, _h, error_10;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 12, , 13]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, order_model_1.OrderModel.findById((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.orderId)];
                    case 1:
                        orderData = _j.sent();
                        if (!orderData)
                            throw new Error("order not found");
                        _h = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.type;
                        switch (_h) {
                            case "START_OTP": return [3 /*break*/, 2];
                            case "END_OTP": return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 10];
                    case 2:
                        if (!(((_c = orderData === null || orderData === void 0 ? void 0 : orderData.startOTP) === null || _c === void 0 ? void 0 : _c.otp) === ((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.otp))) return [3 /*break*/, 4];
                        return [4 /*yield*/, order_model_1.OrderModel.findByIdAndUpdate(orderData === null || orderData === void 0 ? void 0 : orderData._id, {
                                "startOTP.verifiedAt": new Date(),
                                "startOTP.isVerified": true,
                                status: ((_e = req === null || req === void 0 ? void 0 : req.currentUser) === null || _e === void 0 ? void 0 : _e.role) === "TECHNICIAN"
                                    ? "TECHNICIAN_REACHED"
                                    : "REPAIRING_STARTED",
                            })];
                    case 3:
                        _j.sent();
                        return [3 /*break*/, 5];
                    case 4: throw new Error("invalid startOtp");
                    case 5: return [3 /*break*/, 11];
                    case 6:
                        if (!(((_f = orderData === null || orderData === void 0 ? void 0 : orderData.endOTP) === null || _f === void 0 ? void 0 : _f.otp) === ((_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.otp))) return [3 /*break*/, 8];
                        return [4 /*yield*/, order_model_1.OrderModel.findByIdAndUpdate(orderData === null || orderData === void 0 ? void 0 : orderData._id, {
                                "endOTP.verifiedAt": new Date(),
                                "endOTP.isVerified": true,
                                status: "COMPLETED",
                            })];
                    case 7:
                        _j.sent();
                        return [3 /*break*/, 9];
                    case 8: throw new Error("invalid endOtp");
                    case 9: return [3 /*break*/, 11];
                    case 10: throw new Error("type is required, and must be START_OTP, END_OTP");
                    case 11:
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Order Otp verified Successfully",
                            data: orderData,
                        });
                        return [3 /*break*/, 13];
                    case 12:
                        error_10 = _j.sent();
                        next(error_10);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * order single product
     */
    Order.prototype.placeProductOrderController = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var orderData, billingData, error_11;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 4, , 5]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, _super.prototype.orderProduct.call(this, {
                                productId: (_a = req.body) === null || _a === void 0 ? void 0 : _a.productId,
                                userId: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b._id,
                                quantity: (_c = req.body) === null || _c === void 0 ? void 0 : _c.quantity,
                                shippedTo: (_d = req.body) === null || _d === void 0 ? void 0 : _d.addressId,
                                status: "PENDING",
                            })];
                    case 1:
                        orderData = _g.sent();
                        return [4 /*yield*/, new billing_logic_1.default().createBill({
                                orderIds: orderData === null || orderData === void 0 ? void 0 : orderData._id,
                                status: "PENDING",
                                price: orderData === null || orderData === void 0 ? void 0 : orderData.price,
                                couponId: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.couponId,
                                userId: (_f = req.currentUser) === null || _f === void 0 ? void 0 : _f._id,
                            })];
                    case 2:
                        billingData = _g.sent();
                        //add billing id in order data
                        return [4 /*yield*/, order_model_1.OrderModel.findByIdAndUpdate(orderData === null || orderData === void 0 ? void 0 : orderData._id, {
                                billing: billingData === null || billingData === void 0 ? void 0 : billingData._id,
                            }, { new: true })];
                    case 3:
                        //add billing id in order data
                        _g.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Order placed successfully",
                            data: billingData,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_11 = _g.sent();
                        next(error_11);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * order card item
     */
    Order.prototype.placeCartOrderController = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var cartItemList, orderedItems, _i, _h, cartItem, orderData, orderIds, price, billingData, error_12;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 7, , 8]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, new cart_logic_1.default().getCartItems((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id)];
                    case 1:
                        cartItemList = _j.sent();
                        orderedItems = [];
                        _i = 0, _h = cartItemList.products;
                        _j.label = 2;
                    case 2:
                        if (!(_i < _h.length)) return [3 /*break*/, 5];
                        cartItem = _h[_i];
                        return [4 /*yield*/, _super.prototype.orderProduct.call(this, {
                                productId: (_b = cartItem === null || cartItem === void 0 ? void 0 : cartItem.product) === null || _b === void 0 ? void 0 : _b._id,
                                userId: (_c = req.currentUser) === null || _c === void 0 ? void 0 : _c._id,
                                quantity: cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity,
                                shippedTo: (_d = req.body) === null || _d === void 0 ? void 0 : _d.addressId,
                                status: "PENDING",
                            })];
                    case 3:
                        orderData = _j.sent();
                        //add order item to array
                        orderedItems.push(orderData);
                        cartItem_model_1.CartItemModel.findOneAndDelete({
                            product: cartItem === null || cartItem === void 0 ? void 0 : cartItem.product,
                            user: (_e = req === null || req === void 0 ? void 0 : req.currentUser) === null || _e === void 0 ? void 0 : _e._id,
                        });
                        _j.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        orderIds = orderedItems === null || orderedItems === void 0 ? void 0 : orderedItems.map(function (item) { return item === null || item === void 0 ? void 0 : item._id; });
                        price = orderedItems.reduce(function (acc, item) { return acc + item.price; }, 0);
                        return [4 /*yield*/, new billing_logic_1.default().createBill({
                                orderIds: orderIds,
                                status: "PENDING",
                                price: price,
                                couponId: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.couponId,
                                userId: (_g = req.currentUser) === null || _g === void 0 ? void 0 : _g._id,
                            })];
                    case 6:
                        billingData = _j.sent();
                        //add billing id in order data
                        order_model_1.OrderModel.updateMany({ _id: { $in: orderIds } }, {
                            billing: billingData === null || billingData === void 0 ? void 0 : billingData._id,
                        }, {
                            new: true,
                        });
                        //remove items from card
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Orders placed successfully",
                            data: billingData,
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        error_12 = _j.sent();
                        next(error_12);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * order payment
     */
    Order.prototype.payOrderAmount = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15;
        return __awaiter(this, void 0, void 0, function () {
            var _16, email, id, _17, amount, currency, billingId, billingData_1, chargedData, orderData, _i, _18, order, allTechnician, configData_1, nearByTechnicians_1, orderInfo, socket_1, error_13;
            return __generator(this, function (_19) {
                switch (_19.label) {
                    case 0:
                        _19.trys.push([0, 9, , 10]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        _16 = (_a = req.body) === null || _a === void 0 ? void 0 : _a.paymentToken, email = _16.email, id = _16.id;
                        _17 = req.body, amount = _17.amount, currency = _17.currency, billingId = _17.billingId;
                        return [4 /*yield*/, billing_model_1.BillingModel.findById(billingId).populate("orders")];
                    case 1:
                        billingData_1 = _19.sent();
                        if (!billingData_1)
                            throw new Error("billingData not found");
                        return [4 /*yield*/, new stripe_logic_1.default().paymentSession({
                                amount: billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.total,
                                currency: "INR",
                                source: id,
                                email: email,
                                name: (_c = (_b = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _b === void 0 ? void 0 : _b.address) === null || _c === void 0 ? void 0 : _c.name,
                                address: {
                                    country: (_e = (_d = billingData_1.orders[0]) === null || _d === void 0 ? void 0 : _d.address) === null || _e === void 0 ? void 0 : _e.country,
                                    line1: (_g = (_f = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _f === void 0 ? void 0 : _f.address) === null || _g === void 0 ? void 0 : _g.street,
                                },
                            })];
                    case 2:
                        chargedData = _19.sent();
                        //update payment status on billing
                        return [4 /*yield*/, billing_model_1.BillingModel.findByIdAndUpdate(billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1._id, {
                                status: "PAID",
                                metadata: {
                                    charged_id: chargedData === null || chargedData === void 0 ? void 0 : chargedData.id,
                                    balance_transaction: chargedData === null || chargedData === void 0 ? void 0 : chargedData.balance_transaction,
                                },
                            })];
                    case 3:
                        //update payment status on billing
                        _19.sent();
                        return [4 /*yield*/, order_model_1.OrderModel.findOneAndUpdate({ _id: { $in: (_h = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders) === null || _h === void 0 ? void 0 : _h.map(function (item) { return item === null || item === void 0 ? void 0 : item._id; }) } }, { status: (billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.type) !== "EXTRA" ? "INITIATED" : undefined })];
                    case 4:
                        orderData = _19.sent();
                        product_model_1.ProductModel.updateMany({
                            _id: (_j = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders) === null || _j === void 0 ? void 0 : _j.map(function (order) { var _a; return (_a = order === null || order === void 0 ? void 0 : order.accessory) === null || _a === void 0 ? void 0 : _a._id; }),
                        }, {
                            $inc: {
                                stock: -1,
                            },
                        });
                        for (_i = 0, _18 = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders; _i < _18.length; _i++) {
                            order = _18[_i];
                            product_model_1.ProductModel === null || product_model_1.ProductModel === void 0 ? void 0 : product_model_1.ProductModel.findByIdAndUpdate({
                                _id: order === null || order === void 0 ? void 0 : order.product,
                            }, {
                                $inc: {
                                    stock: -(order === null || order === void 0 ? void 0 : order.quantity),
                                },
                            });
                        }
                        if (!(((_k = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _k === void 0 ? void 0 : _k.serviceType) === "CALL_OUT" &&
                            (billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.type) !== "EXTRA")) return [3 /*break*/, 8];
                        return [4 /*yield*/, user_model_1.UserModel.find({
                                role: "TECHNICIAN",
                                deviceType: (_m = (_l = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _l === void 0 ? void 0 : _l.device) === null || _m === void 0 ? void 0 : _m._id,
                                makeType: (_p = (_o = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _o === void 0 ? void 0 : _o.make) === null || _p === void 0 ? void 0 : _p._id,
                            })];
                    case 5:
                        allTechnician = _19.sent();
                        return [4 /*yield*/, models_1.ConfigSchema.findOne({})];
                    case 6:
                        configData_1 = _19.sent();
                        nearByTechnicians_1 = allTechnician
                            .filter(function (user) {
                            var _a, _b, _c, _d;
                            return (configData_1 === null || configData_1 === void 0 ? void 0 : configData_1.technicianSearchRange)
                                ? (configData_1 === null || configData_1 === void 0 ? void 0 : configData_1.technicianSearchRange) >=
                                    (0, core_helper_1.getDistance)((_b = (_a = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _a === void 0 ? void 0 : _a.address) === null || _b === void 0 ? void 0 : _b.latitude, (_d = (_c = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _c === void 0 ? void 0 : _c.address) === null || _d === void 0 ? void 0 : _d.longitude, user === null || user === void 0 ? void 0 : user.latitude, user === null || user === void 0 ? void 0 : user.longitude, "K")
                                : true;
                        })
                            .map(function (user) { return user === null || user === void 0 ? void 0 : user._id; });
                        return [4 /*yield*/, order_model_1.OrderModel.findByIdAndUpdate((_q = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _q === void 0 ? void 0 : _q._id, {
                                nearByTechnicians: nearByTechnicians_1,
                            })];
                    case 7:
                        orderInfo = _19.sent();
                        new notification_logics_1.default().pushNotification({
                            title: "New job request",
                            body: "",
                            userIds: nearByTechnicians_1,
                        });
                        socket_1 = (0, socket_io_client_1.io)("".concat(req.protocol, "://").concat(req.headers.host, "/incoming-job"));
                        socket_1.on("connect", function () {
                            for (var _i = 0, nearByTechnicians_2 = nearByTechnicians_1; _i < nearByTechnicians_2.length; _i++) {
                                var technicianId = nearByTechnicians_2[_i];
                                socket_1.emit("NEW-JOB-REQUEST", {
                                    technicianId: technicianId,
                                });
                            }
                        });
                        _19.label = 8;
                    case 8:
                        if ((billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.type) === "EXTRA") {
                            //confirmation mail for user
                            ((_s = (_r = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _r === void 0 ? void 0 : _r.user) === null || _s === void 0 ? void 0 : _s.email) &&
                                new mail_controller_1.default().sendMail({
                                    to: (_u = (_t = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _t === void 0 ? void 0 : _t.user) === null || _u === void 0 ? void 0 : _u.email,
                                    subject: "Extra bill paid successfully",
                                    text: "\n          Hi ".concat((_w = (_v = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _v === void 0 ? void 0 : _v.user) === null || _w === void 0 ? void 0 : _w.displayName, ",\n          your extra bill paid successfully for order #").concat((_x = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _x === void 0 ? void 0 : _x._id, "\n          Thanks,"),
                                });
                            //confirmation mail for technician
                            ((_z = (_y = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _y === void 0 ? void 0 : _y.technician) === null || _z === void 0 ? void 0 : _z.email) &&
                                new mail_controller_1.default().sendMail({
                                    to: (_1 = (_0 = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _0 === void 0 ? void 0 : _0.technician) === null || _1 === void 0 ? void 0 : _1.email,
                                    subject: "Extra bill paid successfully",
                                    text: "\n          Hi ".concat((_3 = (_2 = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _2 === void 0 ? void 0 : _2.technician) === null || _3 === void 0 ? void 0 : _3.displayName, ",\n          Extra bill paid successfully for order #").concat((_4 = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _4 === void 0 ? void 0 : _4._id, ", by ").concat((_6 = (_5 = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _5 === void 0 ? void 0 : _5.user) === null || _6 === void 0 ? void 0 : _6.displayName, "\n          Thanks,"),
                                });
                            //confirmation mail for store
                            ((_8 = (_7 = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _7 === void 0 ? void 0 : _7.store) === null || _8 === void 0 ? void 0 : _8.email) &&
                                new mail_controller_1.default().sendMail({
                                    to: (_10 = (_9 = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _9 === void 0 ? void 0 : _9.store) === null || _10 === void 0 ? void 0 : _10.email,
                                    subject: "Extra bill paid successfully",
                                    text: "\n          Hi ".concat((_12 = (_11 = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _11 === void 0 ? void 0 : _11.store) === null || _12 === void 0 ? void 0 : _12.displayName, " store manager,\n          Extra bill paid successfully for order #").concat((_13 = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _13 === void 0 ? void 0 : _13._id, ", by ").concat((_15 = (_14 = billingData_1 === null || billingData_1 === void 0 ? void 0 : billingData_1.orders[0]) === null || _14 === void 0 ? void 0 : _14.user) === null || _15 === void 0 ? void 0 : _15.displayName, "\n          Thanks,"),
                                });
                        }
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Order paid Successfully",
                            data: orderData,
                        });
                        return [3 /*break*/, 10];
                    case 9:
                        error_13 = _19.sent();
                        next(error_13);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * react-native specific PaymentIntents
     */
    Order.prototype.reactNativePaymentIntentsController = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var billingId, billingData, data, error_14;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 3, , 4]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        billingId = req.body.billingId;
                        return [4 /*yield*/, billing_model_1.BillingModel.findById(billingId).populate("orders")];
                    case 1:
                        billingData = _g.sent();
                        return [4 /*yield*/, new stripe_logic_1.default().reactNativePaymentIntents({
                                amount: billingData === null || billingData === void 0 ? void 0 : billingData.total,
                                currency: "INR",
                                address: {
                                    country: (_b = (_a = billingData === null || billingData === void 0 ? void 0 : billingData.orders[0]) === null || _a === void 0 ? void 0 : _a.address) === null || _b === void 0 ? void 0 : _b.country,
                                    line1: (_d = (_c = billingData === null || billingData === void 0 ? void 0 : billingData.orders[0]) === null || _c === void 0 ? void 0 : _c.address) === null || _d === void 0 ? void 0 : _d.street,
                                },
                                name: (_f = (_e = billingData === null || billingData === void 0 ? void 0 : billingData.orders[0]) === null || _e === void 0 ? void 0 : _e.address) === null || _f === void 0 ? void 0 : _f.name,
                            })];
                    case 2:
                        data = _g.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Payment initiated Successfully",
                            data: data,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_14 = _g.sent();
                        next(error_14);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * make order paid
     */
    Order.prototype.makeOrderPaidController = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
        return __awaiter(this, void 0, void 0, function () {
            var _8, billingId, paymentId, clientSecret, billingData_2, orderData, allTechnician, configData_2, nearByTechnicians_3, socket_2, error_15;
            return __generator(this, function (_9) {
                switch (_9.label) {
                    case 0:
                        _9.trys.push([0, 8, , 9]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        _8 = req.body, billingId = _8.billingId, paymentId = _8.paymentId, clientSecret = _8.clientSecret;
                        return [4 /*yield*/, billing_model_1.BillingModel.findById(billingId).populate("orders")];
                    case 1:
                        billingData_2 = _9.sent();
                        if (!billingData_2)
                            throw new Error("billingData not found");
                        //update payment status on billing
                        return [4 /*yield*/, billing_model_1.BillingModel.findByIdAndUpdate(billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2._id, {
                                status: "PAID",
                                metadata: {
                                    paymentId: paymentId,
                                    clientSecret: clientSecret,
                                },
                            })];
                    case 2:
                        //update payment status on billing
                        _9.sent();
                        return [4 /*yield*/, order_model_1.OrderModel.updateMany({ _id: { $in: (_a = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders) === null || _a === void 0 ? void 0 : _a.map(function (item) { return item === null || item === void 0 ? void 0 : item._id; }) } }, { status: (billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.type) !== "EXTRA" ? "INITIATED" : undefined })];
                    case 3:
                        orderData = _9.sent();
                        if (!(((_b = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _b === void 0 ? void 0 : _b.serviceType) === "CALL_OUT" &&
                            (billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.type) !== "EXTRA")) return [3 /*break*/, 7];
                        return [4 /*yield*/, user_model_1.UserModel.find({
                                role: "TECHNICIAN",
                                deviceType: (_d = (_c = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _c === void 0 ? void 0 : _c.device) === null || _d === void 0 ? void 0 : _d._id,
                                makeType: (_f = (_e = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _e === void 0 ? void 0 : _e.make) === null || _f === void 0 ? void 0 : _f._id,
                            })];
                    case 4:
                        allTechnician = _9.sent();
                        return [4 /*yield*/, models_1.ConfigSchema.findOne({})];
                    case 5:
                        configData_2 = _9.sent();
                        nearByTechnicians_3 = allTechnician
                            .filter(function (user) {
                            var _a, _b, _c, _d;
                            return (configData_2 === null || configData_2 === void 0 ? void 0 : configData_2.technicianSearchRange)
                                ? (configData_2 === null || configData_2 === void 0 ? void 0 : configData_2.technicianSearchRange) >=
                                    (0, core_helper_1.getDistance)((_b = (_a = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _a === void 0 ? void 0 : _a.address) === null || _b === void 0 ? void 0 : _b.latitude, (_d = (_c = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _c === void 0 ? void 0 : _c.address) === null || _d === void 0 ? void 0 : _d.longitude, user === null || user === void 0 ? void 0 : user.latitude, user === null || user === void 0 ? void 0 : user.longitude, "K")
                                : true;
                        })
                            .map(function (user) { return user === null || user === void 0 ? void 0 : user._id; });
                        return [4 /*yield*/, order_model_1.OrderModel.findByIdAndUpdate((_g = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _g === void 0 ? void 0 : _g._id, {
                                nearByTechnicians: nearByTechnicians_3,
                            })];
                    case 6:
                        _9.sent();
                        new notification_logics_1.default().pushNotification({
                            title: "New job request",
                            body: "",
                            userIds: nearByTechnicians_3,
                        });
                        //send socket event to every
                        console.log({
                            socketUrl: "".concat(req.protocol, "://").concat(req.headers.host, "/incoming-job"),
                        });
                        socket_2 = (0, socket_io_client_1.io)("".concat(req.protocol, "://").concat(req.headers.host, "/incoming-job"));
                        console.log("touch socket");
                        socket_2.on("connect", function () {
                            console.log("CONNECTED");
                            for (var _i = 0, nearByTechnicians_4 = nearByTechnicians_3; _i < nearByTechnicians_4.length; _i++) {
                                var technicianId = nearByTechnicians_4[_i];
                                // console.log("TECHNICIAN", technicianId);
                                socket_2.emit("NEW-JOB-REQUEST", {
                                    technicianId: technicianId,
                                });
                            }
                        });
                        socket_2.on("close", function () {
                            console.log("close");
                        });
                        socket_2.on("error", function (error) {
                            console.log("SOCKET ERROR", error);
                        });
                        _9.label = 7;
                    case 7:
                        if ((billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.type) === "EXTRA") {
                            //confirmation mail for user
                            ((_j = (_h = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _h === void 0 ? void 0 : _h.user) === null || _j === void 0 ? void 0 : _j.email) &&
                                new mail_controller_1.default().sendMail({
                                    to: (_l = (_k = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _k === void 0 ? void 0 : _k.user) === null || _l === void 0 ? void 0 : _l.email,
                                    subject: "Extra bill paid successfully",
                                    text: "\n          Hi ".concat((_o = (_m = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _m === void 0 ? void 0 : _m.user) === null || _o === void 0 ? void 0 : _o.displayName, ",\n          your extra bill paid successfully for order #").concat((_p = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _p === void 0 ? void 0 : _p._id, "\n          Thanks,"),
                                });
                            //confirmation mail for technician
                            ((_r = (_q = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _q === void 0 ? void 0 : _q.technician) === null || _r === void 0 ? void 0 : _r.email) &&
                                new mail_controller_1.default().sendMail({
                                    to: (_t = (_s = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _s === void 0 ? void 0 : _s.technician) === null || _t === void 0 ? void 0 : _t.email,
                                    subject: "Extra bill paid successfully",
                                    text: "\n          Hi ".concat((_v = (_u = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _u === void 0 ? void 0 : _u.technician) === null || _v === void 0 ? void 0 : _v.displayName, ",\n          Extra bill paid successfully for order #").concat((_w = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _w === void 0 ? void 0 : _w._id, ", by ").concat((_y = (_x = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _x === void 0 ? void 0 : _x.user) === null || _y === void 0 ? void 0 : _y.displayName, "\n          Thanks,"),
                                });
                            //confirmation mail for store
                            ((_0 = (_z = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _z === void 0 ? void 0 : _z.store) === null || _0 === void 0 ? void 0 : _0.email) &&
                                new mail_controller_1.default().sendMail({
                                    to: (_2 = (_1 = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _1 === void 0 ? void 0 : _1.store) === null || _2 === void 0 ? void 0 : _2.email,
                                    subject: "Extra bill paid successfully",
                                    text: "\n          Hi ".concat((_4 = (_3 = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _3 === void 0 ? void 0 : _3.store) === null || _4 === void 0 ? void 0 : _4.displayName, " store manager,\n          Extra bill paid successfully for order #").concat((_5 = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _5 === void 0 ? void 0 : _5._id, ", by ").concat((_7 = (_6 = billingData_2 === null || billingData_2 === void 0 ? void 0 : billingData_2.orders[0]) === null || _6 === void 0 ? void 0 : _6.user) === null || _7 === void 0 ? void 0 : _7.displayName, "\n          Thanks,"),
                                });
                        }
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Order paid Successfully",
                            data: orderData,
                        });
                        return [3 /*break*/, 9];
                    case 8:
                        error_15 = _9.sent();
                        next(error_15);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /** order summery */
    Order.prototype.productOrderSummery = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var orderData, totalMrp, totalSalePrice, discount, billingData, _j, productData, cartItemData, cartItem, error_16;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _k.trys.push([0, 10, , 11]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        orderData = void 0;
                        totalMrp = void 0;
                        totalSalePrice = void 0;
                        discount = void 0;
                        billingData = void 0;
                        _j = (_b = (_a = req.query.type) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.toUpperCase();
                        switch (_j) {
                            case "PRODUCT": return [3 /*break*/, 1];
                            case "CART": return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 8];
                    case 1:
                        if (!req.query.productId)
                            throw new Error("Product id is required");
                        if (!req.query.quantity)
                            throw new Error("Quantity is required");
                        return [4 /*yield*/, product_model_1.ProductModel.findById((_c = req.query) === null || _c === void 0 ? void 0 : _c.productId)];
                    case 2:
                        productData = _k.sent();
                        // check if product is available
                        if (!productData)
                            throw new Error("Product not found");
                        cartItemData = new cartItem_model_1.CartItemModel({
                            user: (_d = req.currentUser) === null || _d === void 0 ? void 0 : _d._id,
                            product: req.query.productId,
                            quantity: req.query.quantity,
                        });
                        return [4 /*yield*/, new billing_logic_1.default().calculateItemBilling({
                                productId: req.query.productId,
                                quantity: Number(req.query.quantity),
                                couponId: req.query.couponId,
                                userId: (_e = req.currentUser) === null || _e === void 0 ? void 0 : _e._id,
                            })];
                    case 3:
                        // // find cart item
                        // cartItemData = await CartItemModel.findOneAndUpdate(
                        //   {
                        //     user: req.currentUser?._id,
                        //     product: req.query.productId,
                        //   },
                        //   {
                        //     quantity: req.query.quantity,
                        //     user: req.currentUser?._id,
                        //     product: req.query.productId,
                        //   },
                        //   {
                        //     new: true,
                        //   }
                        // );
                        // // if cart item not found create new cart item
                        // if (!cartItemData) {
                        //   //create cart item
                        //   cartItemData = await new CartItemModel({
                        //     user: req.currentUser?._id,
                        //     product: req.query.productId,
                        //     quantity: req.query.quantity,
                        //   }).save();
                        // }
                        billingData = _k.sent();
                        cartItemData.total = cartItemData.quantity * productData.salePrice;
                        return [4 /*yield*/, cartItemData.populate("product")];
                    case 4:
                        _k.sent();
                        totalMrp = ((_f = cartItemData.product) === null || _f === void 0 ? void 0 : _f.mrp) * cartItemData.quantity;
                        totalSalePrice = billingData.amount;
                        discount = totalMrp - totalSalePrice;
                        orderData = {
                            products: [cartItemData],
                            totalMrp: totalMrp,
                            totalSalePrice: totalSalePrice,
                            discount: discount,
                            couponInfo: billingData === null || billingData === void 0 ? void 0 : billingData.couponInfo,
                        };
                        return [3 /*break*/, 9];
                    case 5: return [4 /*yield*/, new cart_logic_1.default().getCartItems((_g = req.currentUser) === null || _g === void 0 ? void 0 : _g._id)];
                    case 6:
                        cartItem = _k.sent();
                        totalMrp = cartItem.products.reduce(function (acc, curr) { return (acc += curr.product.mrp * curr.quantity); }, 0);
                        return [4 /*yield*/, new billing_logic_1.default().calculateCartItemBilling({
                                couponId: req.query.couponId,
                                userId: (_h = req.currentUser) === null || _h === void 0 ? void 0 : _h._id,
                            })];
                    case 7:
                        billingData = _k.sent();
                        totalSalePrice = billingData.amount;
                        discount = totalMrp - totalSalePrice;
                        orderData = {
                            products: cartItem.products,
                            totalMrp: totalMrp,
                            totalSalePrice: totalSalePrice,
                            discount: discount,
                            couponInfo: billingData === null || billingData === void 0 ? void 0 : billingData.couponInfo,
                        };
                        return [3 /*break*/, 9];
                    case 8: throw new Error("Type is required and must be either PRODUCT or CART");
                    case 9:
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Orders found successfully",
                            data: orderData,
                        });
                        return [3 /*break*/, 11];
                    case 10:
                        error_16 = _k.sent();
                        next(error_16);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**get sell order summery */
    Order.prototype.sellOrderSummery = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                try {
                    // validator error handler
                    (0, helper_1.fieldValidateError)(req);
                    _a = req.query;
                    res.status(200).json({
                        status: "SUCCESS",
                        message: "Sell summery fetched successfully",
                    });
                }
                catch (error) {
                    next(error);
                }
                return [2 /*return*/];
            });
        });
    };
    /** get job requests */
    Order.prototype.getJobRequestController = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var jobRequests, error_17;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, order_model_1.OrderModel.aggregate([
                                {
                                    $match: {
                                        nearByTechnicians: new mongoose_1.Types.ObjectId((_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a._id),
                                    },
                                },
                                {
                                    $sort: {
                                        createdAt: -1,
                                    },
                                },
                            ])];
                    case 1:
                        jobRequests = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Job requests fetched successfully",
                            data: jobRequests,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_17 = _b.sent();
                        next(error_17);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** accept job requests */
    Order.prototype.acceptJobRequestController = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var _h, orderInfo, newTech, rejectedOrder, technicianData, jobRequests_1, socket_3, error_18;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 8, , 9]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        _h = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.type;
                        switch (_h) {
                            case "REJECT": return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, order_model_1.OrderModel.findById((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.orderId)];
                    case 2:
                        orderInfo = _j.sent();
                        newTech = (_c = orderInfo === null || orderInfo === void 0 ? void 0 : orderInfo.nearByTechnicians) === null || _c === void 0 ? void 0 : _c.filter(function (item) {
                            var _a, _b;
                            return !((item === null || item === void 0 ? void 0 : item.toString()) === ((_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a._id) ||
                                (item === null || item === void 0 ? void 0 : item.toString()) === ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.technicianId));
                        });
                        console.log({ newTech: newTech });
                        return [4 /*yield*/, order_model_1.OrderModel.findByIdAndUpdate((_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.orderId, {
                                nearByTechnicians: newTech,
                            })];
                    case 3:
                        rejectedOrder = _j.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Job requests rejected successfully",
                            data: rejectedOrder,
                        });
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, user_model_1.UserModel.findById(((_e = req === null || req === void 0 ? void 0 : req.currentUser) === null || _e === void 0 ? void 0 : _e._id) || ((_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.technicianId)).select("displayName phoneNumber country avatar email gender role reviews")];
                    case 5:
                        technicianData = _j.sent();
                        if (!technicianData)
                            throw new Error("Technician not found");
                        return [4 /*yield*/, order_model_1.OrderModel.findByIdAndUpdate((_g = req === null || req === void 0 ? void 0 : req.params) === null || _g === void 0 ? void 0 : _g.orderId, {
                                nearByTechnicians: [],
                                technicianID: technicianData === null || technicianData === void 0 ? void 0 : technicianData._id,
                                technician: technicianData,
                                status: "TECHNICIAN_ASSIGNED",
                            })];
                    case 6:
                        jobRequests_1 = _j.sent();
                        socket_3 = (0, socket_io_client_1.io)("".concat(req.protocol, "://").concat(req.headers.host, "/incoming-job"));
                        socket_3.on("connect", function () {
                            for (var technicianId in jobRequests_1 === null || jobRequests_1 === void 0 ? void 0 : jobRequests_1.nearByTechnicians) {
                                socket_3.emit("NEW-JOB-REQUEST", {
                                    technicianId: technicianId,
                                });
                            }
                        });
                        res.json({
                            status: "SUCCESS",
                            message: "Job requests accepted successfully",
                            data: jobRequests_1,
                        });
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_18 = _j.sent();
                        next(error_18);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * get stores all orders
     * @param req
     * @param res
     * @param next
     */
    Order.prototype.getAllOrdersController = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __awaiter(this, void 0, void 0, function () {
            var query, orderData, error_19;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        _s.trys.push([0, 2, , 3]);
                        query = {
                            status: ((_b = (_a = req === null || req === void 0 ? void 0 : req.query.status) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.toUpperCase()) === "ONGOING"
                                ? {
                                    $nin: [
                                        "PENDING",
                                        "COMPLETED",
                                        "CANCELLED",
                                        "DELIVERED",
                                        "PAID",
                                    ],
                                }
                                : (_d = (_c = req.query.status) === null || _c === void 0 ? void 0 : _c.toString()) === null || _d === void 0 ? void 0 : _d.toUpperCase(),
                            userID: (_e = req === null || req === void 0 ? void 0 : req.currentUser) === null || _e === void 0 ? void 0 : _e._id,
                            storeID: (_f = req.currentUser) === null || _f === void 0 ? void 0 : _f.store,
                            technicianID: (_g = req.currentUser) === null || _g === void 0 ? void 0 : _g._id,
                            serviceType: (_h = req === null || req === void 0 ? void 0 : req.query) === null || _h === void 0 ? void 0 : _h.serviceType,
                            type: ((_j = req === null || req === void 0 ? void 0 : req.query) === null || _j === void 0 ? void 0 : _j.type)
                                ? {
                                    $in: Array.isArray((_k = req === null || req === void 0 ? void 0 : req.query) === null || _k === void 0 ? void 0 : _k.type)
                                        ? (_l = req === null || req === void 0 ? void 0 : req.query) === null || _l === void 0 ? void 0 : _l.type
                                        : [(_m = req === null || req === void 0 ? void 0 : req.query) === null || _m === void 0 ? void 0 : _m.type],
                                }
                                : undefined,
                        };
                        !((_o = req === null || req === void 0 ? void 0 : req.query) === null || _o === void 0 ? void 0 : _o.status) && (query === null || query === void 0 ? true : delete query.status);
                        !req.query.serviceType && (query === null || query === void 0 ? true : delete query.serviceType);
                        ((_p = req === null || req === void 0 ? void 0 : req.currentUser) === null || _p === void 0 ? void 0 : _p.role) !== "MANAGER" && (query === null || query === void 0 ? true : delete query.storeID);
                        ((_q = req === null || req === void 0 ? void 0 : req.currentUser) === null || _q === void 0 ? void 0 : _q.role) !== "TECHNICIAN" && (query === null || query === void 0 ? true : delete query.technicianID);
                        ((_r = req === null || req === void 0 ? void 0 : req.currentUser) === null || _r === void 0 ? void 0 : _r.role) !== "USER" && (query === null || query === void 0 ? true : delete query.userID);
                        !req.query.type && (query === null || query === void 0 ? true : delete query.type);
                        return [4 /*yield*/, (0, helper_1.paginationHelper)({
                                model: order_model_1.OrderModel,
                                query: query,
                                sort: { createdAt: -1 },
                                limit: req.query.limit ? Number(req.query.limit) : undefined,
                                chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
                                populate: "billing extraBilling",
                            })];
                    case 1:
                        orderData = _s.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Orders found successfully",
                            data: orderData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_19 = _s.sent();
                        next(error_19);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * order cancelation
     */
    Order.prototype.orderCancelationController = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var configData, orderData, orderPlacedTime, error_20;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, models_1.ConfigSchema.findOne({})];
                    case 1:
                        configData = _c.sent();
                        return [4 /*yield*/, (order_model_1.OrderModel === null || order_model_1.OrderModel === void 0 ? void 0 : order_model_1.OrderModel.findById((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.orderId))];
                    case 2:
                        orderData = _c.sent();
                        if (!orderData)
                            throw new Error("Order not found");
                        orderPlacedTime = (new Date().getTime() - new Date(orderData === null || orderData === void 0 ? void 0 : orderData.createdAt).getTime()) /
                            (1000 * 60);
                        if (configData === null || configData === void 0 ? void 0 : configData.orderCancelTime) {
                            if (orderPlacedTime >= (configData === null || configData === void 0 ? void 0 : configData.orderCancelTime))
                                throw new Error("Order cannot be canceled after order cancellation time has passed i.e: ".concat(configData === null || configData === void 0 ? void 0 : configData.orderCancelTime, " mins"));
                        }
                        return [4 /*yield*/, order_model_1.OrderModel.findByIdAndUpdate((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.orderId, {
                                status: "CANCELLED",
                            })];
                    case 3:
                        orderData = _c.sent();
                        billing_model_1.BillingModel.updateMany({ orders: orderData === null || orderData === void 0 ? void 0 : orderData._id }, {
                            status: "CANCELLED",
                        });
                        res.json({
                            status: "SUCCESS",
                            message: "Orders cancelled successfully",
                            data: orderData,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_20 = _c.sent();
                        next(error_20);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Order;
}(order_logic_1.default));
exports.default = Order;
