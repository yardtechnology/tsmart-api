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
exports.SupportControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var models_1 = require("../models");
var SupportController = /** @class */ (function () {
    function SupportController() {
    }
    SupportController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, phoneNumber, countryCode, subject, message, createSupport, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        _a = req.body, email = _a.email, phoneNumber = _a.phoneNumber, countryCode = _a.countryCode, subject = _a.subject, message = _a.message;
                        return [4 /*yield*/, models_1.SupportSchema.create({
                                email: email,
                                phoneNumber: phoneNumber,
                                countryCode: countryCode,
                                subject: subject,
                                message: message,
                            })];
                    case 1:
                        createSupport = _b.sent();
                        if (!createSupport)
                            throw new http_errors_1.InternalServerError("Something went wrong, Support is not created.");
                        res.json({
                            status: "SUCCESS",
                            message: "Support created successfully.",
                            data: createSupport,
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
    SupportController.prototype.getAll = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, limit, chunk, supportId, query_1, getAllData, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.query, limit = _b.limit, chunk = _b.chunk, supportId = _b.supportId;
                        (0, helper_1.fieldValidateError)(req);
                        query_1 = {};
                        supportId && (query_1["_id"] = supportId);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.SupportSchema,
                                query: query_1,
                                chunk: chunk ? Number(chunk) : undefined,
                                limit: limit ? Number(limit) : undefined,
                                select: "",
                                populate: "",
                                sort: {
                                    createdAt: -1,
                                },
                            })];
                    case 1:
                        getAllData = _c.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: supportId
                                ? "Support found successfully."
                                : "All support found successfully.",
                            data: supportId ? (_a = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _a === void 0 ? void 0 : _a[0] : getAllData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _c.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SupportController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var supportId, deleteSupport, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        supportId = req.params.supportId;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.SupportSchema.findByIdAndDelete(supportId)];
                    case 1:
                        deleteSupport = _a.sent();
                        if (!deleteSupport)
                            throw new http_errors_1.NotFound("No Support found for delete.");
                        res.json({
                            status: "SUCCESS",
                            message: "Support deleted successfully",
                            data: deleteSupport,
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
    return SupportController;
}());
exports.SupportControllerValidation = {
    create: [
        (0, express_validator_1.body)("email")
            .not()
            .isEmpty()
            .withMessage("email is required.")
            .isEmail()
            .withMessage("email is not formatted."),
        (0, express_validator_1.body)("phoneNumber").not().isEmpty().withMessage("phoneNumber is required."),
        (0, express_validator_1.body)("countryCode").not().isEmpty().withMessage("countryCode is required."),
        (0, express_validator_1.body)("subject").not().isEmpty().withMessage("subject is required."),
        (0, express_validator_1.body)("message")
            .not()
            .isEmpty()
            .withMessage("message is required.")
            .isLength({ min: 3 })
            .withMessage("message must be at least 3 characters long")
            .isLength({ max: 420 })
            .withMessage("message must be at most 420 characters long"),
        (0, express_validator_1.body)("subject")
            .not()
            .isEmpty()
            .withMessage("subject is required.")
            .isLength({ min: 3 })
            .withMessage("subject must be at least 3 characters long")
            .isLength({ max: 100 })
            .withMessage("subject must be at most 100 characters long"),
    ],
    getAll: [
        (0, express_validator_1.query)("supportId")
            .optional()
            .isMongoId()
            .withMessage("supportId should be mongoose id."),
    ],
    delete: [
        (0, express_validator_1.param)("supportId")
            .not()
            .isEmpty()
            .withMessage("supportId is required.")
            .isMongoId()
            .withMessage("supportId must be mongoose Id."),
    ],
};
exports.default = SupportController;
