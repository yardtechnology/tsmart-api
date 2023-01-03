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
exports.NotificationControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var media_logic_1 = __importDefault(require("../logic/media.logic"));
var notification_logics_1 = __importDefault(require("../logic/notification.logics"));
var models_1 = require("../models");
var NotificationController = /** @class */ (function () {
    function NotificationController() {
    }
    NotificationController.prototype.create = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var iconData, _b, userId, title, description, redirectLink, iconFile, filePath, _c, createNotification, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 6, , 7]);
                        (0, helper_1.fieldValidateError)(req);
                        _b = req.body, userId = _b.userId, title = _b.title, description = _b.description, redirectLink = _b.redirectLink;
                        iconFile = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.icon;
                        filePath = "Notification";
                        if (!(iconFile && !Array.isArray(iconFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, new media_logic_1.default().uploadMedia(iconFile, filePath)];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3:
                        iconData = _c;
                        return [4 /*yield*/, models_1.NotificationSchema.create({
                                title: title,
                                description: description,
                                user: userId,
                                icon: iconData === null || iconData === void 0 ? void 0 : iconData.url,
                                iconPATH: iconData === null || iconData === void 0 ? void 0 : iconData.path,
                                redirectLink: redirectLink,
                            })];
                    case 4:
                        createNotification = _d.sent();
                        if (!createNotification)
                            throw new http_errors_1.InternalServerError("Something went wrong, Notification is not created.");
                        return [4 /*yield*/, new notification_logics_1.default().pushNotification({
                                title: title,
                                body: description,
                                imageUrl: iconData === null || iconData === void 0 ? void 0 : iconData.url,
                                userIds: [userId],
                            })];
                    case 5:
                        _d.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Notification created successfully.",
                            data: createNotification,
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _d.sent();
                        if (iconData === null || iconData === void 0 ? void 0 : iconData.path) {
                            new media_logic_1.default().deleteMedia(iconData === null || iconData === void 0 ? void 0 : iconData.path);
                        }
                        next(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    NotificationController.prototype.update = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, notificationIds, allRead, user, notificationArrayCheck, queryData, updateNotification, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.body, notificationIds = _b.notificationIds, allRead = _b.allRead;
                        user = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a._id;
                        (0, helper_1.fieldValidateError)(req);
                        notificationArrayCheck = Array.isArray(notificationIds)
                            ? notificationIds
                            : [notificationIds];
                        queryData = allRead
                            ? {
                                user: user,
                                readStatus: { $ne: true },
                            }
                            : {
                                _id: { $in: notificationArrayCheck },
                                user: user,
                                readStatus: { $ne: true },
                            };
                        return [4 /*yield*/, models_1.NotificationSchema.updateMany(queryData, {
                                readStatus: true,
                            }, {
                                new: true,
                                runValidators: true,
                            })];
                    case 1:
                        updateNotification = _c.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Read notification successfully.",
                            // data: updateNotification,
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
    NotificationController.prototype.getAll = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, limit, chunk, notificationId, user, query_1, getAllData, error_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        _c = req.query, limit = _c.limit, chunk = _c.chunk, notificationId = _c.notificationId;
                        user = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a._id;
                        query_1 = {
                            user: user,
                        };
                        notificationId && (query_1["_id"] = notificationId);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.NotificationSchema,
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
                        getAllData = _d.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: notificationId
                                ? "Notification found successfully."
                                : "All notification found successfully.",
                            data: notificationId ? (_b = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _b === void 0 ? void 0 : _b[0] : getAllData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _d.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NotificationController.prototype.delete = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, notificationIds, all, idArrayCheck, user, query_2, notificationDelete, error_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.body, notificationIds = _b.notificationIds, all = _b.all;
                        (0, helper_1.fieldValidateError)(req);
                        idArrayCheck = Array.isArray(notificationIds)
                            ? notificationIds
                            : [notificationIds];
                        user = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a._id;
                        query_2 = all
                            ? {
                                user: user,
                            }
                            : {
                                user: user,
                                _id: { $in: idArrayCheck },
                            };
                        return [4 /*yield*/, models_1.NotificationSchema.deleteMany(query_2)];
                    case 1:
                        notificationDelete = _c.sent();
                        //   delete device image
                        if (!notificationDelete)
                            throw new http_errors_1.NotFound("No make found for delete.");
                        res.json({
                            status: "SUCCESS",
                            message: "Notification deleted successfully",
                            data: notificationDelete,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _c.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return NotificationController;
}());
exports.NotificationControllerValidation = {
    create: [
        (0, express_validator_1.body)("title").not().isEmpty().withMessage("title is required."),
        (0, express_validator_1.body)("description").not().isEmpty().withMessage("description is required."),
        (0, express_validator_1.body)("userId")
            .not()
            .isEmpty()
            .withMessage("userId is required.")
            .isMongoId()
            .withMessage("user id must be mongoose id."),
    ],
    update: [
        (0, express_validator_1.body)("notificationIds")
            .custom(function (value, _a) {
            var req = _a.req;
            return Boolean(value || req.body.allRead);
        })
            .withMessage("notificationIds or allRead is required."),
        (0, express_validator_1.body)("allRead")
            .optional()
            .exists()
            .isBoolean()
            .withMessage("allRead must be boolean.")
            .custom(function (value, _a) {
            var req = _a.req;
            return Boolean(value || req.body.allRead);
        })
            .withMessage("notificationIds or allRead is required."),
    ],
    getAll: [
        (0, express_validator_1.query)("notificationId")
            .optional()
            .isMongoId()
            .withMessage("notificationId must be mongoose id."),
    ],
    delete: [
        (0, express_validator_1.body)("notificationIds")
            .custom(function (value, _a) {
            var req = _a.req;
            return Boolean(value || req.body.all);
        })
            .withMessage("notificationIds or all field is required."),
        (0, express_validator_1.body)("all")
            .optional()
            .exists()
            .isBoolean()
            .withMessage("all must be boolean.")
            .custom(function (value, _a) {
            var req = _a.req;
            return Boolean(value || req.body.notificationIds);
        })
            .withMessage("notificationIds or all is required."),
    ],
};
exports.default = NotificationController;
