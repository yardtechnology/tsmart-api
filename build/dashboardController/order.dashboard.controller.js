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
var OrderDashboardController = /** @class */ (function () {
    function OrderDashboardController() {
    }
    OrderDashboardController.prototype.card = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var orderCard, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, order_model_1.OrderModel.aggregate([
                                {
                                    $match: {
                                        $expr: {
                                            $or: [
                                                {
                                                    $eq: ["$type", "ACCESSORY"],
                                                },
                                                {
                                                    $eq: ["$type", "REFURBISH"],
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    $group: {
                                        _id: null,
                                        totalRefurbish: {
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
                                        totalAccessory: {
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
                                        deliveredRefurbish: {
                                            $sum: {
                                                $cond: [
                                                    {
                                                        $and: [
                                                            {
                                                                $eq: ["$type", "REFURBISH"],
                                                            },
                                                            {
                                                                $eq: ["$status", "COMPLETED"],
                                                            },
                                                        ],
                                                    },
                                                    1,
                                                    0,
                                                ],
                                            },
                                        },
                                        deliveredAccessory: {
                                            $sum: {
                                                $cond: [
                                                    {
                                                        $and: [
                                                            {
                                                                $eq: ["$status", "COMPLETED"],
                                                            },
                                                            {
                                                                $eq: ["$type", "ACCESSORY"],
                                                            },
                                                        ],
                                                    },
                                                    1,
                                                    0,
                                                ],
                                            },
                                        },
                                    },
                                },
                            ])];
                    case 1:
                        orderCard = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Call out list successfully.",
                            data: orderCard === null || orderCard === void 0 ? void 0 : orderCard[0],
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
    OrderDashboardController.prototype.lastOneYearData = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var currentDateRoot, mS, lastOneYearOrder, error_2;
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
                                            $or: [
                                                {
                                                    type: "ACCESSORY",
                                                },
                                                {
                                                    type: "REFURBISH",
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
                                    $addFields: {
                                        monthNumber: {
                                            $month: "$createdAt",
                                        },
                                    },
                                },
                                {
                                    $project: {
                                        monthNumber: 1,
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
                        lastOneYearOrder = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Monthly order count successfully.",
                            data: lastOneYearOrder,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderDashboardController.prototype.deliveryOrder = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var deliveryOrder, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, order_model_1.OrderModel.aggregate([
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    $in: ["$type", ["ACCESSORY", "REFURBISH"]],
                                                },
                                                {
                                                    $eq: ["$status", "DELIVERED"],
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    $group: {
                                        _id: "$type",
                                        count: { $sum: 1 },
                                    },
                                },
                            ])];
                    case 1:
                        deliveryOrder = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Total delivered order count successfully.",
                            data: deliveryOrder,
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
    return OrderDashboardController;
}());
exports.default = OrderDashboardController;
