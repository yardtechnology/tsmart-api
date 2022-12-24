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
var store_model_1 = require("../models/store.model");
// import { nextTick } from "process";/
var user_model_1 = require("../models/user.model");
var StoreDashboardController = /** @class */ (function () {
    function StoreDashboardController() {
    }
    StoreDashboardController.prototype.monthlyStatus = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var month, currentDateHigh, storeMonthlyJoin, managerData, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        month = new Date().getMonth();
                        currentDateHigh = new Date(new Date().getFullYear(), month + 1, 0, 23, 59, 59);
                        return [4 /*yield*/, store_model_1.StoreModel.aggregate([
                                {
                                    $addFields: {
                                        startDay: new Date(currentDateHigh),
                                        endDay: {
                                            $dateSubtract: {
                                                startDate: new Date(currentDateHigh),
                                                unit: "month",
                                                amount: 12,
                                            },
                                        },
                                    },
                                },
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    $gte: ["$startDay", "$createdAt"],
                                                },
                                                {
                                                    $lte: ["$endDay", "$createdAt"],
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    $group: {
                                        _id: {
                                            $month: "$createdAt",
                                        },
                                        count: { $sum: 1 },
                                    },
                                },
                                {
                                    $project: {
                                        monthNumber: "$_id",
                                        count: 1,
                                        _id: 0,
                                    },
                                },
                                {
                                    $group: {
                                        _id: null,
                                        stores: { $push: "$$ROOT" },
                                    },
                                },
                                {
                                    $addFields: {
                                        monthsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                    },
                                },
                                {
                                    $project: {
                                        _id: 0,
                                        count: 1,
                                        store: {
                                            $map: {
                                                input: "$monthsArray",
                                                as: "monthNumber",
                                                in: {
                                                    $cond: [
                                                        {
                                                            $gte: [
                                                                {
                                                                    $size: {
                                                                        $filter: {
                                                                            input: "$stores",
                                                                            as: "store",
                                                                            cond: {
                                                                                $eq: ["$$store.monthNumber", "$$monthNumber"],
                                                                            },
                                                                        },
                                                                    },
                                                                },
                                                                1,
                                                            ],
                                                        },
                                                        {
                                                            $arrayElemAt: [
                                                                {
                                                                    $map: {
                                                                        input: {
                                                                            $filter: {
                                                                                input: "$stores",
                                                                                as: "store",
                                                                                cond: {
                                                                                    $eq: ["$$store.monthNumber", "$$monthNumber"],
                                                                                },
                                                                            },
                                                                        },
                                                                        as: "storeData",
                                                                        in: { $trunc: "$$storeData.count" },
                                                                    },
                                                                },
                                                                0,
                                                            ],
                                                        },
                                                        0,
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                                // MANAGER COUNT
                                {
                                    $lookup: {
                                        from: "users",
                                        as: "users",
                                        pipeline: [
                                            // MANAGER PIPELINE
                                            {
                                                $match: {
                                                    role: "MANAGER",
                                                },
                                            },
                                            {
                                                $addFields: {
                                                    startDay: new Date(currentDateHigh),
                                                    endDay: {
                                                        $dateSubtract: {
                                                            startDate: new Date(currentDateHigh),
                                                            unit: "month",
                                                            amount: 12,
                                                        },
                                                    },
                                                },
                                            },
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $gte: ["$startDay", "$createdAt"],
                                                            },
                                                            {
                                                                $lte: ["$endDay", "$createdAt"],
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                            //
                                            {
                                                $group: {
                                                    _id: {
                                                        $month: "$createdAt",
                                                    },
                                                    count: { $sum: 1 },
                                                },
                                            },
                                            {
                                                $project: {
                                                    monthNumber: "$_id",
                                                    count: 1,
                                                    _id: 0,
                                                },
                                            },
                                            {
                                                $group: {
                                                    _id: null,
                                                    managers: { $push: "$$ROOT" },
                                                },
                                            },
                                            {
                                                $addFields: {
                                                    monthsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                                },
                                            },
                                            {
                                                $project: {
                                                    _id: 0,
                                                    count: 1,
                                                    manager: {
                                                        $map: {
                                                            input: "$monthsArray",
                                                            as: "monthNumber",
                                                            in: {
                                                                $cond: [
                                                                    {
                                                                        $gte: [
                                                                            {
                                                                                $size: {
                                                                                    $filter: {
                                                                                        input: "$managers",
                                                                                        as: "manager",
                                                                                        cond: {
                                                                                            $eq: [
                                                                                                "$$manager.monthNumber",
                                                                                                "$$monthNumber",
                                                                                            ],
                                                                                        },
                                                                                    },
                                                                                },
                                                                            },
                                                                            1,
                                                                        ],
                                                                    },
                                                                    {
                                                                        $arrayElemAt: [
                                                                            {
                                                                                $map: {
                                                                                    input: {
                                                                                        $filter: {
                                                                                            input: "$managers",
                                                                                            as: "manager",
                                                                                            cond: {
                                                                                                $eq: [
                                                                                                    "$$manager.monthNumber",
                                                                                                    "$$monthNumber",
                                                                                                ],
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    as: "managerData",
                                                                                    in: { $trunc: "$$managerData.count" },
                                                                                },
                                                                            },
                                                                            0,
                                                                        ],
                                                                    },
                                                                    0,
                                                                ],
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                            //   MANAGER PIPELINE END
                                        ],
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$users",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $project: {
                                        store: 1,
                                        manager: "$users.manager",
                                    },
                                },
                            ])];
                    case 1:
                        storeMonthlyJoin = _b.sent();
                        if (!(storeMonthlyJoin === null || storeMonthlyJoin === void 0 ? void 0 : storeMonthlyJoin.length)) return [3 /*break*/, 2];
                        _a = storeMonthlyJoin;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, user_model_1.UserModel.aggregate([
                            {
                                $match: {
                                    role: "MANAGER",
                                },
                            },
                            {
                                $addFields: {
                                    startDay: new Date(currentDateHigh),
                                    endDay: {
                                        $dateSubtract: {
                                            startDate: new Date(currentDateHigh),
                                            unit: "month",
                                            amount: 12,
                                        },
                                    },
                                },
                            },
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $gte: ["$startDay", "$createdAt"],
                                            },
                                            {
                                                $lte: ["$endDay", "$createdAt"],
                                            },
                                        ],
                                    },
                                },
                            },
                            //
                            {
                                $group: {
                                    _id: {
                                        $month: "$createdAt",
                                    },
                                    count: { $sum: 1 },
                                },
                            },
                            {
                                $project: {
                                    monthNumber: "$_id",
                                    count: 1,
                                    _id: 0,
                                },
                            },
                            {
                                $group: {
                                    _id: null,
                                    managers: { $push: "$$ROOT" },
                                },
                            },
                            {
                                $addFields: {
                                    monthsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                },
                            },
                            {
                                $project: {
                                    _id: 0,
                                    count: 1,
                                    manager: {
                                        $map: {
                                            input: "$monthsArray",
                                            as: "monthNumber",
                                            in: {
                                                $cond: [
                                                    {
                                                        $gte: [
                                                            {
                                                                $size: {
                                                                    $filter: {
                                                                        input: "$managers",
                                                                        as: "manager",
                                                                        cond: {
                                                                            $eq: [
                                                                                "$$manager.monthNumber",
                                                                                "$$monthNumber",
                                                                            ],
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                            1,
                                                        ],
                                                    },
                                                    {
                                                        $arrayElemAt: [
                                                            {
                                                                $map: {
                                                                    input: {
                                                                        $filter: {
                                                                            input: "$managers",
                                                                            as: "manager",
                                                                            cond: {
                                                                                $eq: [
                                                                                    "$$manager.monthNumber",
                                                                                    "$$monthNumber",
                                                                                ],
                                                                            },
                                                                        },
                                                                    },
                                                                    as: "managerData",
                                                                    in: { $trunc: "$$managerData.count" },
                                                                },
                                                            },
                                                            0,
                                                        ],
                                                    },
                                                    0,
                                                ],
                                            },
                                        },
                                    },
                                },
                            },
                        ])];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        managerData = _a;
                        res.json({
                            status: "SUCCESS",
                            message: "Store data get successfully.",
                            data: managerData,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    StoreDashboardController.prototype.totalStore = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var totalStore, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, store_model_1.StoreModel.find().count()];
                    case 1:
                        totalStore = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Store count get successfully.",
                            data: totalStore,
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
    StoreDashboardController.prototype.totalManager = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var totalManager, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserModel.find({
                                role: "MANAGER",
                            }).count()];
                    case 1:
                        totalManager = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Manager count get successfully.",
                            data: totalManager,
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
    StoreDashboardController.prototype.assignManager = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userList, totalManager, assignManager, percentageOfAssignUser, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserModel.aggregate([
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$role", "MANAGER"],
                                        },
                                    },
                                },
                                {
                                    $group: {
                                        _id: { $cond: [{ $ifNull: ["$store", false] }, true, false] },
                                        email: { $first: "$email" },
                                        count: { $sum: 1 },
                                    },
                                },
                            ])];
                    case 1:
                        userList = _a.sent();
                        totalManager = userList === null || userList === void 0 ? void 0 : userList.reduce(function (acc, element) {
                            acc = acc + element.count;
                            return acc;
                        }, 0);
                        assignManager = userList === null || userList === void 0 ? void 0 : userList.find(function (item) { return item === null || item === void 0 ? void 0 : item._id; });
                        percentageOfAssignUser = (((assignManager === null || assignManager === void 0 ? void 0 : assignManager.count) || 0) * 100) / totalManager;
                        res.json({
                            status: "SUCCESS",
                            message: "Manager assign data get successfully",
                            data: { totalManager: totalManager, percentageOfAssignUser: percentageOfAssignUser },
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
    return StoreDashboardController;
}());
exports.default = StoreDashboardController;
