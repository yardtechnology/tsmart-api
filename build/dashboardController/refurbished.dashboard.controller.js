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
var order_model_1 = require("../models/order.model");
var product_model_1 = require("../models/product.model");
var user_model_1 = require("../models/user.model");
var RefurbishedDashboardController = /** @class */ (function () {
    function RefurbishedDashboardController() {
    }
    RefurbishedDashboardController.prototype.refurbishedByCategory = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var role, managerFilter, findUser, allProduct, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        role = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.role;
                        managerFilter = [{ $eq: ["$type", "REFURBISHED"] }];
                        if (!(role === "MANAGER")) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.findById((_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id)];
                    case 1:
                        findUser = _d.sent();
                        managerFilter.push([
                            {
                                $eq: ["$store", new mongoose_1.Types.ObjectId((_c = findUser === null || findUser === void 0 ? void 0 : findUser.store) === null || _c === void 0 ? void 0 : _c.toString())],
                            },
                        ]);
                        _d.label = 2;
                    case 2: return [4 /*yield*/, product_model_1.ProductModel.aggregate([
                            {
                                $match: {
                                    $expr: {
                                        $and: managerFilter,
                                    },
                                },
                            },
                            {
                                $group: {
                                    _id: "$category",
                                    count: { $sum: 1 },
                                },
                            },
                            {
                                $sort: {
                                    count: 1,
                                },
                            },
                            {
                                $lookup: {
                                    from: "categories",
                                    localField: "category",
                                    foreignField: "_id",
                                    as: "category",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$category",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                            {
                                $project: {
                                    category: "$category.name",
                                    count: 1,
                                },
                            },
                        ])];
                    case 3:
                        allProduct = _d.sent();
                        res.json({
                            data: allProduct,
                            status: "SUCCESS",
                            message: "Product category fetch successfully.",
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _d.sent();
                        next(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RefurbishedDashboardController.prototype.topBrands = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var allProduct, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, product_model_1.ProductModel.aggregate([
                                {
                                    $match: {
                                        type: "REFURBISHED",
                                    },
                                },
                                {
                                    $group: {
                                        _id: "$make",
                                        count: { $sum: 1 },
                                    },
                                },
                                {
                                    $sort: {
                                        count: 1,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "makes",
                                        localField: "_id",
                                        foreignField: "_id",
                                        as: "make",
                                        pipeline: [
                                            {
                                                $project: {
                                                    title: 1,
                                                    image: 1,
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$make",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                            ])];
                    case 1:
                        allProduct = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Product category fetch successfully.",
                            data: allProduct,
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
    RefurbishedDashboardController.prototype.card = function (req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var currentDateRoot, currentDateHigh, role, managerQuery, managerFilter, findUser, totalRefurbished, totalRefurbishedDatabase, totalRefurbishedAddedTodayDatabase, todayRefurbished, error_3;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 7, , 8]);
                        currentDateRoot = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                        currentDateHigh = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59);
                        role = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.role;
                        managerQuery = {};
                        managerFilter = [];
                        if (!(role === "MANAGER")) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.findById((_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id)];
                    case 1:
                        findUser = _e.sent();
                        managerQuery = { store: findUser === null || findUser === void 0 ? void 0 : findUser.store };
                        (findUser === null || findUser === void 0 ? void 0 : findUser.store) &&
                            managerFilter.push({
                                $eq: ["$store", new mongoose_1.Types.ObjectId((_c = findUser === null || findUser === void 0 ? void 0 : findUser.store) === null || _c === void 0 ? void 0 : _c.toString())],
                            });
                        _e.label = 2;
                    case 2: return [4 /*yield*/, product_model_1.ProductModel.find(__assign({ type: "REFURBISHED" }, managerQuery)).count()];
                    case 3:
                        totalRefurbished = _e.sent();
                        return [4 /*yield*/, product_model_1.ProductModel.find({
                                type: "REFURBISHED",
                            }).count()];
                    case 4:
                        totalRefurbishedDatabase = _e.sent();
                        return [4 /*yield*/, product_model_1.ProductModel.find({
                                type: "REFURBISHED",
                                $and: [
                                    { createdAt: { $gte: new Date(currentDateRoot) } },
                                    {
                                        createdAt: { $lte: new Date(currentDateHigh) },
                                    },
                                ],
                            }).count()];
                    case 5:
                        totalRefurbishedAddedTodayDatabase = _e.sent();
                        return [4 /*yield*/, product_model_1.ProductModel.aggregate([
                                {
                                    $match: {
                                        $expr: {
                                            $and: __spreadArray([
                                                {
                                                    $eq: ["$type", "REFURBISHED"],
                                                },
                                                {
                                                    $gte: ["$createdAt", new Date(currentDateRoot)],
                                                },
                                                {
                                                    $lte: ["$createdAt", new Date(currentDateHigh)],
                                                }
                                            ], managerFilter, true),
                                        },
                                    },
                                },
                                {
                                    $count: "total",
                                },
                            ])];
                    case 6:
                        todayRefurbished = _e.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Refurbished card data found successfully.",
                            data: {
                                totalRefurbished: totalRefurbished,
                                todayRefurbished: ((_d = todayRefurbished === null || todayRefurbished === void 0 ? void 0 : todayRefurbished[0]) === null || _d === void 0 ? void 0 : _d.total) || 0,
                                totalRefurbishedDatabase: totalRefurbishedDatabase,
                                totalRefurbishedAddedTodayDatabase: totalRefurbishedAddedTodayDatabase,
                            },
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        error_3 = _e.sent();
                        next(error_3);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    RefurbishedDashboardController.prototype.managerMonthly = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var currentDateRoot, mS, orderData, error_4;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        currentDateRoot = new Date(new Date().getFullYear(), new Date().getMonth());
                        mS = [
                            "",
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "June",
                            "July",
                            "Aug",
                            "Sept",
                            "Oct",
                            "Nov",
                            "Dec",
                        ];
                        return [4 /*yield*/, order_model_1.OrderModel.aggregate([
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    $eq: ["$type", "REPAIR"],
                                                },
                                                {
                                                    $eq: ["$serviceType", "IN_STOR"],
                                                },
                                            ],
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
                                {
                                    $sort: { createdAt: -1 },
                                },
                                {
                                    $addFields: {
                                        monthNumber: {
                                            $month: "$createdAt",
                                        },
                                    },
                                },
                                {
                                    $group: (_a = {
                                            _id: null
                                        },
                                        _a["".concat(mS[1])] = {
                                            $sum: { $cond: [{ $eq: ["$monthNumber", 1] }, 1, 0] },
                                        },
                                        _a["".concat(mS[2])] = {
                                            $sum: { $cond: [{ $eq: ["$monthNumber", 2] }, 1, 0] },
                                        },
                                        _a["".concat(mS[3])] = {
                                            $sum: { $cond: [{ $eq: ["$monthNumber", 3] }, 1, 0] },
                                        },
                                        _a["".concat(mS[4])] = {
                                            $sum: { $cond: [{ $eq: ["$monthNumber", 4] }, 1, 0] },
                                        },
                                        _a["".concat(mS[5])] = {
                                            $sum: { $cond: [{ $eq: ["$monthNumber", 5] }, 1, 0] },
                                        },
                                        _a["".concat(mS[6])] = {
                                            $sum: { $cond: [{ $eq: ["$monthNumber", 6] }, 1, 0] },
                                        },
                                        _a["".concat(mS[7])] = {
                                            $sum: { $cond: [{ $eq: ["$monthNumber", 7] }, 1, 0] },
                                        },
                                        _a["".concat(mS[8])] = {
                                            $sum: { $cond: [{ $eq: ["$monthNumber", 8] }, 1, 0] },
                                        },
                                        _a["".concat(mS[9])] = {
                                            $sum: { $cond: [{ $eq: ["$monthNumber", 9] }, 1, 0] },
                                        },
                                        _a["".concat(mS[10])] = {
                                            $sum: { $cond: [{ $eq: ["$monthNumber", 10] }, 1, 0] },
                                        },
                                        _a["".concat(mS[11])] = {
                                            $sum: { $cond: [{ $eq: ["$monthNumber", 11] }, 1, 0] },
                                        },
                                        _a["".concat(mS[12])] = {
                                            $sum: { $cond: [{ $eq: ["$monthNumber", 12] }, 1, 0] },
                                        },
                                        _a),
                                },
                            ])];
                    case 1:
                        orderData = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Month wise repair in store found successfully.",
                            data: orderData === null || orderData === void 0 ? void 0 : orderData[0],
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
    return RefurbishedDashboardController;
}());
exports.default = RefurbishedDashboardController;
