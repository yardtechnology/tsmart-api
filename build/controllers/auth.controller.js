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
var md5_1 = __importDefault(require("md5"));
var helper_1 = require("../helper");
var core_helper_1 = require("../helper/core.helper");
var sms_helper_1 = require("../helper/sms.helper");
var auth_logic_1 = __importDefault(require("../logic/auth.logic"));
var address_model_1 = require("../models/address.model");
var user_model_1 = require("../models/user.model");
var whitelist_model_1 = require("../models/whitelist.model");
var mail_controller_1 = __importDefault(require("./mail.controller"));
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // finds validators for the user creation request
        _this.validateUserCreationFields = [
            (0, express_validator_1.body)("displayName", "display name is required")
                .isLength({ min: 3 })
                .withMessage("Display name must be at least 3 characters long")
                .isLength({ max: 20 })
                .withMessage("Display name must be at most 20 characters long"),
            (0, express_validator_1.body)("email", "Email is required")
                .isEmail()
                .withMessage("Invalid mail id")
                .normalizeEmail(),
            (0, express_validator_1.body)("confirmPassword", "Confirm password is required")
                .custom(function (value, _a) {
                var req = _a.req;
                if (value !== req.body.password) {
                    throw new Error("Password confirmation does not match");
                }
                return true;
            })
                .withMessage("Password confirmation does not match"),
        ];
        // finds validators for the user creation request
        _this.validateTechnicianRegisterFields = [
            (0, express_validator_1.body)("displayName", "display name is required")
                .isLength({ min: 3 })
                .withMessage("Display name must be at least 3 characters long")
                .isLength({ max: 20 })
                .withMessage("Display name must be at most 20 characters long"),
            (0, express_validator_1.body)("email", "Email is required")
                .isEmail()
                .withMessage("Invalid mail id")
                .normalizeEmail(),
            (0, express_validator_1.body)("phoneNumber", "phoneNumber is required")
                .isNumeric()
                .withMessage("Phone number must be a Number")
                .isLength({ min: 6, max: 16 })
                .withMessage("Phone number length must be 6 to 16 "),
            (0, express_validator_1.body)("countryCode").not().isEmpty().withMessage("countryCode is Required"),
            (0, express_validator_1.body)("password", "Password is required")
                .isLength({ min: 6 })
                .withMessage("Password must be at least 6 characters long"),
            (0, express_validator_1.body)("password", "Password is required")
                .isLength({ min: 6 })
                .withMessage("Password must be at least 6 characters long"),
            (0, express_validator_1.body)("confirmPassword", "Confirm password is required")
                .custom(function (value, _a) {
                var req = _a.req;
                req.body.role = "TECHNICIAN";
                if (value !== req.body.password) {
                    throw new Error("Password confirmation does not match");
                }
                return true;
            })
                .withMessage("Password confirmation does not match"),
            //address field validation
            (0, express_validator_1.body)("landmark")
                .optional()
                .isLength({ min: 5 })
                .withMessage("Landmark must be at least 5 characters long")
                .isLength({ max: 25 })
                .withMessage("Landmark must be at most 25 characters long"),
            (0, express_validator_1.body)("street")
                .optional()
                .isLength({ min: 5 })
                .withMessage("Street must be at least 5 characters long")
                .isLength({ max: 80 })
                .withMessage("Street must be at most 80 characters long"),
            (0, express_validator_1.body)("city")
                .not()
                .isEmpty()
                .withMessage("city")
                .isLength({ min: 3 })
                .withMessage("City must be at least 3 characters long")
                .isLength({ max: 21 })
                .withMessage("City must be at most 21 characters long"),
            (0, express_validator_1.body)("state")
                .optional()
                .isLength({ min: 3 })
                .withMessage("State must be at least 3 characters long")
                .isLength({ max: 25 })
                .withMessage("State must be at most 25 characters long"),
            (0, express_validator_1.body)("country")
                .not()
                .isEmpty()
                .withMessage("country")
                .isLength({ min: 3 })
                .withMessage("Country must be at least 3 characters long")
                .isLength({ max: 25 })
                .withMessage("Country must be at most 25 characters long"),
            (0, express_validator_1.body)("type")
                .not()
                .isEmpty()
                .withMessage("type")
                .custom(function (value) {
                var _a;
                if (!["HOME", "WORK", "OTHER"].includes((_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.toUpperCase())) {
                    return false;
                }
                return true;
            })
                .withMessage("type can only be HOME, WORK and OTHER"),
            (0, express_validator_1.body)("zip")
                .not()
                .isEmpty()
                .withMessage("zip")
                .isInt()
                .isLength({ min: 5 })
                .withMessage("zip code must be grater then 5 digit")
                .isLength({ max: 11 })
                .withMessage("zip code must be at most 11 digit"),
        ];
        // finds validators for the user login request
        _this.validateLoginFields = [
            (0, express_validator_1.body)("email", "Email is required").isEmail().withMessage("Invalid mail id"),
            (0, express_validator_1.body)("password", "Password is required")
                .isLength({ min: 6 })
                .withMessage("Password must be at least 6 characters long"),
        ];
        // finds validators for mail verify request
        _this.validateResendEmailVerificationFields = [
            (0, express_validator_1.body)("email", "Email is required").isEmail().withMessage("Invalid mail id"),
        ];
        // finds validators for password change request
        _this.validateChangePasswordFields = [
            (0, express_validator_1.body)("email", "Email is required").isEmail().withMessage("Invalid mail id"),
            (0, express_validator_1.body)("oldPassword", "Old password is required")
                .isLength({ min: 6 })
                .withMessage("Old password must be at least 6 characters long"),
            (0, express_validator_1.body)("newPassword", "New password is required")
                .isLength({ min: 6 })
                .withMessage("New password must be at least 6 characters long")
                .custom(function (value, _a) {
                var req = _a.req;
                if (value === req.body.oldPassword) {
                    return false;
                }
                return true;
            })
                .withMessage("Old password and new password cannot be same"),
            (0, express_validator_1.body)("confirmPassword", "Confirm password is required")
                .custom(function (value, _a) {
                var req = _a.req;
                if (value !== req.body.newPassword) {
                    throw new Error("New password confirmation does not match");
                }
                return true;
            })
                .withMessage("New password confirmation does not match"),
        ];
        // finds validators for the user creation request
        _this.validateForgotPasswordOtpSendFields = [
            (0, express_validator_1.body)("email", "Email is required").isEmail().withMessage("Invalid mail id"),
        ];
        // fields validation for gating access token
        _this.validateGetAccessTokenFields = [
            (0, express_validator_1.body)("refresh_token").isString().withMessage("Refresh token is required"),
        ];
        // finds validators for password change request
        _this.validateForgotPasswordFields = [
            (0, express_validator_1.body)("email", "Email is required").isEmail().withMessage("Invalid mail id"),
            (0, express_validator_1.body)("OTP", "Old is required")
                .isLength({ min: 6 })
                .withMessage("OTP must be at least 6 digit long")
                .toInt(),
            (0, express_validator_1.body)("newPassword", "New password is required")
                .isLength({ min: 6 })
                .withMessage("New password must be at least 6 characters long")
                .custom(function (value, _a) {
                var req = _a.req;
                if (value === req.body.oldPassword) {
                    return false;
                }
                return true;
            })
                .withMessage("Old password and new password cannot be same"),
            (0, express_validator_1.body)("confirmPassword", "Confirm password is required")
                .custom(function (value, _a) {
                var req = _a.req;
                if (value !== req.body.newPassword) {
                    throw new Error("New password confirmation does not match");
                }
                return true;
            })
                .withMessage("New password confirmation does not match"),
        ];
        _this.validateSendOtpFields = [
            (0, express_validator_1.body)("phoneNumber")
                .not()
                .isEmpty()
                .withMessage("phoneNumber is required")
                .isLength({ min: 8, max: 15 })
                .withMessage("phoneNumber must be 8-15 digit long")
                .toInt(),
            (0, express_validator_1.body)("countryCode")
                .not()
                .isEmpty()
                .withMessage("countryCode is required")
                .isLength({ min: 1, max: 3 })
                .withMessage("countryCode must be 1-3 digit long")
                .toInt(),
            (0, express_validator_1.body)("role")
                .not()
                .isEmpty()
                .withMessage("role is required")
                .isIn(["USER", "TECHNICIAN"])
                .withMessage("role must be USER or TECHNICIAN"),
        ];
        _this.validateVerifyOtpFields = [
            (0, express_validator_1.body)("userId", "userId is required")
                .isMongoId()
                .withMessage("userId is not a valid id"),
            (0, express_validator_1.body)("otp", "otp is required")
                .isLength({ min: 4, max: 4 })
                .withMessage("otp must be 4 digit long")
                .toInt(),
        ];
        return _this;
    }
    //send otp
    Auth.prototype.sendOtp = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, phoneNumber, countryCode, role, whiteListedUserData, activeOTP, newUser, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, , 6]);
                        (0, helper_1.fieldValidateError)(req);
                        _c = req.body, phoneNumber = _c.phoneNumber, countryCode = _c.countryCode, role = _c.role;
                        return [4 /*yield*/, whitelist_model_1.WhiteListModel.findOne({ phoneNumber: phoneNumber })];
                    case 1:
                        whiteListedUserData = _d.sent();
                        activeOTP = {
                            otp: (whiteListedUserData === null || whiteListedUserData === void 0 ? void 0 : whiteListedUserData.otp) || (0, core_helper_1.createOTP)(4),
                            createdAt: Date(),
                        };
                        return [4 /*yield*/, user_model_1.UserModel.findOneAndUpdate({ phoneNumber: phoneNumber }, {
                                activeOTP: activeOTP,
                                "country.code": countryCode,
                            })];
                    case 2:
                        newUser = _d.sent();
                        if (!!newUser) return [3 /*break*/, 4];
                        return [4 /*yield*/, new user_model_1.UserModel({
                                phoneNumber: phoneNumber,
                                "country.code": countryCode,
                                role: role,
                                activeOTP: activeOTP,
                            }).save()];
                    case 3:
                        newUser = _d.sent();
                        _d.label = 4;
                    case 4:
                        //if the number is not a white listed number then send otp to there number
                        if (!whiteListedUserData) {
                            (0, sms_helper_1.sendSMS)("+".concat((_a = newUser === null || newUser === void 0 ? void 0 : newUser.country) === null || _a === void 0 ? void 0 : _a.code).concat(newUser === null || newUser === void 0 ? void 0 : newUser.phoneNumber), "".concat(activeOTP.otp), false);
                            // new SMSLogic().sendOTP({
                            //   message: `your otp is ${activeOTP?.otp}`,
                            //   phoneNumber: `${newUser?.country?.code}${newUser?.phoneNumber}`,
                            // });
                        }
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Please check you sms inbox for an otp.",
                            data: {
                                _id: newUser === null || newUser === void 0 ? void 0 : newUser._id,
                                phoneNumber: newUser === null || newUser === void 0 ? void 0 : newUser.phoneNumber,
                                countryCode: (_b = newUser === null || newUser === void 0 ? void 0 : newUser.country) === null || _b === void 0 ? void 0 : _b.code,
                                role: newUser === null || newUser === void 0 ? void 0 : newUser.role,
                            },
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _d.sent();
                        // send error to client
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //verify otp
    Auth.prototype.verifyOtp = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var errors, _b, userId, otp, userInfo, ACCESS_TOKEN, userAgent, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 6, , 7]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        _b = req.body, userId = _b.userId, otp = _b.otp;
                        return [4 /*yield*/, user_model_1.UserModel.findById(userId)];
                    case 1:
                        userInfo = _c.sent();
                        if (!userInfo)
                            throw new Error("user does't exist corresponding to given userId.");
                        if (!!((new Date().getTime() -
                            new Date(userInfo.activeOTP.createdAt).getTime()) /
                            1000 <=
                            60 * 5)) return [3 /*break*/, 3];
                        // remove OTP from User
                        return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate(userId, {
                                activeOTP: {},
                            })];
                    case 2:
                        // remove OTP from User
                        _c.sent();
                        throw new Error("given opt is expired.");
                    case 3:
                        if (userInfo.activeOTP.otp !== otp)
                            throw new Error("given otp is incorrect.");
                        //check is user is blocked or not
                        if (userInfo.blockStatus === "BLOCKED") {
                            throw new Error("User is blocked");
                        }
                        return [4 /*yield*/, _super.prototype.getAccessToken.call(this, {
                                _id: userInfo === null || userInfo === void 0 ? void 0 : userInfo._id,
                                email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email,
                                role: userInfo === null || userInfo === void 0 ? void 0 : userInfo.role,
                                store: userInfo === null || userInfo === void 0 ? void 0 : userInfo.store,
                            })];
                    case 4:
                        ACCESS_TOKEN = _c.sent();
                        userAgent = ((_a = req === null || req === void 0 ? void 0 : req.get("user-agent")) === null || _a === void 0 ? void 0 : _a.split(")")[0].replace("(", "").replace(/;/g, "").replace(/ /g, "-")) || "unknown-device";
                        return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate(userInfo._id, {
                                isLoggedIn: true,
                                isOnline: true,
                                lastLogin: new Date(),
                            })];
                    case 5:
                        _c.sent();
                        //send new login detection to mail
                        new mail_controller_1.default().sendHtmlMail({
                            to: userInfo.email,
                            subject: "New Login",
                            templet: "normal",
                            html: "<h1>New Login</h1>\n        <p>\n          Someone logged in to your account.\n          </p>\n          <p>\n          Device: ".concat(userAgent.replace(/-/g, " "), "\n          </p>\n          <p>\n          Time: ").concat(new Date(), "\n\n          <p>\n          if you did not login to your account, please login to your account and then logout.\n          </p>\n\n          <a href=\"").concat(process.env.WEBSITE_END_POINT, "/signin\">\n            Login\n            </a>\n\n            <p>\n            Thanks, <br>\n            ").concat(process.env.WEBSITE_NAME, "\n\n\n            </p>\n          </p>"),
                        });
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "OTP verified successfully",
                            ACCESS_TOKEN: ACCESS_TOKEN,
                            data: {
                                _id: userInfo._id,
                                displayName: userInfo.displayName,
                                phoneNumber: userInfo.phoneNumber,
                                email: userInfo.email,
                                role: userInfo.role,
                                status: userInfo.status,
                            },
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _c.sent();
                        // send error to client
                        next(error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // create user
    Auth.prototype.createUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, displayName, email, password, confirmPassword, phoneNumber, countryCode, role, newUser, secret, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        _a = req.body, displayName = _a.displayName, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword, phoneNumber = _a.phoneNumber, countryCode = _a.countryCode, role = _a.role;
                        return [4 /*yield*/, new user_model_1.UserModel({
                                displayName: displayName,
                                email: email,
                                password: password,
                                phoneNumber: phoneNumber,
                                countryCode: countryCode,
                                confirmPassword: confirmPassword,
                                role: role,
                                photoURL: "https://www.gravatar.com/avatar/".concat((0, md5_1.default)(email), "?d=identicon"),
                            }).save()];
                    case 1:
                        newUser = _b.sent();
                        return [4 /*yield*/, _super.prototype.getAccessToken.call(this, {
                                _id: newUser._id,
                                email: newUser.email,
                            }, "1d")];
                    case 2:
                        secret = _b.sent();
                        // send mail for email verification
                        new mail_controller_1.default().sendHtmlMail({
                            to: email,
                            templet: "normal",
                            subject: "Email Verification",
                            html: "<h1>Email Verification</h1>\n        <p>\n          Please click on the link below to verify your email:\n          </p>\n          <a href=\"".concat(process.env.API_END_POINT, "/auth/verify-email/").concat(secret, "\">\n            Verify Email\n            </a>"),
                        });
                        // send response to client
                        res.json({
                            status: "SUCCESS",
                            message: "Signup successfully, check your mail inbox to verify your email to continue login.",
                            data: {
                                _id: newUser._id,
                                displayName: newUser.displayName,
                                email: newUser.email,
                            },
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _b.sent();
                        // send error to client
                        next(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // create user
    Auth.prototype.registerTechnician = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var _k, displayName, email, password, confirmPassword, phoneNumber, countryCode, role, userId, newUser, secret, error_4;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _l.trys.push([0, 4, , 5]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        _k = req.body, displayName = _k.displayName, email = _k.email, password = _k.password, confirmPassword = _k.confirmPassword, phoneNumber = _k.phoneNumber, countryCode = _k.countryCode, role = _k.role, userId = _k.userId;
                        return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate(userId, {
                                displayName: displayName,
                                email: email,
                                password: password,
                                phoneNumber: phoneNumber,
                                countryCode: countryCode,
                                confirmPassword: confirmPassword,
                                role: role,
                                photoURL: "https://www.gravatar.com/avatar/".concat((0, md5_1.default)(email), "?d=identicon"),
                            }, { upsert: true })];
                    case 1:
                        newUser = _l.sent();
                        // save user data to database
                        return [4 /*yield*/, new address_model_1.AddressModel({
                                user: newUser === null || newUser === void 0 ? void 0 : newUser._id,
                                name: displayName,
                                landmark: (_a = req.body) === null || _a === void 0 ? void 0 : _a.landmark,
                                email: email,
                                phoneNumber: phoneNumber,
                                countryCode: countryCode,
                                street: (_b = req.body) === null || _b === void 0 ? void 0 : _b.street,
                                city: (_c = req.body) === null || _c === void 0 ? void 0 : _c.city,
                                state: (_d = req.body) === null || _d === void 0 ? void 0 : _d.state,
                                country: (_e = req.body) === null || _e === void 0 ? void 0 : _e.country,
                                zip: (_f = req.body) === null || _f === void 0 ? void 0 : _f.zip,
                                isDefault: true,
                                type: ((_j = (_h = (_g = req.body) === null || _g === void 0 ? void 0 : _g.type) === null || _h === void 0 ? void 0 : _h.toString()) === null || _j === void 0 ? void 0 : _j.toUpperCase()) || "HOME",
                            }).save()];
                    case 2:
                        // save user data to database
                        _l.sent();
                        return [4 /*yield*/, _super.prototype.getAccessToken.call(this, {
                                _id: newUser === null || newUser === void 0 ? void 0 : newUser._id,
                                email: newUser === null || newUser === void 0 ? void 0 : newUser.email,
                            }, "1d")];
                    case 3:
                        secret = _l.sent();
                        // send mail for email verification
                        new mail_controller_1.default().sendHtmlMail({
                            to: email,
                            templet: "normal",
                            subject: "Email Verification",
                            html: "<h1>Email Verification</h1>\n        <p>\n          Please click on the link below to verify your email:\n          </p>\n          <a href=\"".concat(process.env.API_END_POINT, "/auth/verify-email/").concat(secret, "\">\n            Verify Email\n            </a>"),
                        });
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Technician register successfully",
                            data: {
                                _id: newUser === null || newUser === void 0 ? void 0 : newUser._id,
                                displayName: newUser === null || newUser === void 0 ? void 0 : newUser.displayName,
                                email: newUser === null || newUser === void 0 ? void 0 : newUser.email,
                            },
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _l.sent();
                        // send error to client
                        next(error_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // login user
    Auth.prototype.loginUser = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var errors, _b, email, password, userData, ACCESS_TOKEN, userAgent, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        _b = req.body, email = _b.email, password = _b.password;
                        return [4 /*yield*/, user_model_1.UserModel.findOne({
                                email: email,
                                isEmailVerified: true,
                            })];
                    case 1:
                        userData = _c.sent();
                        // check if user exists
                        if (!userData) {
                            throw new Error("User not found or mail is not verified");
                        }
                        // check if password is correct
                        if (!userData.authenticate(password)) {
                            throw new Error("Password is incorrect");
                        }
                        // check if user is Active or not
                        if (userData.status === "INACTIVE") {
                            throw new Error("Email is not verified");
                        }
                        //check is user is blocked or not
                        if (userData.blockStatus === "BLOCKED") {
                            throw new Error("User is blocked");
                        }
                        return [4 /*yield*/, _super.prototype.getAccessToken.call(this, {
                                _id: userData._id,
                                email: userData.email,
                                role: userData.role,
                                store: userData === null || userData === void 0 ? void 0 : userData.store,
                            })];
                    case 2:
                        ACCESS_TOKEN = _c.sent();
                        userAgent = ((_a = req === null || req === void 0 ? void 0 : req.get("user-agent")) === null || _a === void 0 ? void 0 : _a.split(")")[0].replace("(", "").replace(/;/g, "").replace(/ /g, "-")) || "unknown-device";
                        return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate(userData._id, {
                                isLoggedIn: true,
                                isOnline: true,
                                lastLogin: new Date(),
                            })];
                    case 3:
                        _c.sent();
                        //send new login detection to mail
                        new mail_controller_1.default().sendHtmlMail({
                            to: userData.email,
                            subject: "New Login",
                            templet: "normal",
                            html: "<h1>New Login</h1>\n        <p>\n          Someone logged in to your account.\n          </p>\n          <p>\n          Device: ".concat(userAgent.replace(/-/g, " "), "\n          </p>\n          <p>\n          Time: ").concat(new Date(), "\n          <p>\n          if you did not login to your account, please login to your account and change your password.\n          </p>\n          <a href=\"").concat(process.env.WEBSITE_END_POINT, "/signin\">\n            Login\n            </a>\n            <p>\n            Thanks, <br>\n            ").concat(process.env.WEBSITE_NAME, "\n            </p>\n          </p>"),
                        });
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "User logged in successfully",
                            ACCESS_TOKEN: ACCESS_TOKEN,
                            data: {
                                _id: userData._id,
                                displayName: userData.displayName,
                                email: userData.email,
                                role: userData.role,
                            },
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_5 = _c.sent();
                        // send error to client
                        next(error_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // email verification
    Auth.prototype.verifyEmailController = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var secret, decryptedSecret, userData, error_6, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        secret = req.params.secret;
                        return [4 /*yield*/, _super.prototype.verifyAccessToken.call(this, secret)];
                    case 1:
                        decryptedSecret = _a.sent();
                        console.log({ decryptedSecret: decryptedSecret });
                        return [4 /*yield*/, user_model_1.UserModel.findOneAndUpdate({ _id: decryptedSecret._id }, {
                                status: (decryptedSecret === null || decryptedSecret === void 0 ? void 0 : decryptedSecret.role) === "TECHNICIAN" ? "PENDING" : "ACTIVE",
                            })];
                    case 2:
                        userData = _a.sent();
                        // check if user exists
                        if (!userData)
                            throw new Error("User not found");
                        // check if user is already verified
                        if (userData.status !== "INACTIVE")
                            throw new Error("Email is already verified");
                        res.redirect("".concat(process.env.WEBSITE_END_POINT, "/verify-successful"));
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        err = error_6;
                        // redirect user to website end point if error occurs
                        res.redirect("".concat(process.env.WEBSITE_END_POINT, "/verify-failed?errorMessage=").concat(err.message));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // resend email verification
    Auth.prototype.resendEmailVerification = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, userData, secret, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        email = req.body.email;
                        return [4 /*yield*/, user_model_1.UserModel.findOne({ email: email })];
                    case 1:
                        userData = _a.sent();
                        // check if user exists
                        if (!userData)
                            throw new Error("User not found");
                        // check if user is already verified
                        if (userData.status !== "INACTIVE")
                            throw new Error("Email is already verified");
                        return [4 /*yield*/, _super.prototype.getAccessToken.call(this, {
                                _id: userData._id,
                                email: userData.email,
                            }, "1d")];
                    case 2:
                        secret = _a.sent();
                        // send mail for email verification
                        new mail_controller_1.default().sendHtmlMail({
                            to: email,
                            templet: "normal",
                            subject: "Email Verification",
                            html: "<h1>Email Verification</h1>\n        <p>\n          Please click on the link below to verify your email:\n          </p>\n          <a href=\"".concat(process.env.API_END_POINT, "/auth/verify-email/").concat(secret, "\">\n            Verify Email\n            </a>"),
                        });
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Email sent successfully",
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        // send error to client
                        next(error_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // change password
    Auth.prototype.changePassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, _a, email, oldPassword, newPassword, userData, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        _a = req.body, email = _a.email, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                        return [4 /*yield*/, user_model_1.UserModel.findOne({ email: email })];
                    case 1:
                        userData = _b.sent();
                        // check if user exists
                        if (!userData)
                            throw new Error("User not found");
                        // check if password is correct
                        if (!userData.authenticate(oldPassword))
                            throw new Error("Password is incorrect");
                        // update user password
                        userData.password = newPassword;
                        return [4 /*yield*/, userData.save()];
                    case 2:
                        _b.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Password changed successfully",
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_8 = _b.sent();
                        // send error to client
                        next(error_8);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // forgot password otp send
    Auth.prototype.forgotPasswordOtpSend = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, email, userData, OTP, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        email = req.body.email;
                        return [4 /*yield*/, user_model_1.UserModel.findOne({ email: email })];
                    case 1:
                        userData = _a.sent();
                        // check if user exists
                        if (!userData)
                            throw new Error("User not found");
                        OTP = (0, core_helper_1.createOTP)(6);
                        return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate(userData._id, {
                                verificationInfo: {
                                    OTP: OTP,
                                    OTPExpiry: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
                                },
                            })];
                    case 2:
                        _a.sent();
                        // send mail for email verification
                        new mail_controller_1.default().sendHtmlMail({
                            to: email,
                            subject: "Forgot Password OTP",
                            templet: "normal",
                            html: "<h1>Forgot Password OTP</h1>\n        <p>\n          Please enter the OTP below to reset your password:\n          </p>\n          <h1>".concat(OTP, "</h1>\n          "),
                        });
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Email sent successfully",
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _a.sent();
                        // send error to client
                        next(error_9);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // forgot password otp verify and change password
    Auth.prototype.forgotPasswordOtpVerifyAndChangePassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, _a, email, OTP, newPassword, userData, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        _a = req.body, email = _a.email, OTP = _a.OTP, newPassword = _a.newPassword;
                        return [4 /*yield*/, user_model_1.UserModel.findOne({ email: email })];
                    case 1:
                        userData = _b.sent();
                        // check if user exists
                        if (!userData)
                            throw new Error("User not found");
                        // check if OTP is correct
                        if (userData.verificationInfo.OTP !== OTP)
                            throw new Error("OTP is incorrect");
                        // check if OTP is expired
                        if (new Date(userData.verificationInfo.OTPExpiry) < new Date())
                            throw new Error("OTP is expired");
                        // check if new password is same as old password
                        if (userData.authenticate(newPassword))
                            throw new Error("New password cannot be same as old password");
                        // update user password
                        userData.password = newPassword;
                        return [4 /*yield*/, userData.save()];
                    case 2:
                        _b.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Password changed successfully",
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_10 = _b.sent();
                        // send error to client
                        next(error_10);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // logout
    Auth.prototype.logout = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userData, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id, {
                                isLoggedIn: false,
                                isOnline: false,
                                token: null,
                            })];
                    case 1:
                        userData = _b.sent();
                        if (!userData)
                            throw new Error("User not found");
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Logged out successfully",
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_11 = _b.sent();
                        next(error_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Auth;
}(auth_logic_1.default));
exports.default = Auth;
