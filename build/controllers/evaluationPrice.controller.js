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
exports.EvaluationPriceControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var models_1 = require("../models");
var EvaluationPriceController = /** @class */ (function () {
    function EvaluationPriceController() {
    }
    EvaluationPriceController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, _a, price, evaluationId, modelId, evaluationCreate, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new http_errors_1.BadRequest(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        _a = req.body, price = _a.price, evaluationId = _a.evaluationId, modelId = _a.modelId;
                        return [4 /*yield*/, models_1.EvaluationPriceSchema.create({
                                price: +price,
                                evaluation: evaluationId,
                                model: modelId,
                            })];
                    case 1:
                        evaluationCreate = _b.sent();
                        if (!evaluationCreate)
                            throw new http_errors_1.InternalServerError("Something went wrong, Evaluation price  is not created.");
                        res.json({
                            status: "SUCCESS",
                            message: "Evaluation price created successfully.",
                            data: evaluationCreate,
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
    EvaluationPriceController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var evaluationPriceId, _a, evaluationId, modelId, price, errors, arg, updateEvaluationPrice, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        evaluationPriceId = req.params.evaluationPriceId;
                        _a = req.body, evaluationId = _a.evaluationId, modelId = _a.modelId, price = _a.price;
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new http_errors_1.BadRequest(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        arg = {};
                        evaluationId && (arg.evaluation = evaluationId);
                        modelId && (arg.model = modelId);
                        price >= 0 && (arg.price = price);
                        return [4 /*yield*/, models_1.EvaluationPriceSchema.findByIdAndUpdate(evaluationPriceId, arg, {
                                runValidators: true,
                            })];
                    case 1:
                        updateEvaluationPrice = _b.sent();
                        if (!updateEvaluationPrice)
                            throw new http_errors_1.InternalServerError("Something went wrong, Evaluation price is not updated.");
                        res.json({
                            status: "SUCCESS",
                            message: "Evaluation price updated successfully",
                            data: updateEvaluationPrice,
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
    EvaluationPriceController.prototype.getAll = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, limit, chunk, modelId, evaluationId, evaluationPriceId, query, getAllData, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.query, limit = _b.limit, chunk = _b.chunk, modelId = _b.modelId, evaluationId = _b.evaluationId, evaluationPriceId = _b.evaluationPriceId;
                        query = {};
                        modelId && (query.model = modelId);
                        evaluationId && (query.evaluation = evaluationId);
                        evaluationPriceId && (query._id = evaluationPriceId);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.EvaluationPriceSchema,
                                query: query,
                                chunk: chunk ? Number(chunk) : undefined,
                                limit: limit ? Number(limit) : undefined,
                                populate: [
                                    {
                                        path: "evaluation",
                                        select: "image title description",
                                    },
                                    {
                                        path: "model",
                                        select: "-imagePATH -device",
                                    },
                                ],
                                select: "",
                                sort: {
                                    createdAt: -1,
                                },
                            })];
                    case 1:
                        getAllData = _c.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: evaluationPriceId
                                ? "Evaluation price found successfully."
                                : "All evaluation price found successfully.",
                            data: evaluationPriceId ? (_a = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _a === void 0 ? void 0 : _a[0] : getAllData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _c.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EvaluationPriceController.prototype.deleteData = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var evaluationPriceId, errors, evaluationPriceDataDeleted, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        evaluationPriceId = req.params.evaluationPriceId;
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new http_errors_1.BadRequest(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        return [4 /*yield*/, models_1.EvaluationPriceSchema.findByIdAndDelete(evaluationPriceId)];
                    case 1:
                        evaluationPriceDataDeleted = _a.sent();
                        if (!evaluationPriceDataDeleted)
                            throw new http_errors_1.NotFound("Evaluation price not found.");
                        res.json({
                            status: "SUCCESS",
                            message: "Evaluation price deleted successfully.",
                            data: evaluationPriceDataDeleted,
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
    return EvaluationPriceController;
}());
exports.EvaluationPriceControllerValidation = {
    create: [
        (0, express_validator_1.body)("price")
            .not()
            .isEmpty()
            .withMessage("price is required.")
            .isInt()
            .withMessage("Price must be number."),
        (0, express_validator_1.body)("evaluationId")
            .not()
            .isEmpty()
            .withMessage("evaluationId is required."),
        (0, express_validator_1.body)("modelId").not().isEmpty().withMessage("moduleId is required."),
    ],
    delete: [
        (0, express_validator_1.param)("evaluationPriceId")
            .not()
            .isEmpty()
            .withMessage("evaluationPriceId is required."),
    ],
    update: [
        (0, express_validator_1.param)("evaluationPriceId")
            .not()
            .isEmpty()
            .withMessage("evaluationPriceId is required."),
        (0, express_validator_1.body)("price").optional().isNumeric().withMessage("price must be number."),
        (0, express_validator_1.body)("evaluationId")
            .optional()
            .isMongoId()
            .withMessage("Need mongoose id."),
        (0, express_validator_1.body)("modelId").optional().isMongoId().withMessage("Need mongoose id."),
    ],
};
exports.default = EvaluationPriceController;
