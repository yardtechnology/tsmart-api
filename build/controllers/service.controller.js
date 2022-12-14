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
var express_validator_1 = require("express-validator");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var media_logic_1 = __importDefault(require("../logic/media.logic"));
var service_model_1 = require("../models/service.model");
var Service = /** @class */ (function (_super) {
    __extends(Service, _super);
    function Service() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // finds validators for the user creation request
        _this.validateCreateServiceFields = [
            (0, express_validator_1.body)("title")
                .not()
                .isEmpty()
                .isLength({ min: 3 })
                .withMessage("Title must be at least 3 characters long")
                .isLength({ max: 20 })
                .withMessage("Title must be at most 20 characters long"),
            (0, express_validator_1.body)("description")
                .not()
                .isEmpty()
                .isLength({ min: 5 })
                .withMessage("Description must be at least 5 characters long")
                .isLength({ max: 101 })
                .withMessage("Description must be at most 101 characters long"),
        ];
        return _this;
    }
    // create service
    Service.prototype.createService = function (req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var imageFile, filePath, imageData, _e, serviceData, error_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 5, , 6]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        imageFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
                        filePath = "".concat((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b._id);
                        if (!(imageFile && !Array.isArray(imageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, imageFile, filePath)];
                    case 1:
                        _e = _f.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _e = undefined;
                        _f.label = 3;
                    case 3:
                        imageData = _e;
                        return [4 /*yield*/, new service_model_1.ServiceModel({
                                title: (_c = req.body) === null || _c === void 0 ? void 0 : _c.title,
                                description: (_d = req.body) === null || _d === void 0 ? void 0 : _d.description,
                                image: imageData === null || imageData === void 0 ? void 0 : imageData.url,
                                imagePath: imageData === null || imageData === void 0 ? void 0 : imageData.path,
                            }).save()];
                    case 4:
                        serviceData = _f.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Service added successfully",
                            data: serviceData,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _f.sent();
                        // send error to client
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // update service
    Service.prototype.updateService = function (req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var errors, imageFile, filePath, imageData, _e, serviceData, error_2;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 5, , 6]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        imageFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
                        filePath = "".concat((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b._id);
                        if (!(imageFile && !Array.isArray(imageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, imageFile, filePath)];
                    case 1:
                        _e = _f.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _e = undefined;
                        _f.label = 3;
                    case 3:
                        imageData = _e;
                        return [4 /*yield*/, service_model_1.ServiceModel.findByIdAndUpdate(req.params.serviceId, {
                                title: (_c = req.body) === null || _c === void 0 ? void 0 : _c.title,
                                description: (_d = req.body) === null || _d === void 0 ? void 0 : _d.description,
                                image: imageData === null || imageData === void 0 ? void 0 : imageData.url,
                                imagePath: imageData === null || imageData === void 0 ? void 0 : imageData.path,
                            })];
                    case 4:
                        serviceData = _f.sent();
                        if (!serviceData)
                            throw new Error("Service not found");
                        // delete previous service image
                        (imageData === null || imageData === void 0 ? void 0 : imageData.path) &&
                            (serviceData === null || serviceData === void 0 ? void 0 : serviceData.imagePATH) &&
                            _super.prototype.deleteMedia.call(this, serviceData === null || serviceData === void 0 ? void 0 : serviceData.imagePATH);
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Service updated successfully",
                            data: serviceData,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _f.sent();
                        // send error to client
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // get service
    Service.prototype.getService = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, service_model_1.ServiceModel.findById(req.params.serviceId).select("-imagePath")];
                    case 1:
                        serviceData = _a.sent();
                        if (!serviceData)
                            throw new Error("Service not found");
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Service found successfully",
                            data: serviceData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        // send error to client
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //   get all service
    Service.prototype.getAllService = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: service_model_1.ServiceModel,
                                query: {},
                                select: "-imagePATH",
                                sort: { createdAt: -1 },
                                limit: req.query.limit ? Number(req.query.limit) : undefined,
                                chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
                            })];
                    case 1:
                        serviceData = _a.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "All service found successfully",
                            data: serviceData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        // send error to client
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get service
    Service.prototype.deleteService = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceData, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, service_model_1.ServiceModel.findByIdAndDelete(req.params.serviceId)];
                    case 1:
                        serviceData = _a.sent();
                        if (!serviceData)
                            throw new Error("Service not found");
                        // delete previous service image
                        (serviceData === null || serviceData === void 0 ? void 0 : serviceData.imagePATH) && _super.prototype.deleteMedia.call(this, serviceData === null || serviceData === void 0 ? void 0 : serviceData.imagePATH);
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Service deleted successfully",
                            data: serviceData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        // send error to client
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Service;
}(media_logic_1.default));
exports.default = Service;
