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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalePriceControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var evaluation_logic_1 = __importDefault(require("../logic/evaluation.logic"));
var models_1 = require("../models");
var SalePriceController = /** @class */ (function () {
    function SalePriceController() {
    }
    SalePriceController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, price, modelId, memoryId, colorId, createAndUpdateSalePrice, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        _a = req.body, price = _a.price, modelId = _a.modelId, memoryId = _a.memoryId, colorId = _a.colorId;
                        return [4 /*yield*/, models_1.SalePriceModel.create({
                                model: modelId,
                                price: price,
                                memory: memoryId,
                                color: colorId,
                            })];
                    case 1:
                        createAndUpdateSalePrice = _b.sent();
                        if (!createAndUpdateSalePrice)
                            throw new http_errors_1.NotFound("Something went wrong, data not saved. Please try again");
                        res.json({
                            status: "SUCCESS",
                            message: "SalePrice created successfully.",
                            data: createAndUpdateSalePrice,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SalePriceController.prototype.getAll = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var modelId, _c, limit, chunk, colorId, memoryId, salePriceId, query_1, getAllData, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        modelId = req.params.modelId;
                        _c = req.query, limit = _c.limit, chunk = _c.chunk, colorId = _c.colorId, memoryId = _c.memoryId, salePriceId = _c.salePriceId;
                        query_1 = {
                            model: modelId,
                        };
                        salePriceId && (query_1["_id"] = salePriceId);
                        colorId && (query_1["color"] = colorId);
                        memoryId && (query_1["memory"] = memoryId);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.SalePriceModel,
                                query: query_1,
                                chunk: chunk ? Number(chunk) : undefined,
                                limit: limit ? Number(limit) : undefined,
                                select: "",
                                populate: [
                                    {
                                        path: "color",
                                    },
                                    {
                                        path: "memory",
                                    },
                                    {
                                        path: "model",
                                        populate: [
                                            {
                                                path: "device",
                                            },
                                            {
                                                path: "make",
                                            },
                                        ],
                                    },
                                ],
                                sort: {
                                    createdAt: -1,
                                },
                            })];
                    case 1:
                        getAllData = _d.sent();
                        res.json({
                            status: "SUCCESS",
                            message: ((_a = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _a === void 0 ? void 0 : _a.length) === 1
                                ? "SalePrice found successfully"
                                : "All SalePrices found successfully.",
                            data: salePriceId ? (_b = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _b === void 0 ? void 0 : _b[0] : getAllData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _d.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SalePriceController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, deleteSalePrice, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = req.params._id;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.SalePriceModel.findByIdAndDelete(_id)];
                    case 1:
                        deleteSalePrice = _a.sent();
                        if (!deleteSalePrice)
                            throw new http_errors_1.NotFound("No data found for delete request.");
                        res.json({
                            status: "SUCCESS",
                            message: "SalePrice deleted successfully.",
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
    SalePriceController.prototype.saleSummery = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, evaluationPriceIds, sellPriceId, arrayCheck, saleSummery, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, evaluationPriceIds = _a.evaluationPriceIds, sellPriceId = _a.sellPriceId;
                        (0, helper_1.fieldValidateError)(req);
                        arrayCheck = Array.isArray(evaluationPriceIds)
                            ? evaluationPriceIds
                            : evaluationPriceIds
                                ? [evaluationPriceIds]
                                : undefined;
                        return [4 /*yield*/, new evaluation_logic_1.default().sellSummery({
                                evaluationPriceIds: arrayCheck,
                                sellPriceId: sellPriceId,
                            })];
                    case 1:
                        saleSummery = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "SalePrice summery get successfully.",
                            data: saleSummery,
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
    SalePriceController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var salePriceId, price, updateSalePrice, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        salePriceId = req.params.salePriceId;
                        price = req.body.price;
                        return [4 /*yield*/, models_1.SalePriceModel.findByIdAndUpdate(salePriceId, {
                                price: price,
                            })];
                    case 1:
                        updateSalePrice = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Price updated successfully.",
                            data: updateSalePrice,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return SalePriceController;
}());
exports.SalePriceControllerValidation = {
    createAndUpdate: [
        (0, express_validator_1.body)("modelId")
            .not()
            .isEmpty()
            .withMessage("modelId is required.")
            .isMongoId()
            .withMessage("modelId must be a valid MongoDB ObjectId."),
        (0, express_validator_1.body)("memoryId")
            .isMongoId()
            .withMessage("memoryId must be a valid MongoDB ObjectId."),
        (0, express_validator_1.body)("colorId")
            .isMongoId()
            .withMessage("colorId must be a valid MongoDB ObjectId."),
        (0, express_validator_1.body)("price")
            .optional()
            .exists()
            .isNumeric()
            .withMessage("price must be number"),
    ],
    delete: [
        (0, express_validator_1.param)("_id")
            .not()
            .isEmpty()
            .withMessage("_id is required.")
            .isMongoId()
            .withMessage("_id most be mongoose id"),
    ],
    getAll: [
        (0, express_validator_1.query)("colorId")
            .optional()
            .exists()
            .isMongoId()
            .withMessage("colorId most be mongoose id."),
        (0, express_validator_1.query)("memoryId")
            .optional()
            .exists()
            .isMongoId()
            .withMessage("memoryId most be mongoose id."),
        (0, express_validator_1.query)("salePriceId")
            .optional()
            .exists()
            .isMongoId()
            .withMessage("salePriceId most be mongoose id."),
        (0, express_validator_1.param)("modelId")
            .not()
            .isEmpty()
            .withMessage("modelId must be required")
            .isMongoId()
            .withMessage("salePriceId most be mongoose id."),
    ],
    saleSummery: [
        (0, express_validator_1.body)("evaluationPriceIds.*")
            .optional()
            .exists()
            .isMongoId()
            .withMessage("evaluationPriceIds most be mongooseId."),
        (0, express_validator_1.body)("sellPriceId")
            .not()
            .isEmpty()
            .withMessage("sellPriceId is required.")
            .isMongoId()
            .withMessage("sellPriceId most be mongoose id."),
    ],
    update: [
        (0, express_validator_1.param)("salePriceId")
            .not()
            .isEmpty()
            .withMessage("sellPriceId is required.")
            .isMongoId()
            .withMessage("sellPriceId most be mongoose id."),
        (0, express_validator_1.body)("price")
            .not()
            .isEmpty()
            .withMessage("price is required.")
            .isNumeric()
            .withMessage("price most be number."),
    ],
};
exports.default = SalePriceController;
