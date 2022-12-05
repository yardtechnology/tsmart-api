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
var BuyDashboardController = /** @class */ (function () {
    function BuyDashboardController() {
    }
    BuyDashboardController.prototype.card = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var orderDataAccordingStatus, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, order_model_1.OrderModel.aggregate([
                                {
                                    $match: {
                                        type: "BUY",
                                    },
                                },
                                {
                                    $group: {
                                        _id: "$status",
                                        count: { $sum: 1 },
                                    },
                                },
                            ])];
                    case 1:
                        orderDataAccordingStatus = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Order card data found successfully.",
                            data: orderDataAccordingStatus,
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
    BuyDashboardController.prototype.circularGraph = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var orderBuyStatus, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, order_model_1.OrderModel.aggregate([
                                {
                                    $match: {
                                        type: "SELL",
                                    },
                                },
                                {
                                    $group: {
                                        _id: null,
                                        initiatedCount: {
                                            $sum: {
                                                $cond: [
                                                    {
                                                        $eq: ["$status", "INITIATED"],
                                                    },
                                                    1,
                                                    0,
                                                ],
                                            },
                                        },
                                        receivedCount: {
                                            $sum: {
                                                $cond: [
                                                    {
                                                        $eq: ["$status", "RECEIVED"],
                                                    },
                                                    1,
                                                    0,
                                                ],
                                            },
                                        },
                                        completeCount: {
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
                                        cancelCount: {
                                            $sum: {
                                                $cond: [
                                                    {
                                                        $eq: ["$status", "CANCELLED"],
                                                    },
                                                    1,
                                                    0,
                                                ],
                                            },
                                        },
                                        total: { $sum: 1 },
                                    },
                                },
                                {
                                    $project: {
                                        initiatedPercent: {
                                            $divide: [{ $multiply: ["$initiatedCount", 100] }, "$total"],
                                        },
                                        receivedPercent: {
                                            $divide: [{ $multiply: ["$receivedCount", 100] }, "$total"],
                                        },
                                        completePercent: {
                                            $divide: [{ $multiply: ["$completeCount", 100] }, "$total"],
                                        },
                                        cancelPercent: {
                                            $divide: [{ $multiply: ["$cancelCount", 100] }, "$total"],
                                        },
                                        total: 1,
                                        initiatedCount: 1,
                                        receivedCount: 1,
                                        completeCount: 1,
                                        cancelCount: 1,
                                    },
                                },
                            ])];
                    case 1:
                        orderBuyStatus = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Order card data found successfully.",
                            data: orderBuyStatus === null || orderBuyStatus === void 0 ? void 0 : orderBuyStatus[0],
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
    return BuyDashboardController;
}());
exports.default = BuyDashboardController;
