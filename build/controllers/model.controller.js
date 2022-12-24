"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ModelControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var media_logic_1 = __importDefault(require("../logic/media.logic"));
var model_model_1 = require("../models/model.model");
var ModelController = /** @class */ (function (_super) {
    __extends(ModelController, _super);
    function ModelController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // create model
    ModelController.prototype.createAndUpdate = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var types, typesArrayCheck, imageFile, filePath, imageData, _g, modelData, error_1;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 5, , 6]);
                        (0, helper_1.fieldValidateError)(req);
                        types = req.body.types;
                        typesArrayCheck = types
                            ? Array.isArray(types)
                                ? types
                                : [types]
                            : [];
                        imageFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
                        filePath = "".concat((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b._id);
                        if (!(imageFile && !Array.isArray(imageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, imageFile, filePath)];
                    case 1:
                        _g = _h.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _g = undefined;
                        _h.label = 3;
                    case 3:
                        imageData = _g;
                        return [4 /*yield*/, model_model_1.ModelModel.findOneAndUpdate({
                                title: (_c = req.body) === null || _c === void 0 ? void 0 : _c.title,
                            }, {
                                description: (_d = req.body) === null || _d === void 0 ? void 0 : _d.description,
                                image: imageData === null || imageData === void 0 ? void 0 : imageData.url,
                                imagePath: imageData === null || imageData === void 0 ? void 0 : imageData.path,
                                device: (_e = req.body) === null || _e === void 0 ? void 0 : _e.deviceId,
                                make: (_f = req.body) === null || _f === void 0 ? void 0 : _f.makeId,
                                type: typesArrayCheck,
                                // $addToSet: { type: { $each: typesArrayCheck } },
                            }, {
                                new: true,
                                runValidators: true,
                                upsert: true,
                            })];
                    case 4:
                        modelData = _h.sent();
                        if (!modelData)
                            throw new http_errors_1.NotFound("You are already added on ".concat(types.join(","), ", You can not add again here."));
                        // send response to client
                        res.json({
                            status: "SUCCESS",
                            message: "Model added successfully",
                            data: modelData,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _h.sent();
                        // send error to client
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ModelController.prototype.removeServiceType = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var modelId, types, typesArrayCheck, removeServiceType, deleteMake, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        modelId = req.params.modelId;
                        types = req.body.types;
                        (0, helper_1.fieldValidateError)(req);
                        typesArrayCheck = types
                            ? Array.isArray(types)
                                ? types
                                : [types]
                            : [];
                        return [4 /*yield*/, model_model_1.ModelModel.findOneAndUpdate({ _id: modelId, type: { $in: typesArrayCheck } }, {
                                $pull: {
                                    type: { $in: typesArrayCheck },
                                },
                            }, {
                                new: true,
                                runValidators: true,
                            })];
                    case 1:
                        removeServiceType = _b.sent();
                        if (!removeServiceType)
                            throw new http_errors_1.NotFound("No data found for remove type");
                        if (!!((_a = removeServiceType === null || removeServiceType === void 0 ? void 0 : removeServiceType.type) === null || _a === void 0 ? void 0 : _a.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, model_model_1.ModelModel.findByIdAndDelete(modelId)];
                    case 2:
                        deleteMake = _b.sent();
                        _b.label = 3;
                    case 3:
                        res.json({
                            status: "SUCCESS",
                            message: "Remove type successfully.",
                            data: removeServiceType,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ModelController.prototype.getAll = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, limit, chunk, modelId, type, searchTitle, makeId, deviceId, query_1, getAllData, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.query, limit = _b.limit, chunk = _b.chunk, modelId = _b.modelId, type = _b.type, searchTitle = _b.searchTitle, makeId = _b.makeId, deviceId = _b.deviceId;
                        (0, helper_1.fieldValidateError)(req);
                        query_1 = {};
                        if (searchTitle)
                            query_1["$or"] = [{ title: { $regex: searchTitle, $options: "i" } }];
                        makeId && (query_1["make"] = makeId);
                        deviceId && (query_1["device"] = deviceId);
                        modelId && (query_1["_id"] = modelId);
                        type && (query_1["type"] = type);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: model_model_1.ModelModel,
                                query: query_1,
                                chunk: chunk ? Number(chunk) : undefined,
                                limit: limit ? Number(limit) : undefined,
                                select: "",
                                populate: [
                                    {
                                        path: "device",
                                        select: "-imagePATH",
                                    },
                                    {
                                        path: "make",
                                        select: "-imagePATH -devices",
                                    },
                                ],
                                sort: {
                                    createdAt: -1,
                                },
                            })];
                    case 1:
                        getAllData = _c.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: modelId
                                ? "model found successfully."
                                : "All model found successfully.",
                            data: modelId ? (_a = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _a === void 0 ? void 0 : _a[0] : getAllData,
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
    ModelController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var modelId, deleteModel, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        modelId = req.params.modelId;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, model_model_1.ModelModel.findByIdAndDelete(modelId)];
                    case 1:
                        deleteModel = _a.sent();
                        if (!deleteModel)
                            throw new Error("Model not found for delete.");
                        res.json({
                            status: "SUCCESS",
                            message: "Model deleted successfully",
                            data: deleteModel,
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
    return ModelController;
}(media_logic_1.default));
// finds validators for the user creation request
exports.ModelControllerValidation = {
    createAndUpdate: [
        (0, express_validator_1.body)("title")
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage("Title must be at least 3 characters long")
            .isLength({ max: 300 })
            .withMessage("Title must be at most 300 characters long")
            .trim()
            .toUpperCase(),
        (0, express_validator_1.body)("description")
            .optional()
            .isLength({ min: 5 })
            .withMessage("Description must be at least 5 characters long")
            .isLength({ max: 51 })
            .withMessage("Description must be at most 51 characters long")
            .trim(),
        (0, express_validator_1.body)("deviceId")
            .optional()
            .isMongoId()
            .withMessage("deviceId must be a mongos id."),
        (0, express_validator_1.body)("makeId")
            .optional()
            .isMongoId()
            .withMessage("makeId must be a mongos id."),
        (0, express_validator_1.body)("types.*")
            .optional()
            .exists()
            .withMessage("type is not formatted.")
            .exists()
            .toUpperCase()
            .custom(function (value) { var _a; return Boolean(["SERVICE", "SELL"].includes((_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.toUpperCase())); })
            .withMessage("type most be SERVICE or SELL."),
    ],
    removeServiceType: [
        (0, express_validator_1.param)("modelId")
            .not()
            .isEmpty()
            .withMessage("modelId is required.")
            .isMongoId()
            .withMessage("modelId most be mongoose id"),
        (0, express_validator_1.body)("types.*")
            .not()
            .isEmpty()
            .withMessage("type must be required.")
            .exists()
            .toUpperCase()
            .custom(function (value) {
            var _a;
            return Boolean(!value.length ||
                ["SERVICE", "SELL"].includes((_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.toUpperCase()));
        })
            .withMessage("type most be SERVICE or SELL or both."),
    ],
    getAll: [
        (0, express_validator_1.query)("modelId")
            .optional()
            .exists()
            .isMongoId()
            .withMessage("modelId most be mongoose id."),
        (0, express_validator_1.query)("types.*")
            .optional()
            .exists()
            .custom(function (value) { var _a; return Boolean(["SERVICE", "SELL"].includes((_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.toUpperCase())); })
            .withMessage("type most be SERVICE or SELL or both."),
        (0, express_validator_1.query)("searchTitle").optional().exists().toUpperCase(),
        (0, express_validator_1.query)("deviceId")
            .optional()
            .exists()
            .isMongoId()
            .withMessage("deviceId is not valid mongoose id."),
        (0, express_validator_1.query)("makeId")
            .optional()
            .exists()
            .isMongoId()
            .withMessage("makeId is not valid mongoose id."),
    ],
    delete: [
        (0, express_validator_1.param)("modelId")
            .not()
            .isEmpty()
            .withMessage("modelId is required.")
            .isMongoId()
            .withMessage("modelId most be mongoose id"),
    ],
};
exports.default = ModelController;
