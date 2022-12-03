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
var express_validator_1 = require("express-validator");
var helper_1 = require("../helper");
var address_model_1 = require("../models/address.model");
var store_model_1 = require("../models/store.model");
var Address = /** @class */ (function () {
    function Address() {
        // finds validators for the user creation request
        this.validateCreateAddressFields = [
            (0, express_validator_1.body)("name")
                .not()
                .isEmpty()
                .withMessage("name")
                .isLength({ min: 3 })
                .withMessage("Name must be at least 3 characters long")
                .isLength({ max: 20 })
                .withMessage("Name must be at most 20 characters long"),
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
                .withMessage("city is required")
                .isLength({ min: 3 })
                .withMessage("City must be at least 3 characters long")
                .isLength({ max: 21 })
                .withMessage("City must be at most 21 characters long"),
            (0, express_validator_1.body)("houseNumber")
                .not()
                .isEmpty()
                .withMessage("houseNumber is required")
                .isLength({ min: 3 })
                .withMessage("houseNumber must be at least 3 characters long")
                .isLength({ max: 21 })
                .withMessage("houseNumber must be at most 21 characters long"),
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
                .isLength({ min: 2 })
                .withMessage("Country must be at least 2 characters long")
                .isLength({ max: 25 })
                .withMessage("Country must be at most 25 characters long"),
            (0, express_validator_1.body)("type")
                .optional()
                .custom(function (value) {
                var _a;
                if (!["HOME", "WORK", "OTHER"].includes((_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.toUpperCase())) {
                    return false;
                }
                return true;
            })
                .withMessage("type can only be HOME, WORK and OTHER"),
            (0, express_validator_1.body)("email")
                .not()
                .isEmpty()
                .withMessage("email")
                .isEmail()
                .withMessage("Please enter a valid email"),
            (0, express_validator_1.body)("zip")
                .not()
                .isEmpty()
                .withMessage("zip")
                .isInt()
                .isLength({ min: 5 })
                .withMessage("zip code must be grater then 5 digit")
                .isLength({ max: 11 })
                .withMessage("zip code must be at most 11 digit"),
            (0, express_validator_1.body)("isDefault")
                .optional()
                .isBoolean()
                .withMessage("isDefault must be a boolean"),
            (0, express_validator_1.body)("countryCode")
                .optional()
                .isLength({ min: 2 })
                .withMessage("countryCode must be at least 2 characters long")
                .isLength({ max: 8 })
                .withMessage("countryCode must be at most 8 characters long"),
            (0, express_validator_1.body)("phoneNumber")
                .not()
                .isEmpty()
                .withMessage("phoneNumber")
                .isInt()
                .isLength({ min: 8, max: 16 })
                .withMessage("phone number must be grater then 8 digit and less then 16 digit"),
        ];
        // finds validators for the user creation request
        this.validateUpdateAddressFields = [
            (0, express_validator_1.body)("name")
                .optional()
                .isLength({ min: 3 })
                .withMessage("Name must be at least 3 characters long")
                .isLength({ max: 20 })
                .withMessage("Name must be at most 20 characters long"),
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
                .isLength({ max: 25 })
                .withMessage("Street must be at most 25 characters long"),
            (0, express_validator_1.body)("city")
                .optional()
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
                .optional()
                .isLength({ min: 2 })
                .withMessage("Country must be at least 2 characters long")
                .isLength({ max: 25 })
                .withMessage("Country must be at most 25 characters long"),
            (0, express_validator_1.body)("type")
                .optional()
                .custom(function (value) {
                var _a;
                if (!["HOME", "WORK", "OTHER"].includes((_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.toUpperCase())) {
                    return false;
                }
                return true;
            })
                .withMessage("type can only be HOME, WORK and OTHER"),
            (0, express_validator_1.body)("email")
                .optional()
                .isEmail()
                .withMessage("Please enter a valid email"),
            (0, express_validator_1.body)("zip")
                .optional()
                .isInt()
                .isLength({ min: 5 })
                .withMessage("zip code must be grater then 5 digit")
                .isLength({ max: 11 })
                .withMessage("zip code must be at most 11 digit"),
            (0, express_validator_1.body)("isDefault")
                .optional()
                .isBoolean()
                .withMessage("isDefault must be a boolean"),
            (0, express_validator_1.body)("countryCode")
                .optional()
                .isLength({ min: 2 })
                .withMessage("countryCode must be at least 2 characters long")
                .isLength({ max: 8 })
                .withMessage("countryCode must be at most 8 characters long"),
            (0, express_validator_1.body)("phoneNumber")
                .optional()
                .isInt()
                .isLength({ min: 8, max: 16 })
                .withMessage("phone number must be grater then 8 digit and less then 16 digit"),
        ];
    }
    // create address
    Address.prototype.createAddress = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __awaiter(this, void 0, void 0, function () {
            var addressData, error_1;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        _s.trys.push([0, 4, , 5]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, new address_model_1.AddressModel({
                                user: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id,
                                name: (_b = req.body) === null || _b === void 0 ? void 0 : _b.name,
                                landmark: (_c = req.body) === null || _c === void 0 ? void 0 : _c.landmark,
                                email: (_d = req.body) === null || _d === void 0 ? void 0 : _d.email,
                                phoneNumber: (_e = req.body) === null || _e === void 0 ? void 0 : _e.phoneNumber,
                                countryCode: (_f = req.body) === null || _f === void 0 ? void 0 : _f.countryCode,
                                street: (_g = req.body) === null || _g === void 0 ? void 0 : _g.street,
                                city: (_h = req.body) === null || _h === void 0 ? void 0 : _h.city,
                                houseNumber: (_j = req.body) === null || _j === void 0 ? void 0 : _j.houseNumber,
                                state: (_k = req.body) === null || _k === void 0 ? void 0 : _k.state,
                                country: (_l = req.body) === null || _l === void 0 ? void 0 : _l.country,
                                zip: (_m = req.body) === null || _m === void 0 ? void 0 : _m.zip,
                                isDefault: (_o = req.body) === null || _o === void 0 ? void 0 : _o.isDefault,
                                type: (_r = (_q = (_p = req.body) === null || _p === void 0 ? void 0 : _p.type) === null || _q === void 0 ? void 0 : _q.toString()) === null || _r === void 0 ? void 0 : _r.toUpperCase(),
                            }).save()];
                    case 1:
                        addressData = _s.sent();
                        if (!req.query.storeId) return [3 /*break*/, 3];
                        return [4 /*yield*/, store_model_1.StoreModel.findByIdAndUpdate(req.query.storeId, {
                                address: addressData._id,
                            })];
                    case 2:
                        _s.sent();
                        _s.label = 3;
                    case 3:
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Address added successfully",
                            data: addressData,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _s.sent();
                        // send error to client
                        next(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // update address
    Address.prototype.updateAddress = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        return __awaiter(this, void 0, void 0, function () {
            var addressData, error_2;
            return __generator(this, function (_t) {
                switch (_t.label) {
                    case 0:
                        _t.trys.push([0, 4, , 5]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.isDefault)) return [3 /*break*/, 2];
                        // update all other addresses to false
                        return [4 /*yield*/, address_model_1.AddressModel.updateMany({
                                user: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b._id,
                                isDefault: true,
                            }, {
                                isDefault: false,
                            })];
                    case 1:
                        // update all other addresses to false
                        _t.sent();
                        _t.label = 2;
                    case 2: return [4 /*yield*/, address_model_1.AddressModel.findByIdAndUpdate(req.params.addressId, {
                            name: (_c = req.body) === null || _c === void 0 ? void 0 : _c.name,
                            landmark: (_d = req.body) === null || _d === void 0 ? void 0 : _d.landmark,
                            email: (_e = req.body) === null || _e === void 0 ? void 0 : _e.email,
                            phoneNumber: (_f = req.body) === null || _f === void 0 ? void 0 : _f.phoneNumber,
                            countryCode: (_g = req.body) === null || _g === void 0 ? void 0 : _g.countryCode,
                            street: (_h = req.body) === null || _h === void 0 ? void 0 : _h.street,
                            city: (_j = req.body) === null || _j === void 0 ? void 0 : _j.city,
                            houseNumber: (_k = req.body) === null || _k === void 0 ? void 0 : _k.houseNumber,
                            state: (_l = req.body) === null || _l === void 0 ? void 0 : _l.state,
                            country: (_m = req.body) === null || _m === void 0 ? void 0 : _m.country,
                            zip: (_o = req.body) === null || _o === void 0 ? void 0 : _o.zip,
                            isDefault: (_p = req.body) === null || _p === void 0 ? void 0 : _p.isDefault,
                            type: (_s = (_r = (_q = req.body) === null || _q === void 0 ? void 0 : _q.type) === null || _r === void 0 ? void 0 : _r.toString()) === null || _s === void 0 ? void 0 : _s.toUpperCase(),
                        })];
                    case 3:
                        addressData = _t.sent();
                        if (!addressData)
                            throw new Error("Address not found");
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Address updated successfully",
                            data: addressData,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _t.sent();
                        // send error to client
                        next(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // get my addresses
    Address.prototype.getMyAddresses = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var addressesData, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, address_model_1.AddressModel.find({
                                user: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id,
                            })];
                    case 1:
                        addressesData = _b.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Addresses found successfully",
                            data: addressesData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        // send error to client
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get address
    Address.prototype.getAddress = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var addressData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, address_model_1.AddressModel.findById(req.params.addressId)];
                    case 1:
                        addressData = _a.sent();
                        if (!addressData)
                            throw new Error("Address not found");
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Address found successfully",
                            data: addressData,
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
    // get address
    Address.prototype.deleteAddress = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var addressData, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, address_model_1.AddressModel.findByIdAndDelete(req.params.addressId)];
                    case 1:
                        addressData = _a.sent();
                        if (!addressData)
                            throw new Error("Address not found");
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Address deleted successfully",
                            data: addressData,
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
    return Address;
}());
exports.default = Address;
