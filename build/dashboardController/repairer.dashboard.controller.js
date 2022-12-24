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
var user_model_1 = require("../models/user.model");
var RepairerDashboardController = /** @class */ (function () {
    function RepairerDashboardController() {
    }
    RepairerDashboardController.prototype.repairerStatus = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var role, managerFilter, findUser, totalRepairerStatus, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        role = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.role;
                        managerFilter = [{ $ifNull: ["$serviceType", false] }];
                        if (!(role === "MANAGER")) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.findById((_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id)];
                    case 1:
                        findUser = _d.sent();
                        managerFilter.push({
                            $eq: ["$store", new mongoose_1.Types.ObjectId((_c = findUser === null || findUser === void 0 ? void 0 : findUser.store) === null || _c === void 0 ? void 0 : _c.toString())],
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
                    case 3:
                        totalRepairerStatus = _d.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Repairer status data get successfully",
                            data: totalRepairerStatus === null || totalRepairerStatus === void 0 ? void 0 : totalRepairerStatus[0],
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
    RepairerDashboardController.prototype.lastSevenYearData = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var currentYearLowDate, currentYearHighDate, lastSevenYear, role, managerFilter, findUser, lastSevenYearData, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        currentYearLowDate = new Date(new Date().getFullYear(), 0);
                        currentYearHighDate = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);
                        lastSevenYear = [0, 1, 2, 3, 4, 5, 6];
                        role = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.role;
                        managerFilter = [];
                        if (!(role === "MANAGER")) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.findById((_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id)];
                    case 1:
                        findUser = _d.sent();
                        managerFilter.push([
                            {
                                $match: {
                                    store: new mongoose_1.Types.ObjectId((_c = findUser === null || findUser === void 0 ? void 0 : findUser.store) === null || _c === void 0 ? void 0 : _c.toString()),
                                },
                            },
                        ]);
                        _d.label = 2;
                    case 2: return [4 /*yield*/, order_model_1.OrderModel.aggregate(__spreadArray(__spreadArray([], managerFilter, true), [
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
                        ], false))];
                    case 3:
                        lastSevenYearData = _d.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Repairer status data get successfully",
                            data: lastSevenYearData,
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
    RepairerDashboardController.prototype.card = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var role, managerQuery, findUser, inStoreRepairer, mailInRepairer, callOutRepairer, completeRepairer, onGoingRepairer, cancelRepairer, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 9, , 10]);
                        role = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.role;
                        managerQuery = {};
                        if (!(role === "MANAGER")) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.findById((_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id)];
                    case 1:
                        findUser = _c.sent();
                        managerQuery = { store: findUser === null || findUser === void 0 ? void 0 : findUser.store };
                        _c.label = 2;
                    case 2: return [4 /*yield*/, order_model_1.OrderModel.find(__assign({ serviceType: "IN_STOR" }, managerQuery)).count()];
                    case 3:
                        inStoreRepairer = _c.sent();
                        return [4 /*yield*/, order_model_1.OrderModel.find(__assign({ serviceType: "MAIL_IN" }, managerQuery)).count()];
                    case 4:
                        mailInRepairer = _c.sent();
                        return [4 /*yield*/, order_model_1.OrderModel.find(__assign({ serviceType: "CALL_OUT" }, managerQuery)).count()];
                    case 5:
                        callOutRepairer = _c.sent();
                        return [4 /*yield*/, order_model_1.OrderModel.find(__assign({ serviceType: { $exists: true }, status: "COMPLETED" }, managerQuery)).count()];
                    case 6:
                        completeRepairer = _c.sent();
                        return [4 /*yield*/, order_model_1.OrderModel.find(__assign({ serviceType: { $exists: true }, status: { $nin: ["COMPLETED", "CANCELLED"] } }, managerQuery)).count()];
                    case 7:
                        onGoingRepairer = _c.sent();
                        return [4 /*yield*/, order_model_1.OrderModel.find(__assign({ serviceType: { $exists: true }, status: "CANCELLED" }, managerQuery)).count()];
                    case 8:
                        cancelRepairer = _c.sent();
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
                        return [3 /*break*/, 10];
                    case 9:
                        error_3 = _c.sent();
                        next(error_3);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return RepairerDashboardController;
}());
exports.default = RepairerDashboardController;
