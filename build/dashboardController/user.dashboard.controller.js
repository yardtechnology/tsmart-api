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
exports.userDashboardValidation = void 0;
var express_validator_1 = require("express-validator");
var user_model_1 = require("../models/user.model");
var UserDashboardController = /** @class */ (function () {
    function UserDashboardController() {
    }
    UserDashboardController.prototype.userLastWeeklyJoin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var currentDateRoot, currentDateHigh, getUserData, weekArray_1, dataStructure, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        currentDateRoot = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                        currentDateHigh = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59);
                        return [4 /*yield*/, user_model_1.UserModel.aggregate([
                                {
                                    $addFields: {
                                        startDay: new Date(currentDateHigh),
                                        endDay: {
                                            $dateSubtract: {
                                                startDate: new Date(currentDateRoot),
                                                unit: "day",
                                                amount: 7,
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
                                    $addFields: {
                                        dayNumber: {
                                            $dayOfWeek: "$createdAt",
                                        },
                                    },
                                },
                                {
                                    $sort: {
                                        dayNumber: 1,
                                    },
                                },
                                {
                                    $group: {
                                        _id: { date: "$dayNumber", role: "$role" },
                                        count: { $sum: 1 },
                                    },
                                },
                                {
                                    $group: {
                                        _id: "$_id.role",
                                        dataArray: {
                                            $push: {
                                                count: "$count",
                                                dayNumber: "$_id.date",
                                            },
                                        },
                                    },
                                },
                                {
                                    $project: {
                                        name: "$_id",
                                        data: "$dataArray",
                                    },
                                },
                            ])];
                    case 1:
                        getUserData = _a.sent();
                        weekArray_1 = [1, 2, 3, 4, 5, 6, 7];
                        dataStructure = getUserData === null || getUserData === void 0 ? void 0 : getUserData.map(function (dataItem) {
                            return {
                                name: dataItem.name,
                                data: weekArray_1.map(function (item) {
                                    var _a, _b;
                                    return ((_b = (_a = dataItem === null || dataItem === void 0 ? void 0 : dataItem.data) === null || _a === void 0 ? void 0 : _a.find(function (item2) { return (item2 === null || item2 === void 0 ? void 0 : item2.dayNumber) === item; })) === null || _b === void 0 ? void 0 : _b.count) || 0;
                                }),
                            };
                        });
                        res.json({
                            status: "SUCCESS",
                            message: "User data get successfully.",
                            data: dataStructure,
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
    UserDashboardController.prototype.userTechnicianCount = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var getAllTechnician, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserModel.aggregate([
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    $eq: ["$role", "TECHNICIAN"],
                                                },
                                                {
                                                    $in: ["$status", ["VERIFIED", "PENDING"]],
                                                },
                                            ],
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
                                    $project: {
                                        _id: 0,
                                        status: "$_id",
                                        count: 1,
                                    },
                                },
                            ])];
                    case 1:
                        getAllTechnician = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Technician count successfully.",
                            data: getAllTechnician,
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
    UserDashboardController.prototype.customerCount = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var customerCount, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserModel.aggregate([
                                {
                                    $match: {
                                        role: "USER",
                                    },
                                },
                                {
                                    $group: {
                                        _id: "$isOnline",
                                        status: {
                                            $first: {
                                                $cond: [{ $eq: ["$isOnline", true] }, "Online", "Offline"],
                                            },
                                        },
                                        count: { $sum: 1 },
                                    },
                                },
                                {
                                    $project: {
                                        status: 1,
                                        _id: 0,
                                        count: 1,
                                    },
                                },
                            ])];
                    case 1:
                        customerCount = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Customer count successfully.",
                            data: customerCount,
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
    // technician details count
    UserDashboardController.prototype.technician = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var technicianId;
            return __generator(this, function (_a) {
                try {
                    technicianId = req.params.technicianId;
                    res.json({
                        status: "SUCCESS",
                        message: "Customer count successfully.",
                        data: {
                            completeJob: 1,
                            todayJobs: 1,
                            totalSale: 100,
                            ratings: 1,
                        },
                    });
                }
                catch (error) {
                    next(error);
                }
                return [2 /*return*/];
            });
        });
    };
    return UserDashboardController;
}());
exports.userDashboardValidation = {
    technician: [
        (0, express_validator_1.param)("technicianId")
            .not()
            .isEmpty()
            .withMessage("technicianId is required.")
            .isMongoId()
            .withMessage("technicianId must be mongoes id"),
    ],
};
exports.default = UserDashboardController;
