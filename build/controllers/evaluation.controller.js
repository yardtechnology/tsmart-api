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
exports.EvaluationControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var evaluation_logic_1 = __importDefault(require("../logic/evaluation.logic"));
var media_logic_1 = __importDefault(require("../logic/media.logic"));
var models_1 = require("../models");
var EvaluationController = /** @class */ (function () {
    function EvaluationController() {
    }
    EvaluationController.prototype.create = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var imageData, _b, title, description, imageFile, filePath, _c, createDevice, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, , 6]);
                        (0, helper_1.fieldValidateError)(req);
                        _b = req.body, title = _b.title, description = _b.description;
                        imageFile = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.image;
                        filePath = "Evaluation";
                        if (!(imageFile && !Array.isArray(imageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, new media_logic_1.default().uploadMedia(imageFile, filePath)];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3:
                        imageData = _c;
                        return [4 /*yield*/, models_1.EvaluationSchema.create({
                                title: title,
                                description: description,
                                image: imageData === null || imageData === void 0 ? void 0 : imageData.url,
                                imagePATH: imageData === null || imageData === void 0 ? void 0 : imageData.path,
                            })];
                    case 4:
                        createDevice = _d.sent();
                        if (!createDevice)
                            throw new http_errors_1.InternalServerError("Something went wrong, Evaluation is not created.");
                        res.json({
                            status: "SUCCESS",
                            message: "Evaluation created successfully.",
                            data: createDevice,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _d.sent();
                        if (imageData === null || imageData === void 0 ? void 0 : imageData.path) {
                            new media_logic_1.default().deleteMedia(imageData === null || imageData === void 0 ? void 0 : imageData.path);
                        }
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EvaluationController.prototype.update = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var imageData, evaluationId, _b, title, description, imageFile, filePath, _c, arg, updateDeviceData, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, , 6]);
                        evaluationId = req.params.evaluationId;
                        _b = req.body, title = _b.title, description = _b.description;
                        (0, helper_1.fieldValidateError)(req);
                        imageFile = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.image;
                        filePath = "Evaluation";
                        if (!(imageFile && !Array.isArray(imageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, new media_logic_1.default().uploadMedia(imageFile, filePath)];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3:
                        imageData = _c;
                        arg = {};
                        title && (arg.title = title);
                        description && (arg.description = description);
                        if (imageData) {
                            arg.image = imageData === null || imageData === void 0 ? void 0 : imageData.url;
                            arg.imagePATH = imageData === null || imageData === void 0 ? void 0 : imageData.path;
                        }
                        return [4 /*yield*/, models_1.EvaluationSchema.findByIdAndUpdate(evaluationId, arg, {
                                runValidators: true,
                            })];
                    case 4:
                        updateDeviceData = _d.sent();
                        if (!updateDeviceData)
                            throw new http_errors_1.InternalServerError("Something went wrong, Evaluation is not updated.");
                        if ((arg === null || arg === void 0 ? void 0 : arg.imagePATH) && (updateDeviceData === null || updateDeviceData === void 0 ? void 0 : updateDeviceData.imagePATH)) {
                            new media_logic_1.default().deleteMedia(updateDeviceData === null || updateDeviceData === void 0 ? void 0 : updateDeviceData.imagePATH);
                        }
                        res.json({
                            status: "SUCCESS",
                            message: "Evaluation updated successfully",
                            data: updateDeviceData,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _d.sent();
                        if (imageData === null || imageData === void 0 ? void 0 : imageData.path) {
                            new media_logic_1.default().deleteMedia(imageData === null || imageData === void 0 ? void 0 : imageData.path);
                        }
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EvaluationController.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, limit, chunk, getAllData, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, limit = _a.limit, chunk = _a.chunk;
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.EvaluationSchema,
                                query: {},
                                chunk: chunk ? Number(chunk) : undefined,
                                limit: limit ? Number(limit) : undefined,
                                select: "",
                                sort: {
                                    createdAt: -1,
                                },
                            })];
                    case 1:
                        getAllData = _b.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "All evaluation found successfully.s",
                            data: getAllData,
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
    EvaluationController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var evaluationId, deleteEvaluation, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        evaluationId = req.params.evaluationId;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.EvaluationSchema.findByIdAndDelete(evaluationId)];
                    case 1:
                        deleteEvaluation = _a.sent();
                        if (!deleteEvaluation)
                            throw new http_errors_1.NotFound("Evaluation not found.");
                        //   delete device image
                        (deleteEvaluation === null || deleteEvaluation === void 0 ? void 0 : deleteEvaluation.imagePATH) &&
                            new media_logic_1.default().deleteMedia(deleteEvaluation === null || deleteEvaluation === void 0 ? void 0 : deleteEvaluation.imagePATH);
                        return [4 /*yield*/, models_1.EvaluationPriceSchema.deleteMany({
                                evaluation: evaluationId,
                            })];
                    case 2:
                        _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Evaluation deleted successfully",
                            data: deleteEvaluation,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EvaluationController.prototype.evaluationPrice = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, evaluationIds, modelId, colorId, memoryId, arrayCheck, evaluationData;
            return __generator(this, function (_b) {
                try {
                    _a = req.body, evaluationIds = _a.evaluationIds, modelId = _a.modelId, colorId = _a.colorId, memoryId = _a.memoryId;
                    arrayCheck = Array.isArray(evaluationIds)
                        ? evaluationIds
                        : [evaluationIds];
                    evaluationData = new evaluation_logic_1.default().deviceEvaluation({
                        evaluationPriceIds: arrayCheck,
                        modelId: modelId,
                        colorId: colorId,
                        memoryId: memoryId,
                    });
                    res.json({
                        status: "SUCCESS",
                        message: "Price updated successfully",
                        data: evaluationData,
                    });
                }
                catch (error) {
                    next(error);
                }
                return [2 /*return*/];
            });
        });
    };
    return EvaluationController;
}());
exports.EvaluationControllerValidation = {
    create: [
        (0, express_validator_1.body)("title").not().isEmpty().withMessage("title is required."),
        (0, express_validator_1.body)("description")
            .not()
            .isEmpty()
            .withMessage("description is required.")
            .isLength({ max: 300 })
            .withMessage("description must be at most 300 characters long"),
    ],
    delete: [
        (0, express_validator_1.param)("evaluationId")
            .not()
            .isEmpty()
            .withMessage("evaluationId is required."),
    ],
    update: [
        (0, express_validator_1.param)("evaluationId")
            .not()
            .isEmpty()
            .withMessage("evaluationId is required."),
        (0, express_validator_1.body)("title")
            .optional()
            .isLength({ min: 1 })
            .withMessage("title must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("title must be at most 250 character."),
        (0, express_validator_1.body)("description")
            .optional()
            .isLength({ min: 1 })
            .withMessage("description must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("description must be at most 250 character."),
    ],
};
exports.default = EvaluationController;
