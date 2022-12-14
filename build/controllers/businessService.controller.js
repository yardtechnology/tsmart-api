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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessServiceControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var models_1 = require("../models");
var BusinessServiceController = /** @class */ (function () {
    function BusinessServiceController() {
    }
    BusinessServiceController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var businessServiceCreate, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.BusinessServiceSchema.create(__assign({}, req.body))];
                    case 1:
                        businessServiceCreate = _a.sent();
                        if (!businessServiceCreate)
                            throw new http_errors_1.InternalServerError("Something went wrong, Business service is not created.");
                        res.json({
                            status: "SUCCESS",
                            message: "Business service created successfully.",
                            data: businessServiceCreate,
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
    BusinessServiceController.prototype.getAll = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, limit, chunk, businessServiceId, query_1, getAllData, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        _b = req.query, limit = _b.limit, chunk = _b.chunk, businessServiceId = _b.businessServiceId;
                        query_1 = {};
                        businessServiceId && (query_1["_id"] = businessServiceId);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.BusinessServiceSchema,
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
                            message: businessServiceId
                                ? "Business service found successfully."
                                : "All Business service found successfully.",
                            data: businessServiceId ? (_a = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _a === void 0 ? void 0 : _a[0] : getAllData,
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
    BusinessServiceController.prototype.deleteData = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var businessServiceId, deleteBusinessService, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        businessServiceId = req.params.businessServiceId;
                        if (!businessServiceId)
                            throw new http_errors_1.BadRequest("businessServiceId is required.");
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.BusinessServiceSchema.findByIdAndDelete(businessServiceId)];
                    case 1:
                        deleteBusinessService = _a.sent();
                        //   delete device image
                        if (!deleteBusinessService)
                            throw new http_errors_1.NotFound("No make found for delete.");
                        res.json({
                            status: "SUCCESS",
                            message: "Business service deleted successfully",
                            data: deleteBusinessService,
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
    return BusinessServiceController;
}());
exports.BusinessServiceControllerValidation = {
    create: [
        (0, express_validator_1.body)("name")
            .not()
            .isEmpty()
            .withMessage("name is required.")
            .isLength({ min: 3 })
            .withMessage("name must be at least 3 characters long")
            .isLength({ max: 60 })
            .withMessage("name must be at most 60 characters long"),
        (0, express_validator_1.body)("phoneNumber")
            .optional()
            .isLength({ min: 3 })
            .withMessage("phoneNumber must be at least 3 characters long")
            .isLength({ max: 20 })
            .withMessage("phoneNumber must be at most 20 characters long"),
        (0, express_validator_1.body)("email")
            .not()
            .isEmpty()
            .withMessage("email is required.")
            .isEmail()
            .withMessage("Email is not valid."),
        (0, express_validator_1.body)("countryCode").optional(),
        (0, express_validator_1.body)("companyName")
            .not()
            .isEmpty()
            .withMessage("companyName is required.")
            .isLength({ min: 3 })
            .withMessage("companyName must be at least 3 characters long")
            .isLength({ max: 100 })
            .withMessage("companyName must be at most 100 characters long"),
        (0, express_validator_1.body)("companyRegNumber")
            .not()
            .isEmpty()
            .withMessage("companyRegNumber is required.")
            .isLength({ min: 3 })
            .withMessage("companyRegNumber must be at least 3 characters long")
            .isLength({ max: 250 })
            .withMessage("companyRegNumber must be at most 250 characters long"),
        (0, express_validator_1.body)("message")
            .not()
            .isEmpty()
            .withMessage("message is required.")
            .isLength({ min: 3 })
            .withMessage("message must be at least 3 characters long")
            .isLength({ max: 450 })
            .withMessage("message must be at most 450 characters long"),
    ],
    getAll: [
        (0, express_validator_1.query)("businessServiceId")
            .optional()
            .isMongoId()
            .withMessage("businessServiceId must be mongoose id."),
    ],
    delete: [
        (0, express_validator_1.param)("businessServiceId")
            .not()
            .isEmpty()
            .withMessage("businessServiceId is required.")
            .isMongoId()
            .withMessage("businessServiceId must be mongoose id."),
    ],
};
exports.default = BusinessServiceController;
