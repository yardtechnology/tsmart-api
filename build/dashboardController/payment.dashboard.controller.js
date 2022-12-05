"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentDashboardValidation = void 0;
var express_validator_1 = require("express-validator");
var mongoose_1 = require("mongoose");
var helper_1 = require("../helper");
var order_model_1 = require("../models/order.model");
var user_model_1 = require("../models/user.model");
var PaymentDashboardController = /** @class */ (function () {
    function PaymentDashboardController() {
    }
    PaymentDashboardController.prototype.totalRevenue = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, startDate, endDate, arrayArg, role, managerFilter, findUser, orderDataAccordingStatus, error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 4, , 5]);
                        _d = req.query, startDate = _d.startDate, endDate = _d.endDate;
                        arrayArg = [];
                        if (startDate && endDate) {
                            arrayArg.push({
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $gte: ["$createdAt", new Date(Number(startDate))],
                                            },
                                            {
                                                $lte: ["$createdAt", new Date(Number(endDate))],
                                            },
                                        ],
                                    },
                                },
                            });
                        }
                        role = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.role;
                        managerFilter = [];
                        if (!(role === "MANAGER")) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.findById((_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id)];
                    case 1:
                        findUser = _e.sent();
                        managerFilter = [
                            {
                                $match: {
                                    storeID: new mongoose_1.Types.ObjectId((_c = findUser === null || findUser === void 0 ? void 0 : findUser.store) === null || _c === void 0 ? void 0 : _c.toString()),
                                },
                            },
                        ];
                        _e.label = 2;
                    case 2: return [4 /*yield*/, order_model_1.OrderModel.aggregate(__spreadArray(__spreadArray(__spreadArray([], arrayArg, true), managerFilter, true), [
                            {
                                $group: {
                                    _id: null,
                                    total: { $sum: "$price" },
                                    refurbish: {
                                        $sum: {
                                            $cond: [
                                                {
                                                    $eq: ["$type", "REFURBISH"],
                                                },
                                                "$price",
                                                0,
                                            ],
                                        },
                                    },
                                    accessory: {
                                        $sum: {
                                            $cond: [
                                                {
                                                    $eq: ["$type", "ACCESSORY"],
                                                },
                                                "$price",
                                                0,
                                            ],
                                        },
                                    },
                                    inStore: {
                                        $sum: {
                                            $cond: [
                                                {
                                                    $eq: ["$serviceType", "IN_STOR"],
                                                },
                                                "$price",
                                                0,
                                            ],
                                        },
                                    },
                                    mailInRevenue: {
                                        $sum: {
                                            $cond: [
                                                {
                                                    $eq: ["$serviceType", "MAIL_IN"],
                                                },
                                                "$price",
                                                0,
                                            ],
                                        },
                                    },
                                    calloutRevenue: {
                                        $sum: {
                                            $cond: [
                                                {
                                                    $eq: ["$serviceType", "CALL_OUT"],
                                                },
                                                "$price",
                                                0,
                                            ],
                                        },
                                    },
                                },
                            },
                        ], false))];
                    case 3:
                        orderDataAccordingStatus = _e.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Order card data found successfully.",
                            data: orderDataAccordingStatus === null || orderDataAccordingStatus === void 0 ? void 0 : orderDataAccordingStatus[0],
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _e.sent();
                        next(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PaymentDashboardController.prototype.refurbishList = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, startDate, endDate, query_1, role, findUser, totalRefurbish, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        _c = req.query, startDate = _c.startDate, endDate = _c.endDate;
                        query_1 = {};
                        if (startDate && endDate) {
                            query_1["$and"] = [
                                {
                                    createdAt: { $gte: new Date(Number(startDate)) },
                                },
                                {
                                    createdAt: {
                                        $lte: new Date(Number(endDate)),
                                    },
                                },
                            ];
                        }
                        query_1["type"] = "REFURBISH";
                        role = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.role;
                        if (!(role === "MANAGER")) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.findById((_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id)];
                    case 1:
                        findUser = _d.sent();
                        query_1["storeID"] = findUser === null || findUser === void 0 ? void 0 : findUser.store;
                        _d.label = 2;
                    case 2: return [4 /*yield*/, (0, helper_1.paginationHelper)({
                            model: order_model_1.OrderModel,
                            query: query_1,
                            limit: req.query.limit,
                            chunk: req.query.chunk,
                            sort: { createdAt: -1 },
                        })];
                    case 3:
                        totalRefurbish = _d.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Refurbish list successfully.",
                            data: totalRefurbish,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _d.sent();
                        next(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PaymentDashboardController.prototype.accessoryList = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, startDate, endDate, query_2, role, findUser, accessoryData, error_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        _c = req.query, startDate = _c.startDate, endDate = _c.endDate;
                        query_2 = {};
                        if (startDate && endDate) {
                            query_2["$and"] = [
                                {
                                    createdAt: { $gte: new Date(Number(startDate)) },
                                },
                                {
                                    createdAt: {
                                        $lte: new Date(Number(endDate)),
                                    },
                                },
                            ];
                        }
                        query_2["type"] = "ACCESSORY";
                        role = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.role;
                        if (!(role === "MANAGER")) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.findById((_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id)];
                    case 1:
                        findUser = _d.sent();
                        query_2["storeID"] = findUser === null || findUser === void 0 ? void 0 : findUser.store;
                        _d.label = 2;
                    case 2: return [4 /*yield*/, (0, helper_1.paginationHelper)({
                            model: order_model_1.OrderModel,
                            query: query_2,
                            limit: req.query.limit,
                            chunk: req.query.chunk,
                            sort: { createdAt: -1 },
                        })];
                    case 3:
                        accessoryData = _d.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Accessory list successfully.",
                            data: accessoryData,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _d.sent();
                        next(error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PaymentDashboardController.prototype.inStoreList = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, startDate, endDate, query_3, role, findUser, inStoreData, error_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        _c = req.query, startDate = _c.startDate, endDate = _c.endDate;
                        query_3 = {};
                        if (startDate && endDate) {
                            query_3["$and"] = [
                                {
                                    createdAt: { $gte: new Date(Number(startDate)) },
                                },
                                {
                                    createdAt: {
                                        $lte: new Date(Number(endDate)),
                                    },
                                },
                            ];
                        }
                        query_3["serviceType"] = "IN_STOR";
                        role = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.role;
                        if (!(role === "MANAGER")) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.findById((_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id)];
                    case 1:
                        findUser = _d.sent();
                        query_3["storeID"] = findUser === null || findUser === void 0 ? void 0 : findUser.store;
                        _d.label = 2;
                    case 2: return [4 /*yield*/, (0, helper_1.paginationHelper)({
                            model: order_model_1.OrderModel,
                            query: query_3,
                            limit: req.query.limit,
                            chunk: req.query.chunk,
                            sort: { createdAt: -1 },
                        })];
                    case 3:
                        inStoreData = _d.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "In-Store list successfully.",
                            data: inStoreData,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _d.sent();
                        next(error_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PaymentDashboardController.prototype.mailInRevenueList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, startDate, endDate, query_4, mailInData, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, startDate = _a.startDate, endDate = _a.endDate;
                        query_4 = {};
                        if (startDate && endDate) {
                            query_4["$and"] = [
                                {
                                    createdAt: { $gte: new Date(Number(startDate)) },
                                },
                                {
                                    createdAt: {
                                        $lte: new Date(Number(endDate)),
                                    },
                                },
                            ];
                        }
                        query_4["serviceType"] = "MAIL_IN";
                        return [4 /*yield*/, (0, helper_1.paginationHelper)({
                                model: order_model_1.OrderModel,
                                query: query_4,
                                limit: req.query.limit,
                                chunk: req.query.chunk,
                                sort: { createdAt: -1 },
                            })];
                    case 1:
                        mailInData = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Mail-in list successfully.",
                            data: mailInData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _b.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PaymentDashboardController.prototype.callOutRevenue = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, startDate, endDate, query_5, callOutData, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, startDate = _a.startDate, endDate = _a.endDate;
                        query_5 = {};
                        if (startDate && endDate) {
                            query_5["$and"] = [
                                {
                                    createdAt: { $gte: new Date(Number(startDate)) },
                                },
                                {
                                    createdAt: {
                                        $lte: new Date(Number(endDate)),
                                    },
                                },
                            ];
                        }
                        query_5["serviceType"] = "CALL_OUT";
                        return [4 /*yield*/, (0, helper_1.paginationHelper)({
                                model: order_model_1.OrderModel,
                                query: query_5,
                                limit: req.query.limit,
                                chunk: req.query.chunk,
                                sort: { createdAt: -1 },
                            })];
                    case 1:
                        callOutData = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Call out list successfully.",
                            data: callOutData,
                        });
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
    return PaymentDashboardController;
}());
exports.PaymentDashboardValidation = {
    totalRevenue: [
        (0, express_validator_1.query)("startDate")
            .optional()
            .isNumeric()
            .withMessage("startDate must be a number."),
        (0, express_validator_1.query)("endDate")
            .optional()
            .isNumeric()
            .withMessage("endDate must be a number."),
    ],
};
exports.default = PaymentDashboardController;
