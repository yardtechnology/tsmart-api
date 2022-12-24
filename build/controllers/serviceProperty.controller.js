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
exports.ServicePropertyControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var models_1 = require("../models");
var ServicePropertyController = /** @class */ (function () {
    function ServicePropertyController() {
    }
    ServicePropertyController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, serviceId, type, description, createServiceProperty, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        _a = req.body, title = _a.title, serviceId = _a.serviceId, type = _a.type, description = _a.description;
                        return [4 /*yield*/, models_1.ServicePropertySchema.create({
                                title: title,
                                description: description,
                                service: serviceId,
                                type: type,
                            })];
                    case 1:
                        createServiceProperty = _b.sent();
                        if (!createServiceProperty)
                            throw new http_errors_1.InternalServerError("Something went wrong, Service property is not created.");
                        res.json({
                            status: "SUCCESS",
                            message: "Service property is created successfully.",
                            data: createServiceProperty,
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
    ServicePropertyController.prototype.getAll = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, limit, chunk, servicePropertyId, service, query_1, getAllData, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.query, limit = _b.limit, chunk = _b.chunk, servicePropertyId = _b.servicePropertyId;
                        service = req.params.service;
                        (0, helper_1.fieldValidateError)(req);
                        query_1 = { service: service };
                        servicePropertyId && (query_1["_id"] = servicePropertyId);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.ServicePropertySchema,
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
                            message: servicePropertyId
                                ? "Service property found successfully."
                                : "All Service property found successfully.",
                            data: servicePropertyId ? (_a = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _a === void 0 ? void 0 : _a[0] : getAllData,
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
    ServicePropertyController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var servicePropertyId, _a, title, description, updateServiceProperty, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        servicePropertyId = req.params.servicePropertyId;
                        _a = req.body, title = _a.title, description = _a.description;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.ServicePropertySchema.findByIdAndUpdate(servicePropertyId, {
                                title: title,
                                description: description,
                            }, {
                                new: true,
                                runValidators: true,
                            })];
                    case 1:
                        updateServiceProperty = _b.sent();
                        if (!updateServiceProperty)
                            throw new http_errors_1.NotFound("No data found for update.");
                        res.json({
                            success: {
                                message: "Service property updated successfully.",
                                data: updateServiceProperty,
                            },
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
    //
    ServicePropertyController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var servicePropertyId, deleteServiceProperty, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        servicePropertyId = req.params.servicePropertyId;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.ServicePropertySchema.findByIdAndDelete(servicePropertyId)];
                    case 1:
                        deleteServiceProperty = _a.sent();
                        //   delete device image
                        if (!deleteServiceProperty)
                            throw new http_errors_1.NotFound("Service property not found.");
                        res.json({
                            status: "SUCCESS",
                            message: "Service property deleted successfully",
                            data: deleteServiceProperty,
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
    return ServicePropertyController;
}());
exports.ServicePropertyControllerValidation = {
    create: [
        (0, express_validator_1.body)("title")
            .not()
            .isEmpty()
            .withMessage("title is required.")
            .isLength({ min: 3 })
            .withMessage("title must be at least 3 character.")
            .isLength({ max: 700 })
            .withMessage("title must be at most 700 characters long"),
        (0, express_validator_1.body)("description")
            .not()
            .isEmpty()
            .withMessage("description is required.")
            .isLength({ min: 3 })
            .withMessage("description must be at least 3 character.")
            .isLength({ max: 700 })
            .withMessage("description must be at most 700 characters long"),
        (0, express_validator_1.body)("type")
            .not()
            .isEmpty()
            .withMessage("type is required.")
            .custom(function (value, _a) {
            var req = _a.req;
            return ["boolean", "string"].some(function (item) { return item === value; });
        })
            .withMessage("type must be boolean or string."),
        (0, express_validator_1.body)("serviceId")
            .not()
            .isEmpty()
            .withMessage("serviceId is required.")
            .isMongoId()
            .withMessage("serviceId must be mongoesId."),
    ],
    getAll: [
        (0, express_validator_1.param)("service")
            .not()
            .isEmpty()
            .withMessage("serviceId is required.")
            .isMongoId()
            .withMessage("serviceId must be mongoesId."),
        (0, express_validator_1.query)("servicePropertyId")
            .optional()
            .exists()
            .isMongoId()
            .withMessage("servicePropertyId must be mongoesId."),
    ],
    update: [
        (0, express_validator_1.param)("servicePropertyId")
            .not()
            .isEmpty()
            .withMessage("servicePropertyId is required.")
            .isMongoId()
            .withMessage("servicePropertyId must be mongoose id."),
        (0, express_validator_1.body)("title")
            .not()
            .isEmpty()
            .withMessage("title is required.")
            .isLength({ min: 3 })
            .withMessage("title must be at least 3 character.")
            .isLength({ max: 700 })
            .withMessage("title must be at most 700 characters long"),
        (0, express_validator_1.body)("description")
            .not()
            .isEmpty()
            .withMessage("description is required.")
            .isLength({ min: 3 })
            .withMessage("description must be at least 3 character.")
            .isLength({ max: 700 })
            .withMessage("description must be at most 700 characters long"),
    ],
    delete: [
        (0, express_validator_1.param)("servicePropertyId")
            .not()
            .isEmpty()
            .withMessage("servicePropertyId is required.")
            .isMongoId()
            .withMessage("servicePropertyId must be mongoose id."),
    ],
};
exports.default = ServicePropertyController;
