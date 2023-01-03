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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var address_model_1 = require("../models/address.model");
var order_model_1 = require("../models/order.model");
var product_model_1 = require("../models/product.model");
var store_model_1 = require("../models/store.model");
var user_model_1 = require("../models/user.model");
var core_helper_1 = require("./../helper/core.helper");
var model_model_1 = require("./../models/model.model");
var servicePrice_model_1 = require("./../models/servicePrice.model");
var evaluation_logic_1 = __importDefault(require("./evaluation.logic"));
var media_logic_1 = __importDefault(require("./media.logic"));
// import NotificationLogic from "./notification.logic";
var http_errors_1 = require("http-errors");
var mongoose_1 = require("mongoose");
var mail_controller_1 = __importDefault(require("../controllers/mail.controller"));
var invoice_logic_1 = __importDefault(require("./invoice.logic"));
var OrderLogic = /** @class */ (function (_super) {
    __extends(OrderLogic, _super);
    function OrderLogic(id) {
        var _this = _super.call(this) || this;
        _this._orderId = id;
        return _this;
    }
    /** place store service order */
    OrderLogic.prototype.placeInStoreServiceOrder = function (_a) {
        var userId = _a.userId, storeId = _a.storeId, serviceTime = _a.serviceTime, serviceIds = _a.serviceIds, modelId = _a.modelId, makeId = _a.makeId, deviceId = _a.deviceId;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var userData, storeData, scheduledTime, makeData, modelData, deviceData, uniqServiceIds, servicePriceDetails, _i, _a, servicePriceId, servicePriceData, priceDetails, orderData, error_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 11, , 12]);
                                    return [4 /*yield*/, user_model_1.UserModel.findById(userId).select("_id displayName email phoneNumber countryCode avatar")];
                                case 1:
                                    userData = _b.sent();
                                    if (!userData)
                                        throw new Error("User not found");
                                    //if user is blocked
                                    if ((userData === null || userData === void 0 ? void 0 : userData.blockStatus) === "BLOCKED")
                                        throw new http_errors_1.Unauthorized("User is blocked");
                                    return [4 /*yield*/, store_model_1.StoreModel.findById(storeId).select("_id displayName email phoneNumber countryCode imageURL about address")];
                                case 2:
                                    storeData = _b.sent();
                                    if (!storeData)
                                        throw new Error("Store not found");
                                    scheduledTime = new Date(serviceTime);
                                    return [4 /*yield*/, models_1.MakeSchema.findById(makeId)];
                                case 3:
                                    makeData = _b.sent();
                                    if (!makeData)
                                        throw new Error("make not found");
                                    return [4 /*yield*/, model_model_1.ModelModel.findById(modelId)];
                                case 4:
                                    modelData = _b.sent();
                                    if (!modelData)
                                        throw new Error("model not found");
                                    return [4 /*yield*/, models_1.DevicesSchema.findById(deviceId)];
                                case 5:
                                    deviceData = _b.sent();
                                    if (!deviceData)
                                        throw new Error("device not found");
                                    uniqServiceIds = new Set(__spreadArray([], serviceIds, true));
                                    servicePriceDetails = [];
                                    _i = 0, _a = Array.from(uniqServiceIds);
                                    _b.label = 6;
                                case 6:
                                    if (!(_i < _a.length)) return [3 /*break*/, 9];
                                    servicePriceId = _a[_i];
                                    return [4 /*yield*/, servicePrice_model_1.ServicePriceModel.findById(servicePriceId).populate("service")];
                                case 7:
                                    servicePriceData = _b.sent();
                                    if (!servicePriceData)
                                        throw new Error("".concat(servicePriceId, " is not a valid servicePrice id"));
                                    servicePriceDetails.push(servicePriceData);
                                    _b.label = 8;
                                case 8:
                                    _i++;
                                    return [3 /*break*/, 6];
                                case 9:
                                    priceDetails = servicePriceDetails.reduce(function (prev, curr) {
                                        return (prev = {
                                            salePrice: prev.salePrice + (curr === null || curr === void 0 ? void 0 : curr.salePrice),
                                            mrp: prev.mrp + (curr === null || curr === void 0 ? void 0 : curr.mrp),
                                        });
                                    }, { salePrice: 0, mrp: 0 });
                                    return [4 /*yield*/, new order_model_1.OrderModel({
                                            user: userData,
                                            store: storeData,
                                            userID: userId,
                                            storeID: storeId,
                                            scheduledTime: scheduledTime,
                                            service: JSON.parse(JSON.stringify(servicePriceDetails)),
                                            type: "REPAIR",
                                            price: priceDetails === null || priceDetails === void 0 ? void 0 : priceDetails.salePrice,
                                            mrp: priceDetails === null || priceDetails === void 0 ? void 0 : priceDetails.mrp,
                                            status: "INITIATED",
                                            serviceType: "IN_STOR",
                                            make: makeData,
                                            makeId: makeData === null || makeData === void 0 ? void 0 : makeData._id,
                                            model: modelData,
                                            modelId: modelData === null || modelData === void 0 ? void 0 : modelData._id,
                                            device: deviceData,
                                            deviceId: deviceData === null || deviceData === void 0 ? void 0 : deviceData._id,
                                            startOTP: {
                                                otp: (0, core_helper_1.createOTP)(4),
                                            },
                                        }).save()];
                                case 10:
                                    orderData = _b.sent();
                                    resolve(orderData);
                                    return [3 /*break*/, 12];
                                case 11:
                                    error_1 = _b.sent();
                                    reject(error_1);
                                    return [3 /*break*/, 12];
                                case 12: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /** place mail in service order */
    OrderLogic.prototype.placeMailInServiceOrder = function (_a) {
        var userId = _a.userId, addressId = _a.addressId, serviceIds = _a.serviceIds, modelId = _a.modelId, makeId = _a.makeId, deviceId = _a.deviceId;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var userData, storeData, deliveryAddressData, makeData, modelData, deviceData, uniqServiceIds, servicePriceDetails, _i, _a, servicePriceId, servicePriceData, priceDetails, orderData, error_2;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 12, , 13]);
                                    return [4 /*yield*/, user_model_1.UserModel.findById(userId).select("_id displayName email phoneNumber countryCode avatar")];
                                case 1:
                                    userData = _b.sent();
                                    if (!userData)
                                        throw new Error("User not found");
                                    //if user is blocked
                                    if ((userData === null || userData === void 0 ? void 0 : userData.blockStatus) === "BLOCKED")
                                        throw new http_errors_1.Unauthorized("User is blocked");
                                    return [4 /*yield*/, store_model_1.StoreModel.findOne({ type: "HUB" }).select("_id displayName email phoneNumber countryCode imageURL about address")];
                                case 2:
                                    storeData = _b.sent();
                                    if (!storeData)
                                        throw new Error("Hub not found");
                                    return [4 /*yield*/, address_model_1.AddressModel.findById(addressId).select("_id name landmark email phoneNumber countryCode street city state country zip type")];
                                case 3:
                                    deliveryAddressData = _b.sent();
                                    if (!deliveryAddressData)
                                        throw new Error("Delivery address not found");
                                    return [4 /*yield*/, models_1.MakeSchema.findById(makeId)];
                                case 4:
                                    makeData = _b.sent();
                                    if (!makeData)
                                        throw new Error("make not found");
                                    return [4 /*yield*/, model_model_1.ModelModel.findById(modelId)];
                                case 5:
                                    modelData = _b.sent();
                                    if (!modelData)
                                        throw new Error("model not found");
                                    return [4 /*yield*/, models_1.DevicesSchema.findById(deviceId)];
                                case 6:
                                    deviceData = _b.sent();
                                    if (!deviceData)
                                        throw new Error("device not found");
                                    uniqServiceIds = new Set(__spreadArray([], serviceIds, true));
                                    servicePriceDetails = [];
                                    _i = 0, _a = Array.from(uniqServiceIds);
                                    _b.label = 7;
                                case 7:
                                    if (!(_i < _a.length)) return [3 /*break*/, 10];
                                    servicePriceId = _a[_i];
                                    return [4 /*yield*/, servicePrice_model_1.ServicePriceModel.findById(servicePriceId).populate("service")];
                                case 8:
                                    servicePriceData = _b.sent();
                                    if (!servicePriceData)
                                        throw new Error("".concat(servicePriceId, " is not a valid servicePrice id"));
                                    servicePriceDetails.push(servicePriceData);
                                    _b.label = 9;
                                case 9:
                                    _i++;
                                    return [3 /*break*/, 7];
                                case 10:
                                    priceDetails = servicePriceDetails.reduce(function (prev, curr) {
                                        return (prev = {
                                            salePrice: prev.salePrice + (curr === null || curr === void 0 ? void 0 : curr.salePrice),
                                            mrp: prev.mrp + (curr === null || curr === void 0 ? void 0 : curr.mrp),
                                        });
                                    }, { salePrice: 0, mrp: 0 });
                                    return [4 /*yield*/, new order_model_1.OrderModel({
                                            user: userData,
                                            store: storeData,
                                            address: deliveryAddressData,
                                            userID: userId,
                                            storeID: storeData === null || storeData === void 0 ? void 0 : storeData._id,
                                            service: JSON.parse(JSON.stringify(servicePriceDetails)),
                                            type: "REPAIR",
                                            price: priceDetails === null || priceDetails === void 0 ? void 0 : priceDetails.salePrice,
                                            mrp: priceDetails === null || priceDetails === void 0 ? void 0 : priceDetails.mrp,
                                            status: "INITIATED",
                                            serviceType: "MAIL_IN",
                                            make: makeData,
                                            makeId: makeData === null || makeData === void 0 ? void 0 : makeData._id,
                                            model: modelData,
                                            modelId: modelData === null || modelData === void 0 ? void 0 : modelData._id,
                                            device: deviceData,
                                            deviceId: deviceData === null || deviceData === void 0 ? void 0 : deviceData._id,
                                        }).save()];
                                case 11:
                                    orderData = _b.sent();
                                    resolve(orderData);
                                    return [3 /*break*/, 13];
                                case 12:
                                    error_2 = _b.sent();
                                    reject(error_2);
                                    return [3 /*break*/, 13];
                                case 13: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /** place call out service order */
    OrderLogic.prototype.placeCallOutOrder = function (_a) {
        var userId = _a.userId, address = _a.address, serviceIds = _a.serviceIds, modelId = _a.modelId, makeId = _a.makeId, deviceId = _a.deviceId, scheduledTime = _a.scheduledTime;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var userData, uniqServiceIds, servicePriceDetails, _i, _a, servicePriceId, servicePriceData, priceDetails, scheduledTimeData, makeData, modelData, deviceData, orderData, error_3;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 10, , 11]);
                                    return [4 /*yield*/, user_model_1.UserModel.findById(userId).select("_id displayName email phoneNumber countryCode avatar")];
                                case 1:
                                    userData = _b.sent();
                                    if (!userData)
                                        throw new Error("User not found");
                                    //if user is blocked
                                    if ((userData === null || userData === void 0 ? void 0 : userData.blockStatus) === "BLOCKED")
                                        throw new http_errors_1.Unauthorized("User is blocked");
                                    uniqServiceIds = new Set(__spreadArray([], serviceIds, true));
                                    servicePriceDetails = [];
                                    _i = 0, _a = Array.from(uniqServiceIds);
                                    _b.label = 2;
                                case 2:
                                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                                    servicePriceId = _a[_i];
                                    return [4 /*yield*/, servicePrice_model_1.ServicePriceModel.findById(servicePriceId).populate("service")];
                                case 3:
                                    servicePriceData = _b.sent();
                                    if (!servicePriceData)
                                        throw new Error("".concat(servicePriceId, " is not a valid servicePrice id"));
                                    servicePriceDetails.push(servicePriceData);
                                    _b.label = 4;
                                case 4:
                                    _i++;
                                    return [3 /*break*/, 2];
                                case 5:
                                    priceDetails = servicePriceDetails.reduce(function (prev, curr) {
                                        return (prev = {
                                            salePrice: prev.salePrice + (curr === null || curr === void 0 ? void 0 : curr.salePrice),
                                            mrp: prev.mrp + (curr === null || curr === void 0 ? void 0 : curr.mrp),
                                        });
                                    }, { salePrice: 0, mrp: 0 });
                                    scheduledTimeData = new Date(scheduledTime);
                                    return [4 /*yield*/, models_1.MakeSchema.findById(makeId)];
                                case 6:
                                    makeData = _b.sent();
                                    if (!makeData)
                                        throw new Error("make not found");
                                    return [4 /*yield*/, model_model_1.ModelModel.findById(modelId)];
                                case 7:
                                    modelData = _b.sent();
                                    if (!modelData)
                                        throw new Error("model not found");
                                    return [4 /*yield*/, models_1.DevicesSchema.findById(deviceId)];
                                case 8:
                                    deviceData = _b.sent();
                                    if (!deviceData)
                                        throw new Error("device not found");
                                    return [4 /*yield*/, new order_model_1.OrderModel({
                                            user: userData,
                                            address: address,
                                            userID: userId,
                                            service: JSON.parse(JSON.stringify(servicePriceDetails)),
                                            type: "REPAIR",
                                            price: priceDetails === null || priceDetails === void 0 ? void 0 : priceDetails.salePrice,
                                            mrp: priceDetails === null || priceDetails === void 0 ? void 0 : priceDetails.mrp,
                                            status: "INITIATED",
                                            serviceType: "CALL_OUT",
                                            make: makeData,
                                            makeId: makeData === null || makeData === void 0 ? void 0 : makeData._id,
                                            model: modelData,
                                            modelId: modelData === null || modelData === void 0 ? void 0 : modelData._id,
                                            device: deviceData,
                                            deviceId: deviceData === null || deviceData === void 0 ? void 0 : deviceData._id,
                                            scheduledTime: scheduledTimeData,
                                        }).save()];
                                case 9:
                                    orderData = _b.sent();
                                    resolve(orderData);
                                    return [3 /*break*/, 11];
                                case 10:
                                    error_3 = _b.sent();
                                    reject(error_3);
                                    return [3 /*break*/, 11];
                                case 11: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * order product
     */
    OrderLogic.prototype.orderProduct = function (_a) {
        var userId = _a.userId, productId = _a.productId, quantity = _a.quantity, billingId = _a.billingId, shippedTo = _a.shippedTo, status = _a.status;
        return __awaiter(this, void 0, void 0, function () {
            var userData, productData, storeData, deliveryAddressData, orderData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, user_model_1.UserModel.findById(userId).select("_id email country phoneNumber role age ")];
                    case 1:
                        userData = _b.sent();
                        if (!userData)
                            throw new Error("User not found");
                        //if user is blocked
                        if ((userData === null || userData === void 0 ? void 0 : userData.blockStatus) === "BLOCKED")
                            throw new http_errors_1.Unauthorized("User is blocked");
                        return [4 /*yield*/, product_model_1.ProductModel.findById(productId)];
                    case 2:
                        productData = _b.sent();
                        if (!productData)
                            throw new Error("Product not found");
                        return [4 /*yield*/, store_model_1.StoreModel.findById(productData.store)];
                    case 3:
                        storeData = _b.sent();
                        if (!storeData)
                            throw new Error("Store not found");
                        return [4 /*yield*/, address_model_1.AddressModel.findById(shippedTo)];
                    case 4:
                        deliveryAddressData = _b.sent();
                        if (!deliveryAddressData)
                            throw new Error("Delivery address not found");
                        return [4 /*yield*/, new order_model_1.OrderModel({
                                user: userData,
                                userID: userData._id,
                                store: storeData,
                                storeID: storeData === null || storeData === void 0 ? void 0 : storeData._id,
                                product: productData,
                                type: (productData === null || productData === void 0 ? void 0 : productData.type) === "ACCESSORY" ? "ACCESSORY" : "REFURBISH",
                                quantity: quantity,
                                billing: billingId,
                                address: deliveryAddressData,
                                status: status,
                                price: productData.salePrice * Number(quantity),
                                mrp: productData.mrp * Number(quantity),
                            }).save()];
                    case 5:
                        orderData = _b.sent();
                        //TODO: add order notifications
                        return [2 /*return*/, orderData];
                }
            });
        });
    };
    /**
     * update order status and ETA update
     */
    OrderLogic.prototype.updateOrderStatus = function (_a) {
        var orderId = _a.orderId, status = _a.status, eta = _a.eta;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var orderData, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, order_model_1.OrderModel.findByIdAndUpdate(orderId, {
                                            status: status,
                                            ETA: eta,
                                        })];
                                case 1:
                                    orderData = _a.sent();
                                    if (!orderData)
                                        throw new Error("Order not found");
                                    resolve(orderData);
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_1 = _a.sent();
                                    reject(err_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**get order details */
    OrderLogic.prototype.getOrderDetails = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var orderData, orderData2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderData = null;
                        return [4 /*yield*/, order_model_1.OrderModel.aggregate([
                                {
                                    $match: {
                                        _id: new mongoose_1.Types.ObjectId(orderId),
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "billings",
                                        localField: "billing",
                                        foreignField: "_id",
                                        as: "billing",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$billing",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "billings",
                                        localField: "extraBilling",
                                        foreignField: "_id",
                                        as: "extraBilling",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$extraBilling",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "reviews",
                                        localField: "technicianID",
                                        foreignField: "technician",
                                        as: "isReview",
                                        let: { userID: "$userID" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    user: "$$userID",
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $addFields: {
                                        isReview: { $gte: [{ $size: "$isReview" }, 1] },
                                    },
                                },
                            ])];
                    case 1:
                        orderData2 = _a.sent();
                        if (!orderData2[0]) {
                            throw new Error("order not found");
                        }
                        return [2 /*return*/, orderData2[0]];
                }
            });
        });
    };
    /**update order details */
    OrderLogic.prototype.updateOrderDetails = function (_a) {
        var orderId = _a.orderId, faceVideo = _a.faceVideo, startImage = _a.startImage, endImage = _a.endImage;
        return __awaiter(this, void 0, void 0, function () {
            var faceVideoData, _b, startImageData, _c, endImageData, _d, orderData;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!(faceVideo && !Array.isArray(faceVideo))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, faceVideo, "".concat(orderId))];
                    case 1:
                        _b = _e.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = undefined;
                        _e.label = 3;
                    case 3:
                        faceVideoData = _b;
                        if (!(startImage && !Array.isArray(startImage))) return [3 /*break*/, 5];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, startImage, "".concat(orderId))];
                    case 4:
                        _c = _e.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _c = undefined;
                        _e.label = 6;
                    case 6:
                        startImageData = _c;
                        if (!(endImage && !Array.isArray(endImage))) return [3 /*break*/, 8];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, endImage, "".concat(orderId))];
                    case 7:
                        _d = _e.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        _d = undefined;
                        _e.label = 9;
                    case 9:
                        endImageData = _d;
                        return [4 /*yield*/, order_model_1.OrderModel.findByIdAndUpdate(orderId, {
                                faceVideo: faceVideoData === null || faceVideoData === void 0 ? void 0 : faceVideoData.url,
                                faceVideoPath: faceVideoData === null || faceVideoData === void 0 ? void 0 : faceVideoData.path,
                                startImage: startImageData === null || startImageData === void 0 ? void 0 : startImageData.url,
                                startImagePATH: startImageData === null || startImageData === void 0 ? void 0 : startImageData.path,
                                endImage: endImageData === null || endImageData === void 0 ? void 0 : endImageData.url,
                                endImagePATH: endImageData === null || endImageData === void 0 ? void 0 : endImageData.path,
                                "startOTP.otp": faceVideo ? (0, core_helper_1.createOTP)(4) : undefined,
                                "endOTP.otp": endImage ? (0, core_helper_1.createOTP)(4) : undefined,
                            })];
                    case 10:
                        orderData = _e.sent();
                        if (!orderData) {
                            throw new Error("order not found");
                        }
                        return [2 /*return*/, orderData];
                }
            });
        });
    };
    /**
     * place sell order
     */
    OrderLogic.prototype.placeSellOrder = function (_a) {
        var userId = _a.userId, paymentMethod = _a.paymentMethod, makeId = _a.makeId, modelId = _a.modelId, deviceId = _a.deviceId, _b = _a.falsyEvaluatedIds, falsyEvaluatedIds = _b === void 0 ? [] : _b, addressId = _a.addressId, bankDetails = _a.bankDetails, colorId = _a.colorId, memoryId = _a.memoryId, imei = _a.imei;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_c) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var userData, addressData, makeData, modelData, deviceData, colorData, memoryData, uniqFalsyEvaluatedValues, evaluatedPrice, orderData, error_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 11, , 12]);
                                    return [4 /*yield*/, user_model_1.UserModel.findById(userId).select("_id displayName email phoneNumber countryCode avatar")];
                                case 1:
                                    userData = _a.sent();
                                    if (!userData)
                                        throw new Error("User not found");
                                    return [4 /*yield*/, address_model_1.AddressModel.findById(addressId)];
                                case 2:
                                    addressData = _a.sent();
                                    if (!addressData && !(bankDetails === null || bankDetails === void 0 ? void 0 : bankDetails.fullName))
                                        throw new Error("address not found");
                                    return [4 /*yield*/, models_1.MakeSchema.findById(makeId)];
                                case 3:
                                    makeData = _a.sent();
                                    if (!makeData)
                                        throw new Error("make not found");
                                    return [4 /*yield*/, model_model_1.ModelModel.findById(modelId)];
                                case 4:
                                    modelData = _a.sent();
                                    if (!modelData)
                                        throw new Error("model not found");
                                    return [4 /*yield*/, models_1.DevicesSchema.findById(deviceId)];
                                case 5:
                                    deviceData = _a.sent();
                                    if (!deviceData)
                                        throw new Error("device not found");
                                    return [4 /*yield*/, models_1.ColorSchema.findById(colorId)];
                                case 6:
                                    colorData = _a.sent();
                                    if (!colorData)
                                        throw new Error("color not found");
                                    return [4 /*yield*/, models_1.MemorySchema.findById(memoryId)];
                                case 7:
                                    memoryData = _a.sent();
                                    if (!memoryData)
                                        throw new Error("memory not found");
                                    return [4 /*yield*/, models_1.EvaluationPriceSchema.find({
                                            _id: { $in: falsyEvaluatedIds },
                                        }).populate("evaluation")];
                                case 8:
                                    uniqFalsyEvaluatedValues = _a.sent();
                                    return [4 /*yield*/, new evaluation_logic_1.default().deviceEvaluation({
                                            colorId: colorData === null || colorData === void 0 ? void 0 : colorData._id,
                                            memoryId: memoryData === null || memoryData === void 0 ? void 0 : memoryData._id,
                                            modelId: modelData === null || modelData === void 0 ? void 0 : modelData._id,
                                            evaluationPriceIds: falsyEvaluatedIds,
                                        })];
                                case 9:
                                    evaluatedPrice = _a.sent();
                                    return [4 /*yield*/, new order_model_1.OrderModel({
                                            user: userData,
                                            address: addressData,
                                            userID: userId,
                                            evaluatedValues: JSON.parse(JSON.stringify(uniqFalsyEvaluatedValues)),
                                            type: "SELL",
                                            evaluatedPrice: evaluatedPrice === null || evaluatedPrice === void 0 ? void 0 : evaluatedPrice.evaluatePrice,
                                            status: "INITIATED",
                                            paymentMethod: paymentMethod,
                                            make: makeData,
                                            makeId: makeData === null || makeData === void 0 ? void 0 : makeData._id,
                                            model: modelData,
                                            modelId: modelData === null || modelData === void 0 ? void 0 : modelData._id,
                                            device: deviceData,
                                            deviceId: deviceData === null || deviceData === void 0 ? void 0 : deviceData._id,
                                            bankDetails: bankDetails,
                                            color: colorData,
                                            colorId: colorData === null || colorData === void 0 ? void 0 : colorData._id,
                                            memory: memoryData,
                                            memoryId: memoryData === null || memoryData === void 0 ? void 0 : memoryData._id,
                                            imei: imei,
                                        }).save()];
                                case 10:
                                    orderData = _a.sent();
                                    resolve(orderData);
                                    return [3 /*break*/, 12];
                                case 11:
                                    error_4 = _a.sent();
                                    reject(error_4);
                                    return [3 /*break*/, 12];
                                case 12: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * invoice send to mail
     */
    OrderLogic.prototype.sendInvoiceToMail = function (_a) {
        var _b;
        var orderId = _a.orderId, mail = _a.mail, _c = _a.isDownload, isDownload = _c === void 0 ? false : _c;
        return __awaiter(this, void 0, void 0, function () {
            var orderData, mailOptions, error_5;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, new invoice_logic_1.default().getInvoiceHTML({ orderId: orderId })];
                    case 1:
                        orderData = _d.sent();
                        if (isDownload) {
                            return [2 /*return*/, orderData === null || orderData === void 0 ? void 0 : orderData.invoiceHTML];
                        }
                        mailOptions = {
                            from: process.env.EMAIL,
                            to: mail,
                            subject: "Invoice for your order ".concat((_b = orderData === null || orderData === void 0 ? void 0 : orderData.orderData) === null || _b === void 0 ? void 0 : _b._id),
                            html: orderData === null || orderData === void 0 ? void 0 : orderData.invoiceHTML,
                        };
                        return [4 /*yield*/, new mail_controller_1.default().transporter.sendMail(mailOptions)];
                    case 2: return [2 /*return*/, _d.sent()];
                    case 3:
                        error_5 = _d.sent();
                        console.log("INVOICE ERROR: ", error_5);
                        throw new Error(error_5);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderLogic;
}(media_logic_1.default));
exports.default = OrderLogic;
