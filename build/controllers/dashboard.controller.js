"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var helper_1 = require("../helper");
var order_model_1 = require("../models/order.model");
var product_model_1 = require("../models/product.model");
var store_model_1 = require("../models/store.model");
var user_model_1 = require("../models/user.model");
var DashboardController = /** @class */ (function () {
    function DashboardController() {
    }
    DashboardController.prototype.orderStatusAndServiceType = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, status_1, serviceType, type, arrayStatusCheck, arrayServiceTypeCheck, query_1, orderStatusCount, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, status_1 = _a.status, serviceType = _a.serviceType, type = _a.type;
                        arrayStatusCheck = status_1
                            ? Array.isArray(status_1)
                                ? status_1
                                : [status_1]
                            : undefined;
                        arrayServiceTypeCheck = serviceType
                            ? Array.isArray(serviceType)
                                ? serviceType
                                : [serviceType]
                            : undefined;
                        query_1 = {};
                        arrayStatusCheck && (query_1["status"] = { $in: arrayStatusCheck });
                        arrayServiceTypeCheck &&
                            (query_1["serviceType"] = { $in: arrayServiceTypeCheck });
                        type && (query_1["type"] = type);
                        return [4 /*yield*/, order_model_1.OrderModel.find(__assign({}, query_1)).count()];
                    case 1:
                        orderStatusCount = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Order count fetched successfully",
                            data: orderStatusCount,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DashboardController.prototype.totalUserCount = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var role, arg, totalUserCount, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        role = req.query.role;
                        arg = {};
                        role && (arg["role"] = role);
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, user_model_1.UserModel.find(arg).count()];
                    case 1:
                        totalUserCount = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Users found successfully.",
                            data: totalUserCount,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DashboardController.prototype.repairOrderCount = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var orderStatus, orderTypeArg, orderData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        orderStatus = req.query.orderStatus;
                        (0, helper_1.fieldValidateError)(req);
                        orderTypeArg = {};
                        orderStatus === "REPAIRED" && (orderTypeArg["status"] = "COMPLETED");
                        return [4 /*yield*/, order_model_1.OrderModel.find(__assign({ serviceType: { $exists: true } }, orderTypeArg)).count()];
                    case 1:
                        orderData = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Repair order count fetched successfully.",
                            data: orderData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DashboardController.prototype.refurbishedProductCount = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, type, refurbishOrderCount, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query.type, type = _a === void 0 ? "REFURBISHED" : _a;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, product_model_1.ProductModel.find({
                                type: type,
                            }).count()];
                    case 1:
                        refurbishOrderCount = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "".concat(type === "REFURBISHED" ? "Refurbished" : "Accessory", " product count fetched successfully."),
                            data: refurbishOrderCount,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DashboardController.prototype.revenue = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var revenueCalculation, resultData, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, order_model_1.OrderModel.aggregate([
                                {
                                    $group: {
                                        _id: null,
                                        buyRevenue: {
                                            $sum: {
                                                $cond: [{ $eq: ["$type", "BUY"] }, "$price", 0],
                                            },
                                        },
                                        sellRevenue: {
                                            $sum: {
                                                $ifNull: ["$price", 0],
                                            },
                                        },
                                        repairRevenue: {
                                            $sum: {
                                                $cond: [{ $eq: ["$type", "REPAIR"] }, "$price", 0],
                                            },
                                        },
                                    },
                                },
                            ])];
                    case 1:
                        revenueCalculation = _a.sent();
                        resultData = __assign(__assign({}, revenueCalculation === null || revenueCalculation === void 0 ? void 0 : revenueCalculation[0]), { _id: undefined });
                        res.json({
                            status: "SUCCESS",
                            message: "Revenue calculation fetched successfully.",
                            data: resultData,
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
    DashboardController.prototype.storeCount = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var storeCount, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, store_model_1.StoreModel.find({ type: "STORE" }).count()];
                    case 1:
                        storeCount = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            data: storeCount,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DashboardController;
}());
exports.DashboardControllerValidation = {
    orderStatusAndServiceType: [
        (0, express_validator_1.query)("status")
            .optional()
            .exists()
            .custom(function (value) {
            var arrayCheck = Array.isArray(value) ? value : [value];
            var allDataArray = [
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
            ];
            var filterData = arrayCheck.filter(function (item) {
                return allDataArray.find(function (item2) { return item === item2; });
            });
            return Boolean(filterData.length);
        })
            .withMessage("Status must be among of these INITIATED,COMPLETED, CANCELLED, CONFIRMED, PACKED, SHIPPED, OUT_FOR_DELIVERY,DELIVERED, RECEIVED, PAID, TECHNICIAN_ASSIGNED, TECHNICIAN_REACHED, REPAIRED, ADD_ON_SERVICE "),
        (0, express_validator_1.query)("serviceType")
            .optional()
            .exists()
            .custom(function (value) {
            var arrayCheck = Array.isArray(value) ? value : [value];
            var allDataArray = ["IN_STOR", "MAIL_IN", "CALL_OUT"];
            var filterData = arrayCheck.filter(function (item) {
                return allDataArray.find(function (item2) { return item === item2; });
            });
            return Boolean(filterData.length);
        })
            .withMessage("ServiceType must be among of these  IN_STOR or MAIL_IN or CALL_OUT."),
        (0, express_validator_1.query)("type")
            .optional()
            .exists()
            .custom(function (value) {
            var arrayCheck = Array.isArray(value) ? value : [value];
            var allDataArray = ["SELL", "BUY"];
            var filterData = arrayCheck.filter(function (item) {
                return allDataArray.find(function (item2) { return item === item2; });
            });
            return Boolean(filterData.length);
        })
            .withMessage("type must be among of these  SELL or BUY."),
    ],
    repairOrderCount: [
        (0, express_validator_1.query)("orderStatus")
            .optional()
            .exists()
            .custom(function (value) {
            var _a;
            return Boolean(["REPAIRED", "PENDING"].includes((_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.toUpperCase()));
        })
            .withMessage("orderStatus most be REPAIRED or PENDING."),
    ],
    refurbishedProductCount: [
        (0, express_validator_1.query)("type")
            .optional()
            .exists()
            .custom(function (value) {
            return Boolean(["REFURBISHED", "ACCESSORY"].find(function (item) { return item === value; }));
        })
            .withMessage("type most be REFURBISHED or ACCESSORY."),
    ],
    totalUserCount: [
        (0, express_validator_1.query)("role")
            .optional()
            .exists()
            .custom(function (value) {
            return Boolean(["USER", "MANAGER", "ADMIN", "TECHNICIAN"].find(function (item) { return item === value; }));
        })
            .withMessage("type most be USER or MANAGER or ADMIN or TECHNICIAN."),
    ],
};
exports.default = DashboardController;
