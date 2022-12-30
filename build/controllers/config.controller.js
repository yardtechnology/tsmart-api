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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var models_1 = require("../models");
var ConfigController = /** @class */ (function () {
    function ConfigController() {
    }
    ConfigController.prototype.createAndUpdate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, tax, storeAndroidMessage, storeAndroidVersion, storeAndroidTitle, storeAndroidIsDismissible, storeIosMessage, storeIosVersion, storeIosTitle, storeIosIsDismissible, customerAndroidMessage, customerAndroidVersion, customerAndroidTitle, customerAndroidIsDismissible, customerIosMessage, customerIosVersion, customerIosTitle, customerIosIsDismissible, technicianAndroidMessage, technicianAndroidVersion, technicianAndroidTitle, technicianAndroidIsDismissible, technicianIosMessage, technicianIosVersion, technicianIosTitle, technicianIosIsDismissible, mailInInstauration, aboutUs, privacyPolicy, termsAndConditions, shoppingPolicy, mailInstructions, ourWarranty, storeRange, orderCancelTime, technicianSearchRange, createConfig, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        _a = req.body, tax = _a.tax, storeAndroidMessage = _a.storeAndroidMessage, storeAndroidVersion = _a.storeAndroidVersion, storeAndroidTitle = _a.storeAndroidTitle, storeAndroidIsDismissible = _a.storeAndroidIsDismissible, storeIosMessage = _a.storeIosMessage, storeIosVersion = _a.storeIosVersion, storeIosTitle = _a.storeIosTitle, storeIosIsDismissible = _a.storeIosIsDismissible, customerAndroidMessage = _a.customerAndroidMessage, customerAndroidVersion = _a.customerAndroidVersion, customerAndroidTitle = _a.customerAndroidTitle, customerAndroidIsDismissible = _a.customerAndroidIsDismissible, customerIosMessage = _a.customerIosMessage, customerIosVersion = _a.customerIosVersion, customerIosTitle = _a.customerIosTitle, customerIosIsDismissible = _a.customerIosIsDismissible, technicianAndroidMessage = _a.technicianAndroidMessage, technicianAndroidVersion = _a.technicianAndroidVersion, technicianAndroidTitle = _a.technicianAndroidTitle, technicianAndroidIsDismissible = _a.technicianAndroidIsDismissible, technicianIosMessage = _a.technicianIosMessage, technicianIosVersion = _a.technicianIosVersion, technicianIosTitle = _a.technicianIosTitle, technicianIosIsDismissible = _a.technicianIosIsDismissible, mailInInstauration = _a.mailInInstauration, aboutUs = _a.aboutUs, privacyPolicy = _a.privacyPolicy, termsAndConditions = _a.termsAndConditions, shoppingPolicy = _a.shoppingPolicy, mailInstructions = _a.mailInstructions, ourWarranty = _a.ourWarranty, storeRange = _a.storeRange, orderCancelTime = _a.orderCancelTime, technicianSearchRange = _a.technicianSearchRange;
                        return [4 /*yield*/, models_1.ConfigSchema.findOneAndUpdate({}, {
                                tax: tax,
                                "storeAndroid.message": storeAndroidMessage,
                                "storeAndroid.version": storeAndroidVersion,
                                "storeAndroid.title": storeAndroidTitle,
                                "storeAndroid.isDismissible": storeAndroidIsDismissible,
                                "storeIos.message": storeIosMessage,
                                "storeIos.version": storeIosVersion,
                                "storeIos.title": storeIosTitle,
                                "storeIos.isDismissible": storeIosIsDismissible,
                                "customerAndroid.message": customerAndroidMessage,
                                "customerAndroid.version": customerAndroidVersion,
                                "customerAndroid.title": customerAndroidTitle,
                                "customerAndroid.isDismissible": customerAndroidIsDismissible,
                                "customerIos.message": customerIosMessage,
                                "customerIos.version": customerIosVersion,
                                "customerIos.title": customerIosTitle,
                                "customerIos.isDismissible": customerIosIsDismissible,
                                "technicianAndroid.message": technicianAndroidMessage,
                                "technicianAndroid.version": technicianAndroidVersion,
                                "technicianAndroid.title": technicianAndroidTitle,
                                "technicianAndroid.isDismissible": technicianAndroidIsDismissible,
                                "technicianIos.message": technicianIosMessage,
                                "technicianIos.version": technicianIosVersion,
                                "technicianIos.title": technicianIosTitle,
                                "technicianIos.isDismissible": technicianIosIsDismissible,
                                mailInInstauration: mailInInstauration,
                                aboutUs: aboutUs,
                                privacyPolicy: privacyPolicy,
                                termsAndConditions: termsAndConditions,
                                shoppingPolicy: shoppingPolicy,
                                mailInstructions: mailInstructions,
                                ourWarranty: ourWarranty,
                                storeRange: storeRange,
                                orderCancelTime: orderCancelTime,
                                technicianSearchRange: technicianSearchRange,
                            }, {
                                runValidators: true,
                                new: true,
                                upsert: true,
                            })];
                    case 1:
                        createConfig = _b.sent();
                        if (!createConfig)
                            throw new http_errors_1.InternalServerError("Something went wrong, Config is not created.");
                        res.json({
                            status: "SUCCESS",
                            message: "Config created successfully.",
                            data: createConfig,
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
    ConfigController.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var getConfig, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.ConfigSchema.findOne()];
                    case 1:
                        getConfig = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "All Config found successfully.s",
                            data: getConfig || {},
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigController.prototype.addNewsLatter = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.ConfigSchema.findOneAndUpdate({}, {
                                $push: { newsLatterEmails: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email },
                            })];
                    case 1:
                        _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Your email added to news latter successfully",
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
    return ConfigController;
}());
exports.ConfigControllerValidation = {
    create: [
        (0, express_validator_1.body)("tax")
            .optional()
            .isNumeric()
            .withMessage("tax must be number."),
        (0, express_validator_1.body)("storeAndroidMessage")
            .optional()
            .isLength({ min: 1 })
            .withMessage("storeAndroidMessage must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("storeAndroidMessage must be at most 250 character."),
        (0, express_validator_1.body)("storeAndroidTitle")
            .optional()
            .isLength({ min: 1 })
            .withMessage("storeAndroidTitle must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("storeAndroidTitle must be at most 250 character."),
        (0, express_validator_1.body)("storeAndroidVersion").optional(),
        (0, express_validator_1.body)("storeAndroidIsDismissible")
            .optional()
            .isBoolean()
            .withMessage("storeAndroidIsDismissible must be boolean."),
        //
        //
        (0, express_validator_1.body)("storeIosMessage")
            .optional()
            .isLength({ min: 1 })
            .withMessage("storeIosMessage must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("storeIosMessage must be at most 250 character."),
        (0, express_validator_1.body)("storeIosTitle")
            .optional()
            .isLength({ min: 1 })
            .withMessage("storeIosTitle must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("storeIosTitle must be at most 250 character."),
        (0, express_validator_1.body)("storeIosVersion").optional(),
        (0, express_validator_1.body)("storeIosIsDismissible")
            .optional()
            .isBoolean()
            .withMessage("storeIosIsDismissible must be boolean."),
        //
        //
        (0, express_validator_1.body)("customerAndroidMessage")
            .optional()
            .isLength({ min: 1 })
            .withMessage("customerAndroidMessage must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("customerAndroidMessage must be at most 250 character."),
        (0, express_validator_1.body)("customerAndroidTitle")
            .optional()
            .isLength({ min: 1 })
            .withMessage("customerAndroidTitle must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("customerAndroidTitle must be at most 250 character."),
        (0, express_validator_1.body)("customerAndroidVersion").optional(),
        (0, express_validator_1.body)("customerAndroidIsDismissible")
            .optional()
            .isBoolean()
            .withMessage("customerAndroidIsDismissible must be boolean."),
        //
        //
        (0, express_validator_1.body)("customerIosMessage")
            .optional()
            .isLength({ min: 1 })
            .withMessage("customerIosMessage must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("customerIosMessage must be at most 250 character."),
        (0, express_validator_1.body)("customerIosTitle")
            .optional()
            .isLength({ min: 1 })
            .withMessage("customerIosTitle must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("customerIosTitle must be at most 250 character."),
        (0, express_validator_1.body)("customerIosVersion").optional(),
        (0, express_validator_1.body)("customerIosIsDismissible")
            .optional()
            .isBoolean()
            .withMessage("customerIosIsDismissible must be boolean."),
        //
        //
        (0, express_validator_1.body)("technicianAndroidMessage")
            .optional()
            .isLength({ min: 1 })
            .withMessage("technicianAndroidMessage must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("technicianAndroidMessage must be at most 250 character."),
        (0, express_validator_1.body)("technicianAndroidTitle")
            .optional()
            .isLength({ min: 1 })
            .withMessage("technicianAndroidTitle must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("technicianAndroidTitle must be at most 250 character."),
        (0, express_validator_1.body)("technicianAndroidVersion").optional(),
        (0, express_validator_1.body)("technicianAndroidIsDismissible")
            .optional()
            .isBoolean()
            .withMessage("technicianAndroidIsDismissible must be boolean."),
        //
        //
        (0, express_validator_1.body)("technicianIosMessage")
            .optional()
            .isLength({ min: 1 })
            .withMessage("technicianIosMessage must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("technicianIosMessage must be at most 250 character."),
        (0, express_validator_1.body)("technicianIosTitle")
            .optional()
            .isLength({ min: 1 })
            .withMessage("technicianIosTitle must be at least 1 character.")
            .isLength({ max: 250 })
            .withMessage("technicianIosTitle must be at most 250 character."),
        (0, express_validator_1.body)("technicianIosVersion").optional(),
        (0, express_validator_1.body)("technicianIosIsDismissible")
            .optional()
            .isBoolean()
            .withMessage("technicianIosIsDismissible must be boolean."),
    ],
    newsLatter: [
        (0, express_validator_1.body)("email")
            .not()
            .isEmpty()
            .withMessage("email is required")
            .isEmail()
            .withMessage("please enter a valid email"),
    ],
};
exports.default = ConfigController;
