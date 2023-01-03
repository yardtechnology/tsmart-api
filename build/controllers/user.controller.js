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
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var core_helper_1 = require("../helper/core.helper");
var cart_logic_1 = __importDefault(require("../logic/cart.logic"));
var jwt_logic_1 = __importDefault(require("../logic/jwt.logic"));
var media_logic_1 = __importDefault(require("../logic/media.logic"));
var notification_logics_1 = __importDefault(require("../logic/notification.logics"));
var user_logic_1 = __importDefault(require("../logic/user.logic"));
var models_1 = require("../models");
var user_model_1 = require("../models/user.model");
var onlineRecord_model_1 = require("./../models/onlineRecord.model");
var mail_controller_1 = __importDefault(require("./mail.controller"));
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // field validators for the user creation request
        _this.validateUpdateUserFields = [
            (0, express_validator_1.body)("displayName")
                .optional()
                .isLength({ min: 3 })
                .withMessage("Display name must be at least 3 characters long")
                .isLength({ max: 20 })
                .withMessage("Display name must be at most 20 characters long"),
            (0, express_validator_1.body)("email").optional().isEmail().withMessage("Invalid email"),
            (0, express_validator_1.body)("password")
                .optional()
                .isLength({ min: 6 })
                .withMessage("Password must be at least 6 characters long"),
            (0, express_validator_1.body)("gender")
                .optional()
                .custom(function (value) {
                if (!["MALE", "FEMALE", "OTHER"].includes(value)) {
                    return false;
                }
                return true;
            })
                .withMessage("Gender can only be MALE FEMALE and OTHER"),
            (0, express_validator_1.body)("phoneNumber")
                .optional()
                .isInt()
                .isLength({ min: 8 })
                .withMessage("phone number must be grater then 8 digit"),
        ];
        //field validation for change block status
        _this.validateChangeBlockStatusFields = [
            (0, express_validator_1.body)("blockStatus")
                .not()
                .isEmpty()
                .withMessage("Block status is required")
                .custom(function (value) {
                if (!["BLOCKED", "UNBLOCKED"].includes(value)) {
                    return false;
                }
                return true;
            })
                .withMessage("Block status can only be BLOCKED and UNBLOCKED"),
        ];
        //status change validation
        _this.validateStatusChangeFields = [
            (0, express_validator_1.body)("status")
                .not()
                .isEmpty()
                .withMessage("Status is required")
                .custom(function (value) {
                if (!["INACTIVE", "ACTIVE", "PENDING", "VERIFIED", "REJECTED"].includes(value)) {
                    return false;
                }
                return true;
            })
                .withMessage("Status can only be INACTIVE , ACTIVE , PENDING and VERIFIED"),
        ];
        return _this;
    }
    // create user
    User.prototype.updateUserInfo = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
        return __awaiter(this, void 0, void 0, function () {
            var errors, avatarFile, filePath, avatarData, _3, _4, displayName, gender, phoneNumber, email, faceVideoFile, faceVideoData, _5, documentFile, documentData, _6, updatedUser, deviceMakeType, secret, error_1;
            return __generator(this, function (_7) {
                switch (_7.label) {
                    case 0:
                        _7.trys.push([0, 14, , 15]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        avatarFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.avatar;
                        filePath = "".concat((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b._id);
                        if (!(avatarFile && !Array.isArray(avatarFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, avatarFile, filePath)];
                    case 1:
                        _3 = _7.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _3 = undefined;
                        _7.label = 3;
                    case 3:
                        avatarData = _3;
                        _4 = req.body, displayName = _4.displayName, gender = _4.gender, phoneNumber = _4.phoneNumber, email = _4.email;
                        faceVideoFile = (_c = req.files) === null || _c === void 0 ? void 0 : _c.faceVideo;
                        if (!(faceVideoFile && !Array.isArray(faceVideoFile))) return [3 /*break*/, 5];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, faceVideoFile, filePath)];
                    case 4:
                        _5 = _7.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _5 = undefined;
                        _7.label = 6;
                    case 6:
                        faceVideoData = _5;
                        documentFile = (_d = req.files) === null || _d === void 0 ? void 0 : _d.document;
                        if (!(documentFile && !Array.isArray(documentFile))) return [3 /*break*/, 8];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, documentFile, filePath)];
                    case 7:
                        _6 = _7.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        _6 = undefined;
                        _7.label = 9;
                    case 9:
                        documentData = _6;
                        return [4 /*yield*/, user_model_1.UserModel.findById((_e = req === null || req === void 0 ? void 0 : req.currentUser) === null || _e === void 0 ? void 0 : _e._id)];
                    case 10:
                        updatedUser = _7.sent();
                        if (!updatedUser)
                            throw new Error("User not found");
                        deviceMakeType = {
                            deviceType: (_f = req.body) === null || _f === void 0 ? void 0 : _f.deviceType,
                            makeType: (_g = req.body) === null || _g === void 0 ? void 0 : _g.makeType,
                        };
                        !((_h = req.body) === null || _h === void 0 ? void 0 : _h.deviceType) && (deviceMakeType === null || deviceMakeType === void 0 ? true : delete deviceMakeType.deviceType);
                        !((_j = req.body) === null || _j === void 0 ? void 0 : _j.makeType) && (deviceMakeType === null || deviceMakeType === void 0 ? true : delete deviceMakeType.makeType);
                        return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate((_k = req.currentUser) === null || _k === void 0 ? void 0 : _k._id, {
                                displayName: displayName,
                                gender: gender,
                                phoneNumber: phoneNumber,
                                email: email,
                                avatar: avatarData === null || avatarData === void 0 ? void 0 : avatarData.url,
                                avatarPath: avatarData === null || avatarData === void 0 ? void 0 : avatarData.path,
                                "fcmTokens.android": ((_l = req.body) === null || _l === void 0 ? void 0 : _l.fcmTokenAndroid) || ((_o = (_m = req.body) === null || _m === void 0 ? void 0 : _m.fcmTokens) === null || _o === void 0 ? void 0 : _o.android),
                                "fcmTokens.ios": ((_p = req.body) === null || _p === void 0 ? void 0 : _p.fcmTokenIos) || ((_r = (_q = req.body) === null || _q === void 0 ? void 0 : _q.fcmTokens) === null || _r === void 0 ? void 0 : _r.ios),
                                "fcmTokens.web": ((_s = req.body) === null || _s === void 0 ? void 0 : _s.fcmTokenWeb) || ((_u = (_t = req.body) === null || _t === void 0 ? void 0 : _t.fcmTokens) === null || _u === void 0 ? void 0 : _u.web),
                                isOnline: (_v = req === null || req === void 0 ? void 0 : req.body) === null || _v === void 0 ? void 0 : _v.isOnline,
                                faceVideo: faceVideoData === null || faceVideoData === void 0 ? void 0 : faceVideoData.url,
                                faceVideoPATH: faceVideoData === null || faceVideoData === void 0 ? void 0 : faceVideoData.path,
                                latitude: (_w = req.body) === null || _w === void 0 ? void 0 : _w.latitude,
                                longitude: (_x = req.body) === null || _x === void 0 ? void 0 : _x.longitude,
                                location: (_y = req.body) === null || _y === void 0 ? void 0 : _y.location,
                                $addToSet: deviceMakeType,
                                isAcademicCourses: (_z = req.body) === null || _z === void 0 ? void 0 : _z.isAcademicCourses,
                                experience: (_0 = req.body) === null || _0 === void 0 ? void 0 : _0.experience,
                                age: (_1 = req.body) === null || _1 === void 0 ? void 0 : _1.age,
                                status: email
                                    ? (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email) === email
                                        ? undefined
                                        : "INACTIVE"
                                    : undefined,
                                documentType: (_2 = req.body) === null || _2 === void 0 ? void 0 : _2.documentType,
                                document: documentData === null || documentData === void 0 ? void 0 : documentData.url,
                                documentPATH: documentData === null || documentData === void 0 ? void 0 : documentData.path,
                            })];
                    case 11:
                        // save user data to database
                        updatedUser = _7.sent();
                        // delete previous avatar
                        (avatarData === null || avatarData === void 0 ? void 0 : avatarData.path) &&
                            (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.avatarPath) &&
                            _super.prototype.deleteMedia.call(this, updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.avatarPath);
                        // delete previous face video
                        (faceVideoData === null || faceVideoData === void 0 ? void 0 : faceVideoData.path) &&
                            (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.faceVideoPATH) &&
                            _super.prototype.deleteMedia.call(this, updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.faceVideoPATH);
                        if (!updatedUser)
                            throw new Error("User not found");
                        if (!(email && !((updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email) === email))) return [3 /*break*/, 13];
                        return [4 /*yield*/, new jwt_logic_1.default().getAccessToken({
                                _id: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser._id,
                                email: email,
                                role: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.role,
                            }, "1d")];
                    case 12:
                        secret = _7.sent();
                        // send mail for email verification
                        new mail_controller_1.default().sendHtmlMail({
                            to: email,
                            templet: "normal",
                            subject: "Email Verification",
                            html: "<h1>Email Verification</h1>\n        <p>\n          Please click on the link below to verify your email:\n          </p>\n          <a href=\"".concat(process.env.API_END_POINT, "/auth/verify-email/").concat(secret, "\">\n            Verify Email\n            </a>"),
                        });
                        _7.label = 13;
                    case 13:
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "User updated successfully",
                            data: {
                                _id: updatedUser._id,
                                displayName: updatedUser.displayName,
                                email: updatedUser.email,
                                gender: updatedUser.gender,
                                phoneNumber: updatedUser.phoneNumber,
                                avatar: updatedUser.avatar,
                            },
                        });
                        return [3 /*break*/, 15];
                    case 14:
                        error_1 = _7.sent();
                        // send error to client
                        next(error_1);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    // get my account
    User.prototype.getMyAccount = function (req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var errors, userData, cartCount, unreadNotification, error_2, error_3;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 7, , 8]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        return [4 /*yield*/, user_model_1.UserModel.findById((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id)
                                .populate("store")
                                .select("-encrypted_password -salt -verificationInfo -refreshTokens")];
                    case 1:
                        userData = _e.sent();
                        if (!userData)
                            throw new Error("User not found");
                        //if user is blocked
                        if ((userData === null || userData === void 0 ? void 0 : userData.blockStatus) === "BLOCKED")
                            throw new http_errors_1.Unauthorized("User is blocked");
                        cartCount = void 0;
                        unreadNotification = void 0;
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, new cart_logic_1.default().getCartItems(userData._id)];
                    case 3:
                        //TODO: ADD DYNAMIC CART COUNT
                        cartCount =
                            ((_b = (_e.sent())) === null || _b === void 0 ? void 0 : _b.totalItem) || 0;
                        return [4 /*yield*/, models_1.NotificationSchema.find({
                                user: (_c = req === null || req === void 0 ? void 0 : req.currentUser) === null || _c === void 0 ? void 0 : _c._id,
                                readStatus: false,
                            })];
                    case 4:
                        unreadNotification = (_d = (_e.sent())) === null || _d === void 0 ? void 0 : _d.length;
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _e.sent();
                        cartCount = 0;
                        unreadNotification = 0;
                        return [3 /*break*/, 6];
                    case 6:
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "User found successfully",
                            data: __assign(__assign({}, userData === null || userData === void 0 ? void 0 : userData._doc), { cartCount: cartCount, unreadNotification: unreadNotification }),
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        error_3 = _e.sent();
                        // send error to client
                        next(error_3);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    //get all user
    User.prototype.getAllUser = function (req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var errors, data;
            return __generator(this, function (_e) {
                try {
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        throw new http_errors_1.NotAcceptable(errors
                            .array()
                            .map(function (errors) { return errors.msg; })
                            .join()
                            .replace(/[,]/g, " and "));
                    }
                    data = new user_logic_1.default().getAllUsers({
                        chunk: ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.chunk) ? Number(req.query.limit) : undefined,
                        limit: ((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.limit) ? Number(req.query.chunk) : undefined,
                        role: (_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.role,
                        status: (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.status,
                    });
                    // send response to client
                    res.status(200).json({
                        status: "SUCCESS",
                        message: "Users found successfully",
                        data: data,
                    });
                }
                catch (error) {
                    // send error to client
                    next(error);
                }
                return [2 /*return*/];
            });
        });
    };
    // create store manager
    User.prototype.createStoreManager = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var errors, managerData, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        return [4 /*yield*/, new user_logic_1.default().createStoreManager(req.body)];
                    case 1:
                        managerData = _b.sent();
                        new mail_controller_1.default().sendMail({
                            to: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.email,
                            subject: "Store Manager Created",
                            text: "\n        Email : ".concat(req.body.email, "\n        Password : ").concat(req.body.password, "\n        "),
                        });
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Store manager created successfully",
                            data: managerData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        // send error to client
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //TODO: DELETE USER AND CORRESPONDING DATA
    //change user block status
    User.prototype.changeUserBlockStatus = function (req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var errors, userData, error_5;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 2, , 3]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        return [4 /*yield*/, new user_logic_1.default().changeBlockStatus(req.params.userId, req.body.blockStatus)];
                    case 1:
                        userData = _e.sent();
                        new mail_controller_1.default().sendHtmlMail({
                            to: userData.email,
                            subject: "Your account has been ".concat((_b = (_a = req.body.blockStatus) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.toLowerCase()),
                            templet: "normal",
                            html: "\n        <div>\n          <h1>Your account has been ".concat((_d = (_c = req.body.blockStatus) === null || _c === void 0 ? void 0 : _c.toString()) === null || _d === void 0 ? void 0 : _d.toLowerCase(), "</h1>\n\n          <p>\n            If you have any questions, please contact us at ").concat(process.env.SUPPORT_EMAIL, "\n          </p>\n\n          <p>\n            Thank you for using ").concat(process.env.APP_NAME, "\n          </p>\n        </div>\n        "),
                        });
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "User updated successfully",
                            data: userData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _e.sent();
                        // send error to client
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // verify user
    User.prototype.accountStatusChange = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        return __awaiter(this, void 0, void 0, function () {
            var errors, userData, error_6;
            return __generator(this, function (_r) {
                switch (_r.label) {
                    case 0:
                        _r.trys.push([0, 5, , 6]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        return [4 /*yield*/, user_model_1.UserModel.findById((_a = req.params) === null || _a === void 0 ? void 0 : _a.userId)];
                    case 1:
                        userData = _r.sent();
                        if (!userData)
                            throw new Error("User not found");
                        if (!(((_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.status) === null || _c === void 0 ? void 0 : _c.toUpperCase()) === "REJECTED")) return [3 /*break*/, 2];
                        new user_logic_1.default().deleteUser((_d = req.params) === null || _d === void 0 ? void 0 : _d.userId);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate((_e = req.params) === null || _e === void 0 ? void 0 : _e.userId, {
                            status: (_f = req.body) === null || _f === void 0 ? void 0 : _f.status,
                        })];
                    case 3:
                        userData = _r.sent();
                        _r.label = 4;
                    case 4:
                        if (userData === null || userData === void 0 ? void 0 : userData.email) {
                            new notification_logics_1.default().pushNotification({
                                userIds: [userData === null || userData === void 0 ? void 0 : userData._id],
                                title: "Account status change",
                                body: "Your account has been ".concat((_j = (_h = (_g = req.body) === null || _g === void 0 ? void 0 : _g.status) === null || _h === void 0 ? void 0 : _h.toString()) === null || _j === void 0 ? void 0 : _j.toLowerCase()),
                            });
                            new mail_controller_1.default().sendHtmlMail({
                                to: userData === null || userData === void 0 ? void 0 : userData.email,
                                subject: "Your account has been ".concat((_m = (_l = (_k = req.body) === null || _k === void 0 ? void 0 : _k.status) === null || _l === void 0 ? void 0 : _l.toString()) === null || _m === void 0 ? void 0 : _m.toLowerCase()),
                                templet: "normal",
                                html: "\n        <div>\n          <h1>Your account has been ".concat((_q = (_p = (_o = req.body) === null || _o === void 0 ? void 0 : _o.status) === null || _p === void 0 ? void 0 : _p.toString()) === null || _q === void 0 ? void 0 : _q.toLowerCase(), "</h1>\n\n          <p>\n            If you have any questions, please contact us at ").concat(process.env.SUPPORT_EMAIL, "\n            \n          </p>\n          <p>\n            Thank you for using ").concat(process.env.APP_NAME, "\n           \n          </p>\n        </div>\n        "),
                            });
                        }
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "User updated successfully",
                            data: {
                                _id: userData === null || userData === void 0 ? void 0 : userData._id,
                                status: userData === null || userData === void 0 ? void 0 : userData.status,
                                email: userData === null || userData === void 0 ? void 0 : userData.email,
                                phoneNumber: userData === null || userData === void 0 ? void 0 : userData.phoneNumber,
                            },
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_6 = _r.sent();
                        // send error to client
                        next(error_6);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // get all users
    User.prototype.getAllUsersController = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var userData, _g, error_7;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 5, , 6]);
                        userData = void 0;
                        _g = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.role;
                        switch (_g) {
                            case "ADMIN": return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, new user_logic_1.default().getAllUsers({
                            chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
                            limit: req.query.limit ? Number(req.query.limit) : undefined,
                            role: req.query.role
                                ? (_c = (_b = req.query.role) === null || _b === void 0 ? void 0 : _b.toString()) === null || _c === void 0 ? void 0 : _c.toUpperCase()
                                : undefined,
                            status: req.query.status
                                ? (_f = (_e = (_d = req.query) === null || _d === void 0 ? void 0 : _d.status) === null || _e === void 0 ? void 0 : _e.toString()) === null || _f === void 0 ? void 0 : _f.toUpperCase()
                                : undefined,
                        })];
                    case 2:
                        userData = _h.sent();
                        return [3 /*break*/, 4];
                    case 3: throw new Error("You are not authorized to access this route");
                    case 4:
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "User updated successfully",
                            data: userData,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_7 = _h.sent();
                        // send error to client
                        next(error_7);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //online record
    User.prototype.onlineRecordController = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var _h, latitude, longitude, location_1, lastOnlineRecord, onlineReportData, endTime, error_8;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 7, , 8]);
                        _h = req === null || req === void 0 ? void 0 : req.body, latitude = _h.latitude, longitude = _h.longitude, location_1 = _h.location;
                        return [4 /*yield*/, onlineRecord_model_1.OnlineRecordSchema.find({})
                                .sort({
                                createdAt: -1,
                            })
                                .limit(1)
                                .populate("user")];
                    case 1:
                        lastOnlineRecord = _j.sent();
                        onlineReportData = void 0;
                        if (!(lastOnlineRecord.length && !((_a = lastOnlineRecord[0]) === null || _a === void 0 ? void 0 : _a.endTime))) return [3 /*break*/, 3];
                        endTime = new Date();
                        return [4 /*yield*/, onlineRecord_model_1.OnlineRecordSchema.findByIdAndUpdate((_b = lastOnlineRecord[0]) === null || _b === void 0 ? void 0 : _b._id, {
                                endTime: endTime,
                                totalSeconds: (0, core_helper_1.getTimeDeference)(endTime, (_c = lastOnlineRecord[0]) === null || _c === void 0 ? void 0 : _c.startTime),
                            }, {
                                new: true,
                            })];
                    case 2:
                        onlineReportData = _j.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, new onlineRecord_model_1.OnlineRecordSchema({
                            user: (_d = req.currentUser) === null || _d === void 0 ? void 0 : _d._id,
                            startTime: new Date(),
                        }).save()];
                    case 4:
                        onlineReportData = _j.sent();
                        _j.label = 5;
                    case 5: return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate((_e = req.currentUser) === null || _e === void 0 ? void 0 : _e._id, {
                            isOnDuty: !((_g = (_f = lastOnlineRecord[0]) === null || _f === void 0 ? void 0 : _f.user) === null || _g === void 0 ? void 0 : _g.isOnDuty),
                            latitude: latitude,
                            longitude: longitude,
                            location: location_1,
                        })];
                    case 6:
                        _j.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Online record saved successfully",
                            data: onlineReportData,
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        error_8 = _j.sent();
                        next(error_8);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    //online record
    User.prototype.deleteUserController = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var data, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        console.log("user delete");
                        return [4 /*yield*/, new user_logic_1.default().deleteUser((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userId)];
                    case 1:
                        data = _b.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "User delete successfully",
                            data: data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _b.sent();
                        next(error_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return User;
}(media_logic_1.default));
exports.default = User;
