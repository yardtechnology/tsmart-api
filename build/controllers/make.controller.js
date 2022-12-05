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
exports.MakeControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var media_logic_1 = __importDefault(require("../logic/media.logic"));
var models_1 = require("../models");
var MakeController = /** @class */ (function () {
    function MakeController() {
    }
    MakeController.prototype.createAndUpdate = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var imageData, _b, title, deviceId, types, imageFile, filePath, typesArrayCheck, _c, pushDataObject, createDevice, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, , 6]);
                        (0, helper_1.fieldValidateError)(req);
                        _b = req.body, title = _b.title, deviceId = _b.deviceId, types = _b.types;
                        imageFile = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.image;
                        filePath = "Make";
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
                        pushDataObject = {};
                        // types && (pushDataObject.type = { $each: typesArrayCheck });
                        deviceId && (pushDataObject.devices = deviceId);
                        return [4 /*yield*/, models_1.MakeSchema.findOneAndUpdate({
                                title: title,
                            }, {
                                image: imageData === null || imageData === void 0 ? void 0 : imageData.url,
                                imagePATH: imageData === null || imageData === void 0 ? void 0 : imageData.path,
                                type: typesArrayCheck,
                                $addToSet: pushDataObject,
                            }, { new: true, runValidators: true, upsert: true })];
                    case 4:
                        createDevice = _d.sent();
                        if (!createDevice)
                            throw new http_errors_1.NotFound("You are already added on ".concat(types.join(","), ", You can not add again here."));
                        res.json({
                            status: "SUCCESS",
                            message: "Make created successfully.",
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
    MakeController.prototype.removeServiceType = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var makeId, types, typesArrayCheck, removeServiceType, deleteMake, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        makeId = req.params.makeId;
                        types = req.body.types;
                        (0, helper_1.fieldValidateError)(req);
                        typesArrayCheck = types
                            ? Array.isArray(types)
                                ? types
                                : [types]
                            : [];
                        return [4 /*yield*/, models_1.MakeSchema.findOneAndUpdate({ _id: makeId, type: { $in: typesArrayCheck } }, {
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
                        return [4 /*yield*/, models_1.MakeSchema.findByIdAndDelete(makeId)];
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
    MakeController.prototype.getAll = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, limit, chunk, makeId, type, deviceIds, searchTitle, excludeMakeDeviceId, deviceIdArrayCheck, query_1, getAllData, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.query, limit = _b.limit, chunk = _b.chunk, makeId = _b.makeId, type = _b.type, deviceIds = _b.deviceIds, searchTitle = _b.searchTitle, excludeMakeDeviceId = _b.excludeMakeDeviceId;
                        deviceIdArrayCheck = deviceIds
                            ? Array.isArray(deviceIds)
                                ? deviceIds
                                : [deviceIds]
                            : undefined;
                        (0, helper_1.fieldValidateError)(req);
                        query_1 = {};
                        makeId && (query_1["_id"] = makeId);
                        type && (query_1["type"] = type);
                        deviceIdArrayCheck && (query_1["devices"] = { $in: deviceIdArrayCheck });
                        excludeMakeDeviceId && (query_1["devices"] = { $ne: excludeMakeDeviceId });
                        // const deviceMake = excludeMakeDeviceId
                        //   ? await MakeSchema.find(excludeMakeDeviceId)
                        //   : undefined;
                        if (searchTitle)
                            query_1["$or"] = [{ title: { $regex: searchTitle, $options: "i" } }];
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.MakeSchema,
                                query: query_1,
                                chunk: chunk ? Number(chunk) : undefined,
                                limit: limit ? Number(limit) : undefined,
                                select: "",
                                populate: [
                                    {
                                        path: "devices",
                                        select: "-imagePATH",
                                    },
                                ],
                                sort: {
                                    createdAt: -1,
                                },
                            })];
                    case 1:
                        getAllData = _c.sent();
                        res.json({
                            status: "SUCCESS",
                            message: makeId
                                ? "make found successfully."
                                : "All make found successfully.",
                            data: makeId ? (_a = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _a === void 0 ? void 0 : _a[0] : getAllData,
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
    MakeController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var makeId, deleteMake, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        makeId = req.params.makeId;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.MakeSchema.findByIdAndDelete(makeId)];
                    case 1:
                        deleteMake = _a.sent();
                        if (!deleteMake)
                            throw new Error("Make not found for delete.");
                        res.json({
                            status: "SUCCESS",
                            message: "Make deleted successfully",
                            data: deleteMake,
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
    MakeController.prototype.updateTypeAndDevice = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var makeId, _a, deviceId, types, updateQuery, updateMake, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        makeId = req.params.makeId;
                        _a = req.body, deviceId = _a.deviceId, types = _a.types;
                        (0, helper_1.fieldValidateError)(req);
                        updateQuery = {};
                        deviceId &&
                            (updateQuery["$addToSet"] = {
                                devices: deviceId,
                            });
                        types && (updateQuery["type"] = types);
                        return [4 /*yield*/, models_1.MakeSchema.findByIdAndUpdate(makeId, __assign({}, updateQuery), {
                                new: true,
                                runValidators: true,
                            })];
                    case 1:
                        updateMake = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Make updated successfully",
                            data: updateMake,
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
    return MakeController;
}());
exports.MakeControllerValidation = {
    createAndUpdate: [
        (0, express_validator_1.body)("title")
            .not()
            .isEmpty()
            .withMessage("title is required.")
            .trim()
            .toUpperCase(),
        (0, express_validator_1.body)("deviceId")
            .optional()
            .exists()
            .isMongoId()
            .withMessage("deviceId most be mongoose id."),
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
        (0, express_validator_1.param)("makeId")
            .not()
            .isEmpty()
            .withMessage("makeId is required.")
            .isMongoId()
            .withMessage("makeId most be mongoose id"),
        (0, express_validator_1.body)("type.*")
            .not()
            .isEmpty()
            .withMessage("type must be required.")
            .exists()
            .toUpperCase()
            .custom(function (value) { var _a; return Boolean(["SERVICE", "SELL"].includes((_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.toUpperCase())); })
            .withMessage("serviceType most be SERVICE or SELL or both."),
    ],
    getAll: [
        (0, express_validator_1.query)("makeId")
            .optional()
            .isMongoId()
            .withMessage("makeId most be mongoose id"),
        (0, express_validator_1.query)("deviceIds.*")
            .optional()
            .isMongoId()
            .withMessage("deviceIds must be mongoes id"),
        (0, express_validator_1.query)("deviceIds")
            .optional()
            .isMongoId()
            .withMessage("deviceIds must be mongoes id"),
        (0, express_validator_1.query)("searchTitle")
            .optional()
            .isString()
            .toUpperCase()
            .withMessage("searchTitle must be a string"),
        (0, express_validator_1.query)("type")
            .optional()
            .exists()
            .custom(function (value) { var _a; return Boolean(["SERVICE", "SELL"].includes((_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.toUpperCase())); })
            .withMessage("serviceType most be SERVICE or SELL."),
    ],
    delete: [
        (0, express_validator_1.param)("makeId")
            .not()
            .isEmpty()
            .withMessage("makeId is required.")
            .isMongoId()
            .withMessage("makeId most be mongoose id"),
    ],
    updateTypeAndDevice: [
        (0, express_validator_1.param)("makeId")
            .not()
            .isEmpty()
            .withMessage("makeId is required.")
            .isMongoId()
            .withMessage("makeId most be mongoose id"),
        (0, express_validator_1.body)("deviceId")
            .not()
            .isEmpty()
            .withMessage("deviceId is required.")
            .isMongoId()
            .withMessage("deviceId most be mongoose id"),
        (0, express_validator_1.body)("type.*")
            .optional()
            .exists()
            .toUpperCase()
            .custom(function (value) { var _a; return Boolean(["SERVICE", "SELL"].includes((_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.toUpperCase())); })
            .withMessage("serviceType most be SERVICE or SELL or both."),
    ],
};
exports.default = MakeController;
