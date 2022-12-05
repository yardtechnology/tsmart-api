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
var mongoose_1 = require("mongoose");
var helper_1 = require("../helper");
var models_1 = require("../models");
var order_model_1 = require("../models/order.model");
var product_model_1 = require("../models/product.model");
var user_model_1 = require("../models/user.model");
var DashboardDashboardController = /** @class */ (function () {
    function DashboardDashboardController() {
    }
    DashboardDashboardController.prototype.card = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var role, managerFilter, findUser, orderCount, userCount, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, , 6]);
                        role = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.role;
                        managerFilter = [];
                        if (!(role === "MANAGER")) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.findById((_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id)];
                    case 1:
                        findUser = _d.sent();
                        managerFilter = [
                            {
                                $match: {
                                    storeID: new mongoose_1.Types.ObjectId((_c = findUser === null || findUser === void 0 ? void 0 : findUser.store) === null || _c === void 0 ? void 0 : _c.toString()),
                                },
                            },
                        ];
                        _d.label = 2;
                    case 2: return [4 /*yield*/, order_model_1.OrderModel.aggregate(__spreadArray(__spreadArray([], managerFilter, true), [
                            {
                                $group: {
                                    _id: null,
                                    repairs: {
                                        $sum: {
                                            $cond: [
                                                {
                                                    $eq: ["$type", "REPAIR"],
                                                },
                                                1,
                                                0,
                                            ],
                                        },
                                    },
                                    refurbished: {
                                        $sum: {
                                            $cond: [
                                                {
                                                    $eq: ["$type", "REFURBISH"],
                                                },
                                                1,
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
                                                1,
                                                0,
                                            ],
                                        },
                                    },
                                    brought: {
                                        $sum: {
                                            $cond: [
                                                {
                                                    $eq: ["$type", "SELL"],
                                                },
                                                1,
                                                0,
                                            ],
                                        },
                                    },
                                    totalRevenue: { $sum: "$price" },
                                    totalCompleteOrder: {
                                        $sum: {
                                            $cond: [
                                                {
                                                    $eq: ["$status", "COMPLETED"],
                                                },
                                                1,
                                                0,
                                            ],
                                        },
                                    },
                                },
                            },
                        ], false))];
                    case 3:
                        orderCount = _d.sent();
                        return [4 /*yield*/, user_model_1.UserModel.aggregate([
                                {
                                    $match: {
                                        $expr: {
                                            $in: ["$role", ["USER", "TECHNICIAN"]],
                                        },
                                    },
                                },
                                {
                                    $group: {
                                        _id: null,
                                        customerCount: {
                                            $sum: {
                                                $cond: [
                                                    {
                                                        $eq: ["$role", "USER"],
                                                    },
                                                    1,
                                                    0,
                                                ],
                                            },
                                        },
                                        technicianCount: {
                                            $sum: {
                                                $cond: [
                                                    {
                                                        $eq: ["$role", "TECHNICIAN"],
                                                    },
                                                    1,
                                                    0,
                                                ],
                                            },
                                        },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "stores",
                                        as: "storeCount",
                                        pipeline: [{ $project: { _id: 1 } }],
                                    },
                                },
                                {
                                    $addFields: {
                                        storeCount: { $size: "$storeCount" },
                                    },
                                },
                            ])];
                    case 4:
                        userCount = _d.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Order card count box get successfully.",
                            data: __assign(__assign({}, orderCount === null || orderCount === void 0 ? void 0 : orderCount[0]), userCount === null || userCount === void 0 ? void 0 : userCount[0]),
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _d.sent();
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DashboardDashboardController.prototype.topTechnician = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var topTechnician, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, helper_1.paginationHelper)({
                                model: user_model_1.UserModel,
                                query: { role: "TECHNICIAN" },
                                limit: req.query.limit,
                                chunk: req.query.chunk,
                                sort: { "reviews.stars": -1 },
                            })];
                    case 1:
                        topTechnician = _a.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Top Technician get successfully",
                            data: topTechnician,
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
    DashboardDashboardController.prototype.stock = function (req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var role, managerFilter, productStuck, findUser, productCount, error_3;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 4, , 5]);
                        role = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.role;
                        managerFilter = [];
                        productStuck = [];
                        if (!(role === "MANAGER")) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.findById((_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id)];
                    case 1:
                        findUser = _e.sent();
                        managerFilter = [
                            {
                                store: new mongoose_1.Types.ObjectId((_c = findUser === null || findUser === void 0 ? void 0 : findUser.store) === null || _c === void 0 ? void 0 : _c.toString()),
                            },
                        ];
                        productStuck = [
                            {
                                $match: { store: new mongoose_1.Types.ObjectId((_d = findUser === null || findUser === void 0 ? void 0 : findUser.store) === null || _d === void 0 ? void 0 : _d.toString()) },
                            },
                        ];
                        _e.label = 2;
                    case 2:
                        !(productStuck === null || productStuck === void 0 ? void 0 : productStuck.length) &&
                            productStuck.push({
                                $project: {
                                    product: 1,
                                    stock: 1,
                                    store: 1,
                                },
                            });
                        return [4 /*yield*/, product_model_1.ProductModel.aggregate(__spreadArray(__spreadArray([], managerFilter, true), [
                                {
                                    $lookup: {
                                        from: "productstocks",
                                        localField: "_id",
                                        foreignField: "product",
                                        as: "storeStock",
                                        pipeline: productStuck,
                                    },
                                },
                                {
                                    $addFields: {
                                        storeStock: {
                                            $cond: [
                                                {
                                                    $gte: [{ $size: "$storeStock" }, 1],
                                                },
                                                {
                                                    $reduce: {
                                                        input: "$storeStock",
                                                        initialValue: 0,
                                                        in: {
                                                            $add: ["$$value", "$$this.stock"],
                                                        },
                                                    },
                                                },
                                                0,
                                            ],
                                        },
                                    },
                                },
                                {
                                    $addFields: {
                                        stock: { $add: ["$stock", "$storeStock"] },
                                    },
                                },
                                {
                                    $group: {
                                        _id: null,
                                        refurbishedCount: {
                                            $sum: {
                                                $cond: [
                                                    {
                                                        $eq: ["$type", "REFURBISHED"],
                                                    },
                                                    "$stock",
                                                    0,
                                                ],
                                            },
                                        },
                                        accessoryCount: {
                                            $sum: {
                                                $cond: [
                                                    {
                                                        $eq: ["$type", "ACCESSORY"],
                                                    },
                                                    "$stock",
                                                    0,
                                                ],
                                            },
                                        },
                                    },
                                },
                            ], false))];
                    case 3:
                        productCount = _e.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Product count get successfully",
                            data: productCount === null || productCount === void 0 ? void 0 : productCount[0],
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _e.sent();
                        next(error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DashboardDashboardController.prototype.visitors = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var getVisitorCount, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.VisitorSchema.findOne({})];
                    case 1:
                        getVisitorCount = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Visitor data found successfully.",
                            data: getVisitorCount,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DashboardDashboardController.prototype.popularPage = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var popularPage, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, helper_1.paginationHelper)({
                                model: models_1.PopularPageSchema,
                                query: {},
                                limit: req.query.limit,
                                chunk: req.query.chunk,
                                sort: { count: -1 },
                            })];
                    case 1:
                        popularPage = _a.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Popular page get successfully",
                            data: popularPage,
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
    DashboardDashboardController.prototype.monthWiseOrder = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var currentDateRoot, role, managerFilter, findUser, orderData, error_6;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        currentDateRoot = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                        role = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.role;
                        managerFilter = [
                            {
                                $in: ["$type", ["ACCESSORY", "REFURBISH"]],
                            },
                        ];
                        if (!(role === "MANAGER")) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.findById((_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id)];
                    case 1:
                        findUser = _d.sent();
                        managerFilter.push({
                            $eq: ["$storeID", new mongoose_1.Types.ObjectId((_c = findUser === null || findUser === void 0 ? void 0 : findUser.store) === null || _c === void 0 ? void 0 : _c.toString())],
                        });
                        _d.label = 2;
                    case 2: return [4 /*yield*/, order_model_1.OrderModel.aggregate(__spreadArray(__spreadArray([], managerFilter, true), [
                            {
                                $match: {
                                    $expr: {
                                        $and: managerFilter,
                                    },
                                },
                            },
                            {
                                $addFields: {
                                    endDate: new Date(currentDateRoot),
                                    startDate: {
                                        $dateSubtract: {
                                            startDate: new Date(currentDateRoot),
                                            unit: "year",
                                            amount: 1,
                                        },
                                    },
                                },
                            },
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $gte: ["$createdAt", "$startDate"],
                                            },
                                            {
                                                $lte: ["$createdAt", "$endDate"],
                                            },
                                        ],
                                    },
                                },
                            },
                        ], false))];
                    case 3:
                        orderData = _d.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Order data found successfully.",
                            data: orderData,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_6 = _d.sent();
                        next(error_6);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DashboardDashboardController.prototype.repairReport = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var currentDateRoot, role, managerFilter, findUser, orderData, error_7;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        currentDateRoot = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                        role = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.role;
                        managerFilter = [
                            {
                                $eq: ["$type", "REPAIR"],
                            },
                        ];
                        if (!(role === "MANAGER")) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.findById((_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id)];
                    case 1:
                        findUser = _d.sent();
                        managerFilter.push({
                            $eq: ["$storeID", new mongoose_1.Types.ObjectId((_c = findUser === null || findUser === void 0 ? void 0 : findUser.store) === null || _c === void 0 ? void 0 : _c.toString())],
                        });
                        _d.label = 2;
                    case 2: return [4 /*yield*/, order_model_1.OrderModel.aggregate([
                            {
                                $match: {
                                    $expr: {
                                        $and: managerFilter,
                                    },
                                },
                            },
                            {
                                $addFields: {
                                    endDate: new Date(currentDateRoot),
                                    startDate: {
                                        $dateSubtract: {
                                            startDate: new Date(currentDateRoot),
                                            unit: "year",
                                            amount: 1,
                                        },
                                    },
                                },
                            },
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $gte: ["$createdAt", "$startDate"],
                                            },
                                            {
                                                $lte: ["$createdAt", "$endDate"],
                                            },
                                        ],
                                    },
                                },
                            },
                            { $sort: { createdAt: -1 } },
                            {
                                $addFields: {
                                    monthNumber: { $month: "$createdAt" },
                                },
                            },
                            {
                                $group: {
                                    _id: "$monthNumber",
                                    inStore: {
                                        $sum: {
                                            $cond: [
                                                {
                                                    $eq: ["$serviceType", "IN_STOR"],
                                                },
                                                1,
                                                0,
                                            ],
                                        },
                                    },
                                    mailIn: {
                                        $sum: {
                                            $cond: [
                                                {
                                                    $eq: ["$serviceType", "MAIL_IN"],
                                                },
                                                1,
                                                0,
                                            ],
                                        },
                                    },
                                    callIn: {
                                        $sum: {
                                            $cond: [
                                                {
                                                    $eq: ["$serviceType", "CALL_OUT"],
                                                },
                                                1,
                                                0,
                                            ],
                                        },
                                    },
                                },
                            },
                        ])];
                    case 3:
                        orderData = _d.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Repair graph data found successfully.",
                            data: orderData,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_7 = _d.sent();
                        next(error_7);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return DashboardDashboardController;
}());
exports.default = DashboardDashboardController;
