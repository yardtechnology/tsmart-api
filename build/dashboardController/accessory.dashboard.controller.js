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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var pagination_helper_1 = __importStar(require("../helper/pagination.helper"));
var category_model_1 = require("../models/category.model");
var product_model_1 = require("../models/product.model");
var AccessoryDashboardController = /** @class */ (function () {
    function AccessoryDashboardController() {
    }
    AccessoryDashboardController.prototype.circularGraph = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, limit, chunk, aggregationQuery, categoryAccessory, totalData_1, categoryWithPercentage, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _c = req.query, limit = _c.limit, chunk = _c.chunk;
                        aggregationQuery = [
                            {
                                $lookup: {
                                    from: "products",
                                    localField: "_id",
                                    foreignField: "category",
                                    as: "product",
                                    pipeline: [
                                        {
                                            $match: {
                                                type: "ACCESSORY",
                                            },
                                        },
                                    ],
                                },
                            },
                            {
                                $addFields: {
                                    product: { $size: "$product" },
                                },
                            },
                            {
                                $project: {
                                    name: 1,
                                    product: 1,
                                },
                            },
                            {
                                $sort: {
                                    product: -1,
                                },
                            },
                        ];
                        return [4 /*yield*/, (0, pagination_helper_1.aggregationData)({
                                model: category_model_1.CategoryModel,
                                query: aggregationQuery,
                                position: aggregationQuery.length,
                                limit: limit ? Number(limit) : undefined,
                                chunk: chunk ? Number(chunk) : undefined,
                                sort: { product: 1 },
                            })];
                    case 1:
                        categoryAccessory = _d.sent();
                        totalData_1 = (_a = categoryAccessory === null || categoryAccessory === void 0 ? void 0 : categoryAccessory.data) === null || _a === void 0 ? void 0 : _a.reduce(function (acc, item) { return (item === null || item === void 0 ? void 0 : item.product) + acc; }, 0);
                        categoryWithPercentage = (_b = categoryAccessory === null || categoryAccessory === void 0 ? void 0 : categoryAccessory.data) === null || _b === void 0 ? void 0 : _b.map(function (item) { return (__assign(__assign({}, item), { percentage: Math.round(((item === null || item === void 0 ? void 0 : item.product) * 100) / totalData_1) })); });
                        res.json({
                            status: "SUCCESS",
                            message: "Accessory graph data found successfully.",
                            data: { categoryWithPercentage: categoryWithPercentage, totalData: totalData_1 },
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _d.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccessoryDashboardController.prototype.card = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var currentDateRoot, currentDateHigh, totalAccessories, totalTodayAccessories, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        currentDateRoot = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                        currentDateHigh = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59);
                        return [4 /*yield*/, product_model_1.ProductModel.find({
                                type: "ACCESSORY",
                            }).count()];
                    case 1:
                        totalAccessories = _a.sent();
                        return [4 /*yield*/, product_model_1.ProductModel.find({
                                type: "ACCESSORY",
                                $and: [
                                    { createdAt: { $gte: new Date(currentDateRoot) } },
                                    {
                                        createdAt: new Date(currentDateHigh),
                                    },
                                ],
                            }).count()];
                    case 2:
                        totalTodayAccessories = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Accessory card data found successfully.",
                            data: { totalAccessories: totalAccessories, totalTodayAccessories: totalTodayAccessories },
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AccessoryDashboardController.prototype.topAccessories = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, limit, chunk, getAll, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, limit = _a.limit, chunk = _a.chunk;
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: product_model_1.ProductModel,
                                query: { type: "ACCESSORY" },
                                chunk: chunk ? Number(chunk) : undefined,
                                limit: limit ? Number(limit) : undefined,
                                select: "",
                                populate: "",
                                sort: {
                                    stock: -1,
                                },
                            })];
                    case 1:
                        getAll = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Accessory card data found successfully.",
                            data: getAll,
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
    return AccessoryDashboardController;
}());
exports.default = AccessoryDashboardController;
