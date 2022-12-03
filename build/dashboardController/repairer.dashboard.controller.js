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
var RepairerDashboardController = /** @class */ (function () {
    function RepairerDashboardController() {
    }
    RepairerDashboardController.prototype.repairerStatus = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var totalRepairerStatus, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, order_model_1.OrderModel.aggregate([
                                {
                                    $match: {
                                        $expr: {
                                            $ifNull: ["$serviceType", false],
                                        },
                                    },
                                },
                                {
                                    $group: {
                                        _id: "$status",
                                        count: { $sum: 1 },
                                    },
                                },
                                {
                                    $group: {
                                        _id: null,
                                        totalStatusData: { $push: "$$ROOT" },
                                    },
                                },
                                {
                                    $project: {
                                        totalStatusData: 1,
                                        totalCount: {
                                            $reduce: {
                                                input: "$totalStatusData",
                                                initialValue: 0,
                                                in: { $add: ["$$value", "$$this.count"] },
                                            },
                                        },
                                    },
                                },
                                {
                                    $project: {
                                        _id: 0,
                                        totalCount: 1,
                                        totalStatusData: {
                                            $map: {
                                                input: "$totalStatusData",
                                                as: "singleStatus",
                                                in: {
                                                    name: "$$singleStatus._id",
                                                    count: "$$singleStatus.count",
                                                    percentage: {
                                                        $divide: [
                                                            {
                                                                $multiply: ["$$singleStatus.count", 100],
                                                            },
                                                            "$totalCount",
                                                        ],
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            ])];
                    case 1:
                        totalRepairerStatus = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Repairer status data get successfully",
                            data: totalRepairerStatus === null || totalRepairerStatus === void 0 ? void 0 : totalRepairerStatus[0],
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
    RepairerDashboardController.prototype.lastSevenYearData = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var currentYearLowDate, currentYearHighDate, lastSevenYear, lastSevenYearData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        currentYearLowDate = new Date(new Date().getFullYear(), 0);
                        currentYearHighDate = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);
                        lastSevenYear = [0, 1, 2, 3, 4, 5, 6];
                        return [4 /*yield*/, order_model_1.OrderModel.aggregate([
                                {
                                    $group: {
                                        _id: null,
                                    },
                                },
                                {
                                    $addFields: {
                                        lastSevenYear: {
                                            $map: {
                                                input: lastSevenYear,
                                                as: "singleYear",
                                                in: {
                                                    startDate: {
                                                        $dateSubtract: {
                                                            startDate: new Date(currentYearLowDate),
                                                            unit: "year",
                                                            amount: "$$singleYear",
                                                        },
                                                    },
                                                    endDate: {
                                                        $dateSubtract: {
                                                            startDate: new Date(currentYearHighDate),
                                                            unit: "year",
                                                            amount: "$$singleYear",
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$lastSevenYear",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $project: {
                                        _id: 0,
                                        startDate: "$lastSevenYear.startDate",
                                        endDate: "$lastSevenYear.endDate",
                                        year: { $year: "$lastSevenYear.startDate" },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "orders",
                                        as: "orders",
                                        let: {
                                            startDate: "$startDate",
                                            endDate: "$endDate",
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $ifNull: ["$serviceType", false],
                                                            },
                                                            {
                                                                $gte: ["$createdAt", "$$startDate"],
                                                            },
                                                            {
                                                                $lte: ["$createdAt", "$$endDate"],
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                            {
                                                $group: {
                                                    _id: "$serviceType",
                                                    count: { $sum: 1 },
                                                },
                                            },
                                            {
                                                $project: {
                                                    name: "$_id",
                                                    count: 1,
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $project: {},
                                },
                            ])];
                    case 1:
                        lastSevenYearData = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Repairer status data get successfully",
                            data: lastSevenYearData,
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
    RepairerDashboardController.prototype.card = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var inStoreRepairer, mailInRepairer, callOutRepairer, completeRepairer, onGoingRepairer, cancelRepairer, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, order_model_1.OrderModel.find({
                                serviceType: "IN_STOR",
                            }).count()];
                    case 1:
                        inStoreRepairer = _a.sent();
                        return [4 /*yield*/, order_model_1.OrderModel.find({
                                serviceType: "MAIL_IN",
                            }).count()];
                    case 2:
                        mailInRepairer = _a.sent();
                        return [4 /*yield*/, order_model_1.OrderModel.find({
                                serviceType: "CALL_OUT",
                            }).count()];
                    case 3:
                        callOutRepairer = _a.sent();
                        return [4 /*yield*/, order_model_1.OrderModel.find({
                                serviceType: { $exists: true },
                                status: "COMPLETED",
                            }).count()];
                    case 4:
                        completeRepairer = _a.sent();
                        return [4 /*yield*/, order_model_1.OrderModel.find({
                                serviceType: { $exists: true },
                                status: { $nin: ["COMPLETED", "CANCELLED"] },
                            }).count()];
                    case 5:
                        onGoingRepairer = _a.sent();
                        return [4 /*yield*/, order_model_1.OrderModel.find({
                                serviceType: { $exists: true },
                                status: "CANCELLED",
                            }).count()];
                    case 6:
                        cancelRepairer = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Repairer status data get successfully",
                            data: {
                                inStoreRepairer: inStoreRepairer,
                                mailInRepairer: mailInRepairer,
                                callOutRepairer: callOutRepairer,
                                completeRepairer: completeRepairer,
                                onGoingRepairer: onGoingRepairer,
                                cancelRepairer: cancelRepairer,
                            },
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return RepairerDashboardController;
}());
exports.default = RepairerDashboardController;
