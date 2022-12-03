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
exports.storeControlValidator = void 0;
var express_validator_1 = require("express-validator");
var mongoose_1 = require("mongoose");
var helper_1 = require("../helper");
var core_helper_1 = require("../helper/core.helper");
var media_logic_1 = __importDefault(require("../logic/media.logic"));
var store_logic_1 = __importDefault(require("../logic/store.logic"));
var models_1 = require("../models");
var store_model_1 = require("../models/store.model");
var user_model_1 = require("../models/user.model");
var mail_controller_1 = __importDefault(require("./mail.controller"));
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    function Store() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // create store
    Store.prototype.createStore = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
        return __awaiter(this, void 0, void 0, function () {
            var imageFile, filePath, imageData, _7, storeData, isAlradyHubExists, error_1;
            return __generator(this, function (_8) {
                switch (_8.label) {
                    case 0:
                        _8.trys.push([0, 10, , 11]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        imageFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
                        filePath = "store";
                        if (!(imageFile && !Array.isArray(imageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, imageFile, filePath)];
                    case 1:
                        _7 = _8.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _7 = undefined;
                        _8.label = 3;
                    case 3:
                        imageData = _7;
                        storeData = void 0;
                        if (!(((_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.type) === null || _c === void 0 ? void 0 : _c.toUpperCase()) !== "HUB")) return [3 /*break*/, 5];
                        return [4 /*yield*/, new store_model_1.StoreModel({
                                displayName: (_d = req.body) === null || _d === void 0 ? void 0 : _d.displayName,
                                email: (_e = req.body) === null || _e === void 0 ? void 0 : _e.email,
                                phoneNumber: (_f = req.body) === null || _f === void 0 ? void 0 : _f.phoneNumber,
                                countryCode: (_g = req.body) === null || _g === void 0 ? void 0 : _g.countryCode,
                                imageURL: imageData === null || imageData === void 0 ? void 0 : imageData.url,
                                imagePath: imageData === null || imageData === void 0 ? void 0 : imageData.path,
                                about: (_h = req.body) === null || _h === void 0 ? void 0 : _h.about,
                                createdBy: (_j = req.body) === null || _j === void 0 ? void 0 : _j.createdBy,
                                timing: (_k = req.body) === null || _k === void 0 ? void 0 : _k.timing,
                                address: {
                                    state: (_l = req.body) === null || _l === void 0 ? void 0 : _l.state,
                                    city: (_m = req.body) === null || _m === void 0 ? void 0 : _m.city,
                                    street: (_o = req.body) === null || _o === void 0 ? void 0 : _o.street,
                                    zip: (_p = req.body) === null || _p === void 0 ? void 0 : _p.zip,
                                    country: (_q = req.body) === null || _q === void 0 ? void 0 : _q.country,
                                    latitude: (_r = req.body) === null || _r === void 0 ? void 0 : _r.latitude,
                                    longitude: (_s = req.body) === null || _s === void 0 ? void 0 : _s.longitude,
                                },
                            }).save()];
                    case 4:
                        // save user data to database
                        storeData = _8.sent();
                        return [3 /*break*/, 9];
                    case 5: return [4 /*yield*/, store_model_1.StoreModel.findOne({ type: "HUB" })];
                    case 6:
                        isAlradyHubExists = _8.sent();
                        if (isAlradyHubExists)
                            throw new Error("Hub store already exists");
                        return [4 /*yield*/, new store_model_1.StoreModel({
                                displayName: (_t = req.body) === null || _t === void 0 ? void 0 : _t.displayName,
                                email: (_u = req.body) === null || _u === void 0 ? void 0 : _u.email,
                                phoneNumber: (_v = req.body) === null || _v === void 0 ? void 0 : _v.phoneNumber,
                                countryCode: (_w = req.body) === null || _w === void 0 ? void 0 : _w.countryCode,
                                imageURL: imageData === null || imageData === void 0 ? void 0 : imageData.url,
                                imagePath: imageData === null || imageData === void 0 ? void 0 : imageData.path,
                                about: (_x = req.body) === null || _x === void 0 ? void 0 : _x.about,
                                createdBy: (_y = req.body) === null || _y === void 0 ? void 0 : _y.createdBy,
                                type: "HUB",
                                timing: (_z = req === null || req === void 0 ? void 0 : req.body) === null || _z === void 0 ? void 0 : _z.timing,
                                address: {
                                    state: (_0 = req.body) === null || _0 === void 0 ? void 0 : _0.state,
                                    city: (_1 = req.body) === null || _1 === void 0 ? void 0 : _1.city,
                                    street: (_2 = req.body) === null || _2 === void 0 ? void 0 : _2.street,
                                    zip: (_3 = req.body) === null || _3 === void 0 ? void 0 : _3.zip,
                                    country: (_4 = req.body) === null || _4 === void 0 ? void 0 : _4.country,
                                    latitude: (_5 = req.body) === null || _5 === void 0 ? void 0 : _5.latitude,
                                    longitude: (_6 = req.body) === null || _6 === void 0 ? void 0 : _6.longitude,
                                },
                            }).save()];
                    case 7:
                        storeData = _8.sent();
                        return [4 /*yield*/, user_model_1.UserModel.updateMany({ role: "ADMIN" }, {
                                store: storeData._id,
                            })];
                    case 8:
                        _8.sent();
                        _8.label = 9;
                    case 9:
                        // send response to client
                        res.json({
                            status: "SUCCESS",
                            message: "Store created successfully",
                            data: storeData,
                        });
                        return [3 /*break*/, 11];
                    case 10:
                        error_1 = _8.sent();
                        // send error to client
                        next(error_1);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    // update store
    Store.prototype.updateStore = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __awaiter(this, void 0, void 0, function () {
            var imageFile, filePath, imageData, _s, storeData, error_2;
            return __generator(this, function (_t) {
                switch (_t.label) {
                    case 0:
                        _t.trys.push([0, 5, , 6]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        imageFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
                        filePath = "".concat((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b._id);
                        if (!(imageFile && !Array.isArray(imageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, imageFile, filePath)];
                    case 1:
                        _s = _t.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _s = undefined;
                        _t.label = 3;
                    case 3:
                        imageData = _s;
                        return [4 /*yield*/, store_model_1.StoreModel.findByIdAndUpdate(req.params.storeId, {
                                displayName: (_c = req.body) === null || _c === void 0 ? void 0 : _c.displayName,
                                email: (_d = req.body) === null || _d === void 0 ? void 0 : _d.email,
                                phoneNumber: (_e = req.body) === null || _e === void 0 ? void 0 : _e.phoneNumber,
                                countryCode: (_f = req.body) === null || _f === void 0 ? void 0 : _f.countryCode,
                                imageURL: imageData === null || imageData === void 0 ? void 0 : imageData.url,
                                imagePath: imageData === null || imageData === void 0 ? void 0 : imageData.path,
                                about: (_g = req.body) === null || _g === void 0 ? void 0 : _g.about,
                                createdBy: (_h = req.body) === null || _h === void 0 ? void 0 : _h.createdBy,
                                timing: (_j = req.body) === null || _j === void 0 ? void 0 : _j.timing,
                                "address.state": (_k = req.body) === null || _k === void 0 ? void 0 : _k.state,
                                "address.city": (_l = req.body) === null || _l === void 0 ? void 0 : _l.city,
                                "address.street": (_m = req.body) === null || _m === void 0 ? void 0 : _m.street,
                                "address.zip": (_o = req.body) === null || _o === void 0 ? void 0 : _o.zip,
                                "address.country": (_p = req.body) === null || _p === void 0 ? void 0 : _p.country,
                                "address.latitude": (_q = req.body) === null || _q === void 0 ? void 0 : _q.latitude,
                                "address.longitude": (_r = req.body) === null || _r === void 0 ? void 0 : _r.longitude,
                            })];
                    case 4:
                        storeData = _t.sent();
                        if (!storeData)
                            throw new Error("Store not found");
                        // delete previous image
                        (imageData === null || imageData === void 0 ? void 0 : imageData.path) &&
                            (storeData === null || storeData === void 0 ? void 0 : storeData.imagePath) &&
                            _super.prototype.deleteMedia.call(this, storeData === null || storeData === void 0 ? void 0 : storeData.imagePath);
                        // send response to client
                        res.json({
                            status: "SUCCESS",
                            message: "Store updated successfully",
                            data: storeData,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _t.sent();
                        // send error to client
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // get store
    Store.prototype.getStore = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var storeData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, store_model_1.StoreModel.findById(req.params.storeId).select("-imagePath")];
                    case 1:
                        storeData = _a.sent();
                        if (!storeData)
                            throw new Error("Store not found");
                        // send response to client
                        res.json({
                            status: "SUCCESS",
                            message: "Store found successfully",
                            data: storeData,
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
    //   get all store
    Store.prototype.getAllStores = function (req, res, next) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var query_1, categoryData, configData_1, error_4;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 4, , 5]);
                        query_1 = {
                            address: ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.zip)
                                ? {
                                    zip: (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.zip,
                                }
                                : undefined,
                        };
                        !((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.zip) && (query_1 === null || query_1 === void 0 ? true : delete query_1.address);
                        return [4 /*yield*/, store_model_1.StoreModel.find(query_1)
                                .populate(["address"])
                                .select("-imagePath")
                                .sort({ createdAt: -1 })];
                    case 1:
                        categoryData = _f.sent();
                        if (!(((_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.latitude) && ((_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.longitude))) return [3 /*break*/, 3];
                        return [4 /*yield*/, models_1.ConfigSchema.findOne({})];
                    case 2:
                        configData_1 = _f.sent();
                        categoryData = categoryData.filter(function (item, index) {
                            var _a, _b, _c, _d;
                            return (configData_1 === null || configData_1 === void 0 ? void 0 : configData_1.storeRange)
                                ? (configData_1 === null || configData_1 === void 0 ? void 0 : configData_1.storeRange) >=
                                    (0, core_helper_1.getDistance)((_a = item === null || item === void 0 ? void 0 : item.address) === null || _a === void 0 ? void 0 : _a.latitude, (_b = item === null || item === void 0 ? void 0 : item.address) === null || _b === void 0 ? void 0 : _b.longitude, Number((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.latitude), Number((_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.longitude), "K")
                                : true;
                        });
                        _f.label = 3;
                    case 3:
                        // send response to client
                        res.json({
                            status: "SUCCESS",
                            message: "All stores found successfully",
                            data: categoryData,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _f.sent();
                        // send error to client
                        next(error_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // TODO: DELETE STORE
    Store.prototype.deleteStore = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var storeId, data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        storeId = req.params.storeId;
                        return [4 /*yield*/, new store_logic_1.default().deleteStore(req === null || req === void 0 ? void 0 : req.params.storeId)];
                    case 1:
                        data = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "".concat(storeId, " Stores delete in the todo list."),
                            data: storeId,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Assign store manager
    Store.prototype.assignStoreManager = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var storeData, userData, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, store_model_1.StoreModel.findById(req.params.storeId)];
                    case 1:
                        storeData = _b.sent();
                        if (!storeData)
                            throw new Error("Store not found");
                        return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate((_a = req.body) === null || _a === void 0 ? void 0 : _a.managerId, {
                                store: req.params.storeId,
                            })];
                    case 2:
                        userData = _b.sent();
                        if (!userData)
                            throw new Error("User not found");
                        new mail_controller_1.default().sendMail({
                            to: userData === null || userData === void 0 ? void 0 : userData.email,
                            subject: "Store Manager Assigned",
                            text: "\n        hi,".concat(userData === null || userData === void 0 ? void 0 : userData.displayName, "!,\n        you have been assigned as a store manager for ").concat(storeData === null || storeData === void 0 ? void 0 : storeData.displayName, "\n        "),
                        });
                        // send response to client
                        res.json({
                            status: "SUCCESS",
                            message: "Store manager assigned to store successfully",
                            data: userData,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _b.sent();
                        // send error to client
                        next(error_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // remove store manager
    Store.prototype.removeStoreManager = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userData, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate((_a = req.body) === null || _a === void 0 ? void 0 : _a.managerId, {
                                store: null,
                            })];
                    case 1:
                        userData = _b.sent();
                        if (!userData)
                            throw new Error("Store not found");
                        // send response to client
                        res.json({
                            status: "SUCCESS",
                            message: "Store manager removed from store successfully",
                            data: userData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _b.sent();
                        // send error to client
                        next(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get store managers
    Store.prototype.getStoreManagersController = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new store_logic_1.default().getAllStoresManagers({
                                Id: req.params.storeId,
                                chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
                                limit: req.query.limit ? Number(req.query.limit) : undefined,
                            })];
                    case 1:
                        userData = _a.sent();
                        if (!userData)
                            throw new Error("Store not found");
                        // send response to client
                        res.json({
                            status: "SUCCESS",
                            message: "Store managers found successfully",
                            data: userData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        // send error to client
                        next(error_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get hub data
    Store.prototype.getHubDataController = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, store_model_1.StoreModel.findOne({
                                type: "HUB",
                            })];
                    case 1:
                        data = _a.sent();
                        if (!data)
                            throw new Error("Hub not found");
                        // send response to client
                        res.json({
                            status: "SUCCESS",
                            message: "Hub data found successfully",
                            data: data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        // send error to client
                        next(error_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Store.prototype.getAllStore = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var services, getAllStore, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        services = req.body.services;
                        return [4 /*yield*/, new store_logic_1.default().getAllStoreByStoreIn({
                                date: new Date(),
                                services: services,
                            })];
                    case 1:
                        getAllStore = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "According to the service store found successfully.",
                            data: getAllStore,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _a.sent();
                        next(error_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Store.prototype.getStoreListAccordingServiceAvailability = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var query_2, _g, servicesId, modelId, servicePriceArrayCheck, argArray, getStore, configData_2, error_11;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 4, , 5]);
                        query_2 = {
                            address: ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.zip)
                                ? {
                                    zip: (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.zip,
                                }
                                : undefined,
                        };
                        !((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.zip) && (query_2 === null || query_2 === void 0 ? true : delete query_2.address);
                        _g = req.query, servicesId = _g.servicesId, modelId = _g.modelId;
                        (0, helper_1.fieldValidateError)(req);
                        servicePriceArrayCheck = servicesId
                            ? Array.isArray(servicesId)
                                ? servicesId === null || servicesId === void 0 ? void 0 : servicesId.map(function (item) { return new mongoose_1.Types.ObjectId(String(item)); })
                                : (_d = [servicesId]) === null || _d === void 0 ? void 0 : _d.map(function (item) { return new mongoose_1.Types.ObjectId(String(item)); })
                            : undefined;
                        argArray = [];
                        modelId &&
                            argArray.push({
                                $eq: ["$model", new mongoose_1.Types.ObjectId(String(modelId))],
                            });
                        servicePriceArrayCheck &&
                            argArray.push({
                                $in: ["$service", servicePriceArrayCheck],
                            });
                        return [4 /*yield*/, store_model_1.StoreModel.aggregate([
                                // {
                                //   $match: query,
                                // },
                                {
                                    $lookup: {
                                        from: "serviceprices",
                                        localField: "_id",
                                        foreignField: "store",
                                        as: "servicePrices",
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: argArray,
                                                    },
                                                },
                                            },
                                            {
                                                $group: {
                                                    _id: "$service",
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $match: {
                                        $expr: {
                                            $eq: [
                                                { $size: "$servicePrices" },
                                                servicePriceArrayCheck === null || servicePriceArrayCheck === void 0 ? void 0 : servicePriceArrayCheck.length,
                                            ],
                                        },
                                    },
                                },
                                {
                                    $project: {
                                        servicePrices: 0,
                                        type: 0,
                                        imagePath: 0,
                                        __v: 0,
                                    },
                                },
                            ])];
                    case 1:
                        getStore = _h.sent();
                        if (!(((_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.latitude) && ((_f = req === null || req === void 0 ? void 0 : req.query) === null || _f === void 0 ? void 0 : _f.longitude))) return [3 /*break*/, 3];
                        return [4 /*yield*/, models_1.ConfigSchema.findOne({})];
                    case 2:
                        configData_2 = _h.sent();
                        getStore = getStore.filter(function (item) {
                            var _a, _b, _c, _d;
                            return (configData_2 === null || configData_2 === void 0 ? void 0 : configData_2.storeRange)
                                ? (configData_2 === null || configData_2 === void 0 ? void 0 : configData_2.storeRange) >=
                                    (0, core_helper_1.getDistance)((_a = item === null || item === void 0 ? void 0 : item.address) === null || _a === void 0 ? void 0 : _a.latitude, (_b = item === null || item === void 0 ? void 0 : item.address) === null || _b === void 0 ? void 0 : _b.longitude, Number((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.latitude), Number((_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.longitude), "K")
                                : true;
                        });
                        _h.label = 3;
                    case 3:
                        res.json({
                            status: "SUCCESS",
                            message: "Store get successfully",
                            data: getStore,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_11 = _h.sent();
                        next(error_11);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // duplicate it will need in timing function
    Store.prototype.duplicateDetStoreListAccordingAvailability = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, serviceId, modelId, date, getStore, error_12;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, serviceId = _a.serviceId, modelId = _a.modelId, date = _a.date;
                        return [4 /*yield*/, store_model_1.StoreModel.aggregate([
                                {
                                    $lookup: {
                                        from: "serviceprices",
                                        localField: "_id",
                                        foreignField: "store",
                                        as: "servicePrices",
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $eq: ["$service", new mongoose_1.Types.ObjectId(serviceId)],
                                                            },
                                                            {
                                                                $eq: ["$model", new mongoose_1.Types.ObjectId(modelId)],
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $match: {
                                        $expr: {
                                            $gte: [{ $size: "$servicePrices" }, 1],
                                        },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "holidays",
                                        localField: "_id",
                                        foreignField: "store",
                                        as: "holidays",
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $eq: [
                                                                    {
                                                                        $year: "$date",
                                                                    },
                                                                    {
                                                                        $year: new Date(date),
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                $eq: [
                                                                    {
                                                                        $month: "$date",
                                                                    },
                                                                    {
                                                                        $month: new Date(date),
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                $eq: [
                                                                    {
                                                                        $dayOfMonth: "$date",
                                                                    },
                                                                    {
                                                                        $dayOfMonth: new Date(date),
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $match: {
                                        $expr: {
                                            $lt: [{ $size: "$holidays" }, 1],
                                        },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "timings",
                                        localField: "_id",
                                        foreignField: "store",
                                        as: "timing",
                                        pipeline: [
                                            {
                                                $addFields: {
                                                    startDateForm: {
                                                        $dateFromParts: {
                                                            year: new Date(date).getFullYear(),
                                                            month: new Date(date).getMonth() + 1,
                                                            day: new Date(date).getDate(),
                                                            hour: {
                                                                $hour: "$start",
                                                            },
                                                            minute: {
                                                                $minute: "$start",
                                                            },
                                                        },
                                                    },
                                                    endDateForm: {
                                                        $dateFromParts: {
                                                            year: new Date(date).getFullYear(),
                                                            month: new Date(date).getMonth() + 1,
                                                            day: new Date(date).getDate(),
                                                            hour: {
                                                                $hour: "$end",
                                                            },
                                                            minute: {
                                                                $minute: "$end",
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "orders",
                                                    localField: "store",
                                                    foreignField: "storeID",
                                                    as: "orderHave",
                                                    let: {
                                                        startDate: "$startDateForm",
                                                        endDate: "$endDateForm",
                                                        dayOfWeekNumber: "$dayOfWeekNumber",
                                                    },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $and: [
                                                                        {
                                                                            $eq: ["$serviceType", "IN_STOR"],
                                                                        },
                                                                        {
                                                                            $gte: ["$scheduledTime", "$$startDate"],
                                                                        },
                                                                        {
                                                                            $lte: ["$scheduledTime", "$$endDate"],
                                                                        },
                                                                    ],
                                                                },
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                $addFields: {
                                                    orderHave: {
                                                        $size: "$orderHave",
                                                    },
                                                    leftBooking: {
                                                        $subtract: [
                                                            "$numberOfRepairers",
                                                            {
                                                                $size: "$orderHave",
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                            {
                                                $match: {
                                                    $expr: {
                                                        $gte: ["$leftBooking", 1],
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $match: {
                                        $expr: {
                                            $gte: [{ $size: "$timing" }, 1],
                                        },
                                    },
                                },
                                {
                                    $project: {
                                        timing: 0,
                                        holidays: 0,
                                        servicePrices: 0,
                                    },
                                },
                            ])];
                    case 1:
                        getStore = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Store get successfully",
                            data: getStore,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_12 = _b.sent();
                        next(error_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Store.prototype.lastSevenDay = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var storeId, currentDateRoot, currentDateHigh, holidays, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        storeId = req.params.storeId;
                        currentDateRoot = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                        currentDateHigh = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59);
                        return [4 /*yield*/, models_1.HolidayModel.aggregate([
                                {
                                    $addFields: {
                                        sevenDay: [0, 1, 2, 3, 4, 5, 6],
                                    },
                                },
                                {
                                    $addFields: {
                                        sevenDay: {
                                            $map: {
                                                input: "$sevenDay",
                                                as: "singleDay",
                                                in: {
                                                    startDate: {
                                                        $dateAdd: {
                                                            startDate: new Date(currentDateRoot),
                                                            unit: "day",
                                                            amount: "$$singleDay",
                                                        },
                                                    },
                                                    endDate: {
                                                        $dateAdd: {
                                                            startDate: new Date(currentDateHigh),
                                                            unit: "day",
                                                            amount: "$$singleDay",
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                                {
                                    $group: {
                                        _id: null,
                                        sevenDay: { $first: "$sevenDay" },
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$sevenDay",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $project: {
                                        _id: 0,
                                        startDate: "$sevenDay.startDate",
                                        endDate: "$sevenDay.endDate",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "holidays",
                                        as: "holiday",
                                        let: {
                                            startDate: "$startDate",
                                            endDate: "$endDate",
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $eq: ["$store", new mongoose_1.Types.ObjectId(storeId)],
                                                            },
                                                            {
                                                                $gte: ["$date", "$$startDate"],
                                                            },
                                                            {
                                                                $lte: ["$date", "$$endDate"],
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                            ])];
                    case 1:
                        holidays = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Store time get successfully",
                            data: holidays,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_13 = _a.sent();
                        next(error_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Store.prototype.storeManagerGet = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var store, findStoreManager, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        store = req.params.store;
                        return [4 /*yield*/, user_model_1.UserModel.findOne({
                                role: "MANAGER",
                                store: store,
                            })];
                    case 1:
                        findStoreManager = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Store manager get successfully",
                            data: findStoreManager,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_14 = _a.sent();
                        next(error_14);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Store;
}(media_logic_1.default));
exports.storeControlValidator = {
    assignStoreManager: [
        (0, express_validator_1.body)("displayName")
            .optional()
            .isLength({ min: 3 })
            .withMessage("Display name must be at least 3 characters long")
            .isLength({ max: 100 })
            .withMessage("Display name must be at most 100 characters long"),
        (0, express_validator_1.body)("email").optional().isEmail().withMessage("Invalid mail id"),
        (0, express_validator_1.body)("phoneNumber")
            .optional()
            .isLength({ min: 8 })
            .withMessage("Phone number must be at least 8 characters long")
            .isLength({ max: 14 })
            .withMessage("Phone number must be at most 14 characters long"),
        (0, express_validator_1.body)("countryCode")
            .optional()
            .isLength({ min: 1 })
            .withMessage("Country code must be at least 1 characters long")
            .isLength({ max: 3 })
            .withMessage("Country code must be at most 3 characters long"),
        (0, express_validator_1.body)("about")
            .optional()
            .isLength({ min: 5 })
            .withMessage("About must be at least 5 characters long")
            .isLength({ max: 500 })
            .withMessage("About must be at most 101 characters long"),
        (0, express_validator_1.body)("state")
            .optional()
            .isLength({ min: 3 })
            .withMessage("State must be at least 3 characters long")
            .isLength({ max: 25 })
            .withMessage("State must be at most 25 characters long"),
        (0, express_validator_1.body)("city")
            .not()
            .isEmpty()
            .withMessage("city")
            .isLength({ min: 3 })
            .withMessage("City must be at least 3 characters long")
            .isLength({ max: 21 })
            .withMessage("City must be at most 21 characters long"),
        (0, express_validator_1.body)("street")
            .not()
            .isEmpty()
            .isLength({ min: 5 })
            .withMessage("Street must be at least 5 characters long")
            .isLength({ max: 80 })
            .withMessage("Street must be at most 80 characters long"),
        (0, express_validator_1.body)("zip")
            .not()
            .isEmpty()
            .withMessage("zip")
            // .isInt()
            .isLength({ min: 5 })
            .withMessage("zip code must be grater then 5 digit")
            .isLength({ max: 11 })
            .withMessage("zip code must be at most 11 digit"),
        (0, express_validator_1.body)("zip")
            .not()
            .isEmpty()
            .withMessage("zip is required")
            .isLength({ min: 5 })
            .withMessage("zip code must be grater then 5 digit")
            .isLength({ max: 11 })
            .withMessage("zip code must be at most 11 digit"),
        (0, express_validator_1.body)("latitude")
            .not()
            .isEmpty()
            .withMessage("latitude is required")
            .isNumeric()
            .withMessage("must be number"),
        (0, express_validator_1.body)("longitude")
            .not()
            .isEmpty()
            .withMessage("longitude is required")
            .isNumeric()
            .withMessage("must be number"),
        (0, express_validator_1.body)("country")
            .not()
            .isEmpty()
            .withMessage("country")
            .isLength({ min: 3 })
            .withMessage("Country must be at least 3 characters long")
            .isLength({ max: 25 })
            .withMessage("Country must be at most 25 characters long"),
    ],
    // serviceId, modelId
    getStoreListAccordingServiceAvailability: [
        (0, express_validator_1.query)("servicesId.*")
            .not()
            .isEmpty()
            .withMessage("servicesId is required.")
            .isMongoId()
            .withMessage("servicesId must be mongoose id."),
        (0, express_validator_1.query)("servicesId")
            .optional()
            .isMongoId()
            .withMessage("servicesId must be mongoose id."),
        (0, express_validator_1.query)("modelId.*")
            .not()
            .isEmpty()
            .withMessage("modelId is required.")
            .isMongoId()
            .withMessage("modelId must be mongoose id."),
        (0, express_validator_1.query)("modelId")
            .optional()
            .isMongoId()
            .withMessage("modelId must be mongoose id."),
    ],
    storeManagerGet: [
        (0, express_validator_1.param)("store")
            .not()
            .isEmpty()
            .withMessage("store id is required.")
            .isMongoId()
            .withMessage("store must be mongoose id."),
    ],
};
exports.default = Store;
