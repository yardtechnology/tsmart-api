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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportDashboardValidation = void 0;
var express_validator_1 = require("express-validator");
var helper_1 = require("../helper");
var order_model_1 = require("../models/order.model");
var user_model_1 = require("../models/user.model");
var ReportDashboardController = /** @class */ (function () {
    function ReportDashboardController() {
    }
    ReportDashboardController.prototype.reportCount = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, startDate, endDate, role, managerQuery, findUser, argQuery, totalUser, totalJob, totalBrought, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 6, , 7]);
                        _c = req.query, startDate = _c.startDate, endDate = _c.endDate;
                        role = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.role;
                        managerQuery = {};
                        if (!(role === "MANAGER")) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.findById((_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id)];
                    case 1:
                        findUser = _d.sent();
                        managerQuery = { storeID: findUser === null || findUser === void 0 ? void 0 : findUser.store };
                        _d.label = 2;
                    case 2:
                        argQuery = {};
                        if (startDate && endDate) {
                            argQuery["$and"] = [
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
                        return [4 /*yield*/, user_model_1.UserModel.find(argQuery).count()];
                    case 3:
                        totalUser = _d.sent();
                        return [4 /*yield*/, order_model_1.OrderModel.find(__assign(__assign({ serviceType: "CALL_OUT" }, argQuery), managerQuery)).count()];
                    case 4:
                        totalJob = _d.sent();
                        return [4 /*yield*/, order_model_1.OrderModel.find(__assign(__assign({ type: { $in: ["ACCESSORY", "REFURBISH"] } }, argQuery), managerQuery)).count()];
                    case 5:
                        totalBrought = _d.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Report count successfully.",
                            data: { totalUser: totalUser, totalBrought: totalBrought, totalJob: totalJob },
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _d.sent();
                        next(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ReportDashboardController.prototype.totalUserList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, startDate, endDate, query_1, totalUser, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, startDate = _a.startDate, endDate = _a.endDate;
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
                        return [4 /*yield*/, (0, helper_1.paginationHelper)({
                                model: user_model_1.UserModel,
                                query: query_1,
                                limit: req.query.limit,
                                chunk: req.query.chunk,
                                sort: { createdAt: -1 },
                            })];
                    case 1:
                        totalUser = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "User list get successfully.",
                            data: totalUser,
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
    ReportDashboardController.prototype.totalJob = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, startDate, endDate, query_2, totalJob, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, startDate = _a.startDate, endDate = _a.endDate;
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
                        query_2["serviceType"] = "CALL_OUT";
                        return [4 /*yield*/, (0, helper_1.paginationHelper)({
                                model: order_model_1.OrderModel,
                                query: query_2,
                                limit: req.query.limit,
                                chunk: req.query.chunk,
                                sort: { createdAt: -1 },
                            })];
                    case 1:
                        totalJob = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Total job get successfully.",
                            data: totalJob,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReportDashboardController.prototype.totalBrought = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, startDate, endDate, query_3, role, findUser, totalBrought, error_4;
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
                        query_3["type"] = { $in: ["ACCESSORY", "REFURBISH"] };
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
                        totalBrought = _d.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Total brought successfully.",
                            data: totalBrought,
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
    return ReportDashboardController;
}());
exports.ReportDashboardValidation = {
    totalUser: [
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
exports.default = ReportDashboardController;
