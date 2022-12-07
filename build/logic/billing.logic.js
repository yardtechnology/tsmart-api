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
var models_1 = require("../models");
var billing_model_1 = require("../models/billing.model");
// import { ConfigModel } from "../models/config.model";
// import { CouponModel } from "../models/coupon.models";
var order_model_1 = require("../models/order.model");
var product_model_1 = require("../models/product.model");
var cart_logic_1 = __importDefault(require("./cart.logic"));
var coupon_logic_1 = __importDefault(require("./coupon.logic"));
var BillingLogic = /** @class */ (function (_super) {
    __extends(BillingLogic, _super);
    function BillingLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *create bill of an order
     */
    BillingLogic.prototype.createBill = function (_a) {
        var orderIds = _a.orderIds, price = _a.price, mrp = _a.mrp, razorpay_payment_id = _a.razorpay_payment_id, razorpay_order_id = _a.razorpay_order_id, razorpay_signature = _a.razorpay_signature, payment_order_id = _a.payment_order_id, status = _a.status;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var configData, total, tax, subPrice, bill, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    configData = {
                                        tax: 15,
                                    };
                                    total = price;
                                    tax = (configData === null || configData === void 0 ? void 0 : configData.tax) ? (total * configData.tax) / 100 : 0;
                                    subPrice = total - tax;
                                    return [4 /*yield*/, new billing_model_1.BillingModel({
                                            orders: orderIds,
                                            total: total,
                                            status: status,
                                            metadata: {
                                                payment_order_id: payment_order_id,
                                                razorpay_payment_id: razorpay_payment_id,
                                                razorpay_order_id: razorpay_order_id,
                                                razorpay_signature: razorpay_signature,
                                            },
                                            tax: tax,
                                            subPrice: subPrice,
                                        }).save()];
                                case 1:
                                    bill = _a.sent();
                                    resolve(bill);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _a.sent();
                                    reject(error_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * calculate single item bill of an order
     */
    BillingLogic.prototype.calculateItemBilling = function (_a) {
        var productId = _a.productId, quantity = _a.quantity, couponId = _a.couponId, userId = _a.userId;
        return __awaiter(this, void 0, void 0, function () {
            var configData, productData, amount, couponValue, couponData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        configData = {};
                        return [4 /*yield*/, product_model_1.ProductModel.findById(productId)];
                    case 1:
                        productData = _b.sent();
                        if (!productData)
                            throw new Error("Product not found");
                        amount = productData.salePrice * quantity;
                        couponValue = 0;
                        if (!couponId) return [3 /*break*/, 4];
                        return [4 /*yield*/, models_1.CouponSchema.findById(couponId)];
                    case 2:
                        couponData = _b.sent();
                        if (!couponData)
                            throw new Error("Coupon not found");
                        return [4 /*yield*/, _super.prototype.getCouponDiscount.call(this, {
                                couponId: couponId,
                                currentUserId: userId,
                                price: amount,
                            })];
                    case 3:
                        couponValue = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, {
                            amount: amount - couponValue,
                            couponInfo: couponData
                                ? {
                                    coupon: couponData === null || couponData === void 0 ? void 0 : couponData.code,
                                    benefitAmount: couponValue,
                                    activeAt: new Date(),
                                    couponId: couponData === null || couponData === void 0 ? void 0 : couponData._id,
                                }
                                : {},
                        }];
                }
            });
        });
    };
    /**
     * calculate cart item bill of order
     */
    BillingLogic.prototype.calculateCartItemBilling = function (_a) {
        var userId = _a.userId, couponId = _a.couponId;
        return __awaiter(this, void 0, void 0, function () {
            var configData, cartData, amount, couponValue, couponData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        configData = {};
                        return [4 /*yield*/, new cart_logic_1.default().getCartItems(userId)];
                    case 1:
                        cartData = _b.sent();
                        amount = cartData === null || cartData === void 0 ? void 0 : cartData.subTotal;
                        couponValue = 0;
                        if (!couponId) return [3 /*break*/, 4];
                        return [4 /*yield*/, models_1.CouponSchema.findById(couponId)];
                    case 2:
                        couponData = _b.sent();
                        if (!couponData)
                            throw new Error("Coupon not found");
                        return [4 /*yield*/, _super.prototype.getCouponDiscount.call(this, {
                                couponId: couponId,
                                currentUserId: userId,
                                price: amount,
                            })];
                    case 3:
                        couponValue = _b.sent();
                        _b.label = 4;
                    case 4: 
                    // if (!productData) throw new Error("Product not found");
                    return [2 /*return*/, {
                            amount: amount - couponValue,
                            couponInfo: couponData
                                ? {
                                    coupon: couponData === null || couponData === void 0 ? void 0 : couponData.code,
                                    benefitAmount: couponValue,
                                    activeAt: new Date(),
                                    couponId: couponData === null || couponData === void 0 ? void 0 : couponData._id,
                                }
                                : {},
                        }];
                }
            });
        });
    };
    /**
     * create order billing
     */
    BillingLogic.prototype.createOrderBilling = function (_a) {
        var orderIds = _a.orderIds, paymentMethod = _a.paymentMethod, payment_order_id = _a.payment_order_id, razorpay_payment_id = _a.razorpay_payment_id, razorpay_order_id = _a.razorpay_order_id, razorpay_signature = _a.razorpay_signature, couponDiscount = _a.couponDiscount;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var configData, ordersData, ordersIdArr, basePrice, bill, error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    configData = { tax: 15 };
                                    return [4 /*yield*/, order_model_1.OrderModel.find({ _id: { $in: orderIds } })];
                                case 1:
                                    ordersData = _a.sent();
                                    ordersIdArr = ordersData.map(function (order) { return order._id; });
                                    basePrice = ordersData.reduce(function (acc, order) {
                                        return (acc += order.product.salePrice * order.quantity);
                                    }, 0);
                                    return [4 /*yield*/, new billing_model_1.BillingModel({
                                            orders: ordersIdArr,
                                            subTotal: basePrice,
                                            tax: (configData === null || configData === void 0 ? void 0 : configData.tax) ? (basePrice * configData.tax) / 100 : 0,
                                            total: basePrice - ((couponDiscount === null || couponDiscount === void 0 ? void 0 : couponDiscount.benefitAmount) || 0),
                                            paymentMethod: paymentMethod,
                                            metadata: {
                                                payment_order_id: payment_order_id,
                                                razorpay_payment_id: razorpay_payment_id,
                                                razorpay_order_id: razorpay_order_id,
                                                razorpay_signature: razorpay_signature,
                                            },
                                            couponDiscount: couponDiscount,
                                            // TODO:remove comment after payment gateway integration
                                            // couponDiscount: {
                                            //   coupon: String,
                                            //   benefitAmount: Number,
                                            //   activeAt: Date,
                                            // },
                                            // cancellationFee: Number,
                                        }).save()];
                                case 2:
                                    bill = _a.sent();
                                    resolve(bill);
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_2 = _a.sent();
                                    reject(error_2);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * add extra charges in order
     */
    BillingLogic.prototype.createExtraFeesBilling = function (_a) {
        var orderId = _a.orderId, basePrice = _a.basePrice, paymentMethod = _a.paymentMethod, couponDiscount = _a.couponDiscount;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var configData, bill, error_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 4, , 5]);
                                    configData = { tax: 15 };
                                    return [4 /*yield*/, billing_model_1.BillingModel.findOneAndUpdate({
                                            orders: orderId,
                                            type: "EXTRA",
                                        }, {
                                            subTotal: basePrice,
                                            tax: (configData === null || configData === void 0 ? void 0 : configData.tax) ? (basePrice * configData.tax) / 100 : 0,
                                            total: basePrice - ((couponDiscount === null || couponDiscount === void 0 ? void 0 : couponDiscount.benefitAmount) || 0),
                                            paymentMethod: paymentMethod,
                                            couponDiscount: couponDiscount,
                                            orders: orderId,
                                            type: "EXTRA",
                                        }, {
                                            upsert: true,
                                        })];
                                case 1:
                                    bill = _a.sent();
                                    if (!!bill) return [3 /*break*/, 3];
                                    return [4 /*yield*/, new billing_model_1.BillingModel({
                                            subTotal: basePrice,
                                            tax: (configData === null || configData === void 0 ? void 0 : configData.tax) ? (basePrice * configData.tax) / 100 : 0,
                                            total: basePrice - ((couponDiscount === null || couponDiscount === void 0 ? void 0 : couponDiscount.benefitAmount) || 0),
                                            paymentMethod: paymentMethod,
                                            couponDiscount: couponDiscount,
                                            orders: orderId,
                                            type: "EXTRA",
                                        }).save()];
                                case 2:
                                    bill = _a.sent();
                                    _a.label = 3;
                                case 3:
                                    resolve(bill);
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_3 = _a.sent();
                                    reject(error_3);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return BillingLogic;
}(coupon_logic_1.default));
exports.default = BillingLogic;
