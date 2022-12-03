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
Object.defineProperty(exports, "__esModule", { value: true });
var order_model_1 = require("../models/order.model");
var product_model_1 = require("../models/product.model");
var RefurbishedDashboardController = /** @class */ (function () {
    function RefurbishedDashboardController() {
    }
    RefurbishedDashboardController.prototype.refurbishedByCategory = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var allProduct, error_1;
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
                    case 1:
                        allProduct = _a.sent();
                        res.json({
                            data: allProduct,
                            status: "SUCCESS",
                            message: "Product category fetch successfully.",
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
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
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var currentYearLowDate, currentYearHighDate, totalRefurbished, todayRefurbished, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        currentYearLowDate = new Date(new Date().getFullYear(), 0);
                        currentYearHighDate = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);
                        return [4 /*yield*/, product_model_1.ProductModel.find({
                                type: "REFURBISHED",
                            }).count()];
                    case 1:
                        totalRefurbished = _b.sent();
                        return [4 /*yield*/, product_model_1.ProductModel.aggregate([
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    $eq: ["$type", "REFURBISHED"],
                                                },
                                                {
                                                    $gte: ["$createdAt", new Date(currentYearLowDate)],
                                                },
                                                {
                                                    $lte: ["$createdAt", new Date(currentYearHighDate)],
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    $count: "total",
                                },
                            ])];
                    case 2:
                        todayRefurbished = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Refurbished card data found successfully.",
                            data: {
                                totalRefurbished: totalRefurbished,
                                todayRefurbished: ((_a = todayRefurbished === null || todayRefurbished === void 0 ? void 0 : todayRefurbished[0]) === null || _a === void 0 ? void 0 : _a.total) || 0,
                            },
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _b.sent();
                        next(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
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
