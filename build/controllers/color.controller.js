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
exports.ColorControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var models_1 = require("../models");
var ColorController = /** @class */ (function () {
    function ColorController() {
    }
    ColorController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var createColor, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.ColorSchema.create(req.body)];
                    case 1:
                        createColor = _a.sent();
                        if (!createColor)
                            throw new http_errors_1.InternalServerError("Something went wrong, Color is not created.");
                        res.json({
                            status: "SUCCESS",
                            message: "Color created successfully.",
                            data: createColor,
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
    ColorController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var colorId, _a, color, hashCode, arg, updateColor, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        colorId = req.params.colorId;
                        _a = req.body, color = _a.color, hashCode = _a.hashCode;
                        (0, helper_1.fieldValidateError)(req);
                        arg = {};
                        color && (arg.color = color);
                        hashCode && (arg.hashCode = hashCode);
                        return [4 /*yield*/, models_1.ColorSchema.findByIdAndUpdate(colorId, arg, {
                                runValidators: true,
                            })];
                    case 1:
                        updateColor = _b.sent();
                        if (!updateColor)
                            throw new http_errors_1.InternalServerError("Something went wrong, Color is not updated.");
                        res.json({
                            status: "SUCCESS",
                            message: "Color updated successfully",
                            data: updateColor,
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
    ColorController.prototype.getAll = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, limit, chunk, colorId, query_1, getAllData, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.query, limit = _b.limit, chunk = _b.chunk, colorId = _b.colorId;
                        query_1 = {};
                        colorId && (query_1._id = colorId);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.ColorSchema,
                                query: query_1,
                                chunk: chunk ? Number(chunk) : undefined,
                                limit: limit ? Number(limit) : undefined,
                                select: "",
                                sort: {
                                    createdAt: -1,
                                },
                            })];
                    case 1:
                        getAllData = _c.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "All color found successfully.s",
                            data: colorId ? (_a = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _a === void 0 ? void 0 : _a[0] : getAllData,
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
    ColorController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var colorId, deleteColor, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        colorId = req.params.colorId;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.ColorSchema.findByIdAndDelete(colorId)];
                    case 1:
                        deleteColor = _a.sent();
                        if (!deleteColor)
                            throw new http_errors_1.NotFound("Color not found.");
                        //   delete color image
                        res.json({
                            status: "SUCCESS",
                            message: "Color deleted successfully",
                            data: deleteColor,
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
    return ColorController;
}());
exports.ColorControllerValidation = {
    create: [
        (0, express_validator_1.body)("color").not().isEmpty().withMessage("color is required."),
        (0, express_validator_1.body)("hashCode").not().isEmpty().withMessage("hashCode is required."),
    ],
    delete: [
        (0, express_validator_1.param)("colorId")
            .not()
            .isEmpty()
            .withMessage("colorId is required.")
            .isMongoId()
            .withMessage("colorId most be mongoose id."),
    ],
    getAll: [
        (0, express_validator_1.query)("colorId").not().isEmpty().withMessage("colorId is required."),
    ],
    update: [
        (0, express_validator_1.param)("colorId")
            .not()
            .isEmpty()
            .withMessage("colorId is required.")
            .isMongoId()
            .withMessage("colorId most be mongoose Id."),
        (0, express_validator_1.body)("color")
            .optional()
            .isLength({ min: 1 })
            .withMessage("color must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("color must be at most 250 character."),
        (0, express_validator_1.body)("hasCode")
            .optional()
            .isLength({ min: 1 })
            .withMessage("hasCode must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("hasCode must be at most 250 character."),
    ],
};
exports.default = ColorController;
