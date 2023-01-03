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
exports.ServicePropertyValueControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var models_1 = require("../models");
var ServicePropertyValueController = /** @class */ (function () {
    function ServicePropertyValueController() {
    }
    ServicePropertyValueController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var allServices, createServicePropertyValue, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        allServices = req.body.allServices;
                        return [4 /*yield*/, models_1.ServicePropertyValueSchema.insertMany(allServices)];
                    case 1:
                        createServicePropertyValue = _a.sent();
                        if (!createServicePropertyValue)
                            throw new http_errors_1.InternalServerError("Something went wrong, Service property value is not created.");
                        res.json({
                            status: "SUCCESS",
                            message: "Service property value is created successfully.",
                            data: createServicePropertyValue,
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
    ServicePropertyValueController.prototype.getAllAccordingServicePrice = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, limit, chunk, servicePropertyValueId, _c, servicePrice, serviceProperty, query_1, getAllData, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _b = req.query, limit = _b.limit, chunk = _b.chunk, servicePropertyValueId = _b.servicePropertyValueId;
                        _c = req.params, servicePrice = _c.servicePrice, serviceProperty = _c.serviceProperty;
                        (0, helper_1.fieldValidateError)(req);
                        query_1 = { servicePrice: servicePrice, serviceProperty: serviceProperty };
                        servicePropertyValueId && (query_1["_id"] = servicePropertyValueId);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.ServicePropertyValueSchema,
                                query: query_1,
                                chunk: chunk ? Number(chunk) : undefined,
                                limit: limit ? Number(limit) : undefined,
                                select: "",
                                populate: [
                                    {
                                        path: "serviceProperty",
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
                            message: servicePropertyValueId
                                ? "Service property value found successfully."
                                : "All Service property value found successfully.",
                            data: servicePropertyValueId ? (_a = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _a === void 0 ? void 0 : _a[0] : getAllData,
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
    ServicePropertyValueController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var servicePropertyValueId, value, updateServicePropertyValue, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        servicePropertyValueId = req.params.servicePropertyValueId;
                        value = req.body.value;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.ServicePropertyValueSchema.findByIdAndUpdate(servicePropertyValueId, {
                                value: value,
                            }, {
                                new: true,
                                runValidators: true,
                            })];
                    case 1:
                        updateServicePropertyValue = _a.sent();
                        if (!updateServicePropertyValue)
                            throw new http_errors_1.NotFound("No data found for update.");
                        res.json({
                            success: {
                                message: "Service property value updated successfully.",
                                data: updateServicePropertyValue,
                            },
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
    //
    ServicePropertyValueController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var servicePropertyValueId, deleteServicePropertyValue, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        servicePropertyValueId = req.params.servicePropertyValueId;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.ServicePropertyValueSchema.findByIdAndDelete(servicePropertyValueId)];
                    case 1:
                        deleteServicePropertyValue = _a.sent();
                        //   delete device image
                        if (!deleteServicePropertyValue)
                            throw new http_errors_1.NotFound("Service property value not found.");
                        res.json({
                            status: "SUCCESS",
                            message: "Service property value deleted successfully",
                            data: deleteServicePropertyValue,
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
    ServicePropertyValueController.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, serviceId, chunk, limit, modelId, query_2, allServiceProperty, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, serviceId = _a.serviceId, chunk = _a.chunk, limit = _a.limit, modelId = _a.modelId;
                        query_2 = {};
                        serviceId && (query_2["service"] = serviceId);
                        modelId && (query_2["service"] = modelId);
                        return [4 /*yield*/, models_1.ServicePropertyValueSchema.aggregate([
                                {
                                    $group: {
                                        _id: {
                                            model: "$model",
                                            serviceProperty: "$serviceProperty",
                                        },
                                        serviceProperty: { $first: "$serviceProperty" },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "serviceproperties",
                                        localField: "serviceProperty",
                                        foreignField: "_id",
                                        as: "serviceProperty",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$serviceProperty",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                            ])];
                    case 1:
                        allServiceProperty = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Service property found successfully",
                            data: allServiceProperty,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _b.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ServicePropertyValueController;
}());
exports.ServicePropertyValueControllerValidation = {
    create: [
        (0, express_validator_1.body)("allServices.*.value")
            .not()
            .isEmpty()
            .withMessage("value is required.")
            .isLength({ min: 3 })
            .withMessage("value must be at least 3 character.")
            .isLength({ max: 700 })
            .withMessage("value must be at most 700 characters long"),
        (0, express_validator_1.body)("allServices.*.servicePrice")
            .not()
            .isEmpty()
            .withMessage("servicePrice is required.")
            .isMongoId()
            .withMessage("servicePrice must be mongoose Id."),
        (0, express_validator_1.body)("allServices.*.serviceProperty")
            .not()
            .isEmpty()
            .withMessage("serviceProperty is required.")
            .isMongoId()
            .withMessage("serviceProperty must be mongoesId."),
        (0, express_validator_1.body)("allServices.*.model")
            .not()
            .isEmpty()
            .withMessage("model is required.")
            .isMongoId()
            .withMessage("model must be mongoesId."),
    ],
    getAllAccordingServicePrice: [
        (0, express_validator_1.param)("servicePrice")
            .not()
            .isEmpty()
            .withMessage("servicePrice is required.")
            .isMongoId()
            .withMessage("servicePrice must be mongoesId."),
        (0, express_validator_1.param)("serviceProperty")
            .not()
            .isEmpty()
            .withMessage("servicePropertyId is required.")
            .exists()
            .isMongoId()
            .withMessage("servicePropertyId must be mongoesId."),
        (0, express_validator_1.query)("servicePropertyValueId")
            .optional()
            .exists()
            .isMongoId()
            .withMessage("servicePropertyValueId must be mongoose id."),
    ],
    update: [
        (0, express_validator_1.param)("servicePropertyValueId")
            .not()
            .isEmpty()
            .withMessage("servicePropertyValueId is required.")
            .isMongoId()
            .withMessage("servicePropertyValueId must be mongoose id."),
        (0, express_validator_1.body)("value")
            .not()
            .isEmpty()
            .withMessage("value is required.")
            .isLength({ min: 3 })
            .withMessage("value must be at least 3 character.")
            .isLength({ max: 700 })
            .withMessage("value must be at most 700 characters long"),
    ],
    delete: [
        (0, express_validator_1.param)("servicePropertyValueId")
            .not()
            .isEmpty()
            .withMessage("servicePropertyValueId is required.")
            .isMongoId()
            .withMessage("servicePropertyValueId must be mongoose id."),
    ],
    getAll: [
        (0, express_validator_1.query)("serviceId")
            .optional()
            .isMongoId()
            .withMessage("serviceId must be mongoes id."),
    ],
};
exports.default = ServicePropertyValueController;
