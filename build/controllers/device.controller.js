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
exports.DeviceControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var media_logic_1 = __importDefault(require("../logic/media.logic"));
var models_1 = require("../models");
var DeviceController = /** @class */ (function () {
    function DeviceController() {
    }
    DeviceController.prototype.createAndUpdate = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var imageData, _b, title, types, imageFile, filePath, typesArrayCheck, _c, createDevice, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, , 6]);
                        (0, helper_1.fieldValidateError)(req);
                        _b = req.body, title = _b.title, types = _b.types;
                        imageFile = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.image;
                        filePath = "Device";
                        typesArrayCheck = types
                            ? Array.isArray(types)
                                ? types
                                : [types]
                            : [];
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
                        return [4 /*yield*/, models_1.DevicesSchema.findOneAndUpdate({
                                title: title,
                            }, {
                                image: (imageData === null || imageData === void 0 ? void 0 : imageData.url) || undefined,
                                imagePATH: (imageData === null || imageData === void 0 ? void 0 : imageData.path) || undefined,
                                type: typesArrayCheck,
                                // $addToSet: typesArrayCheck?.length
                                //   ? { type: { $each: typesArrayCheck } }
                                //   : {},
                            }, {
                                new: true,
                                runValidators: true,
                                upsert: true,
                            })];
                    case 4:
                        createDevice = _d.sent();
                        if (!createDevice)
                            throw new http_errors_1.NotFound("You are already added on ".concat(typesArrayCheck === null || typesArrayCheck === void 0 ? void 0 : typesArrayCheck.join(","), ", You can not add again here."));
                        res.json({
                            status: "SUCCESS",
                            message: "Device created successfully.",
                            data: createDevice,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _d.sent();
                        if (imageData === null || imageData === void 0 ? void 0 : imageData.path)
                            new media_logic_1.default().deleteMedia(imageData === null || imageData === void 0 ? void 0 : imageData.path);
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DeviceController.prototype.removeServiceType = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var deviceId, types, typesArrayCheck, removeDeviceType, deleteDevice, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        deviceId = req.params.deviceId;
                        types = req.body.types;
                        (0, helper_1.fieldValidateError)(req);
                        typesArrayCheck = types
                            ? Array.isArray(types)
                                ? types
                                : [types]
                            : [];
                        return [4 /*yield*/, models_1.DevicesSchema.findOneAndUpdate({ _id: deviceId, type: { $in: typesArrayCheck } }, {
                                $pull: {
                                    type: { $in: typesArrayCheck },
                                },
                            }, {
                                new: true,
                                runValidators: true,
                            })];
                    case 1:
                        removeDeviceType = _b.sent();
                        if (!removeDeviceType)
                            throw new http_errors_1.NotFound("No data found for remove type");
                        if (!!((_a = removeDeviceType === null || removeDeviceType === void 0 ? void 0 : removeDeviceType.type) === null || _a === void 0 ? void 0 : _a.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, models_1.DevicesSchema.findByIdAndDelete(deviceId)];
                    case 2:
                        deleteDevice = _b.sent();
                        _b.label = 3;
                    case 3:
                        res.json({
                            status: "SUCCESS",
                            message: "Remove type successfully.",
                            data: removeDeviceType,
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
    DeviceController.prototype.getAll = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, limit, chunk, deviceId, type, query_1, getAllData, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.query, limit = _b.limit, chunk = _b.chunk, deviceId = _b.deviceId, type = _b.type;
                        query_1 = {};
                        deviceId && (query_1["_id"] = deviceId);
                        type && (query_1["type"] = type);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.DevicesSchema,
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
                            message: deviceId
                                ? "Device found successfully"
                                : "All devices found successfully.s",
                            data: deviceId ? (_a = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _a === void 0 ? void 0 : _a[0] : getAllData,
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
    DeviceController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var deviceId, deleteDevice, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        deviceId = req.params.deviceId;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.DevicesSchema.findByIdAndDelete(deviceId)];
                    case 1:
                        deleteDevice = _a.sent();
                        if (!deleteDevice)
                            throw new Error("Device not found for delete.");
                        res.json({
                            status: "SUCCESS",
                            message: "Device deleted successfully",
                            data: deleteDevice,
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
    return DeviceController;
}());
exports.DeviceControllerValidation = {
    createAndUpdate: [
        (0, express_validator_1.body)("title")
            .not()
            .isEmpty()
            .withMessage("title is required.")
            .toUpperCase()
            .trim(),
        (0, express_validator_1.body)("types.*")
            .optional()
            .exists()
            .toUpperCase()
            .custom(function (value) {
            return Boolean(!value.length || ["SERVICE", "SELL"].includes(value));
        })
            .withMessage("types most be array which content SERVICE or SELL both."),
    ],
    removeServiceType: [
        (0, express_validator_1.param)("deviceId")
            .not()
            .isEmpty()
            .withMessage("deviceId is required.")
            .isMongoId()
            .withMessage("deviceId most be mongoose id"),
        (0, express_validator_1.body)("type.*")
            .not()
            .isEmpty()
            .withMessage("type must be required.")
            .exists()
            .custom(function (value) { var _a; return Boolean(["SERVICE", "SELL"].includes((_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.toUpperCase())); })
            .withMessage("type most be SERVICE or SELL or both."),
    ],
    getAll: [
        (0, express_validator_1.query)("deviceId")
            .optional()
            .exists()
            .isMongoId()
            .withMessage("deviceId most be mongoose id."),
        (0, express_validator_1.query)("type")
            .optional()
            .exists()
            .custom(function (value) { var _a; return Boolean(["SERVICE", "SELL"].includes((_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.toUpperCase())); })
            .withMessage("type most be SERVICE or SELL."),
    ],
    delete: [
        (0, express_validator_1.param)("deviceId")
            .not()
            .isEmpty()
            .withMessage("deviceId is required.")
            .isMongoId()
            .withMessage("deviceId most be mongoose id"),
    ],
};
exports.default = DeviceController;
