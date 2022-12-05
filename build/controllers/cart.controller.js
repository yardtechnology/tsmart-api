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
var cart_logic_1 = __importDefault(require("../logic/cart.logic"));
var product_model_1 = require("../models/product.model");
var Cart = /** @class */ (function (_super) {
    __extends(Cart, _super);
    function Cart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //TODO: ORDER CART ITEM
        _this.validateOrderCartItemsFields = [
            (0, express_validator_1.body)("addressId")
                .not()
                .isEmpty()
                .withMessage("AddressId is required")
                .isString()
                .withMessage("AddressId must be a string"),
        ];
        return _this;
    }
    /** add product to cart */
    Cart.prototype.addToCart = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var productInfo, cartItems, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, product_model_1.ProductModel.findById(req.body.product)];
                    case 1:
                        productInfo = _c.sent();
                        if (!productInfo)
                            throw new Error("Product not found");
                        return [4 /*yield*/, _super.prototype.addProductToCart.call(this, req)];
                    case 2:
                        _c.sent();
                        _b = req.currentUser;
                        if (!_b) return [3 /*break*/, 4];
                        return [4 /*yield*/, _super.prototype.getCartItems.call(this, (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id)];
                    case 3:
                        _b = (_c.sent());
                        _c.label = 4;
                    case 4:
                        cartItems = _b;
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Product added to cart successfully",
                            data: cartItems,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _c.sent();
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /** remove product from cart */
    Cart.prototype.removeFromCart = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var cartItems, _b, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, _super.prototype.removeProductFromCart.call(this, req)];
                    case 1:
                        _c.sent();
                        _b = req.currentUser;
                        if (!_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, _super.prototype.getCartItems.call(this, (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id)];
                    case 2:
                        _b = (_c.sent());
                        _c.label = 3;
                    case 3:
                        cartItems = _b;
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Product removed from cart successfully",
                            data: cartItems,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _c.sent();
                        next(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /** delete product from cart */
    Cart.prototype.deleteFromCart = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, cartItems, _d, error_3;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 8, , 9]);
                        _c = (_a = req.query.idOf) === null || _a === void 0 ? void 0 : _a.toString().toUpperCase();
                        switch (_c) {
                            case "PRODUCT": return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 3];
                    case 1:
                        if (!req.params.cartItemId) {
                            throw new Error("No product id provided");
                        }
                        return [4 /*yield*/, _super.prototype.deleteProductFromCartByProductId.call(this, req.params.cartItemId.toString())];
                    case 2:
                        _e.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, _super.prototype.deleteProductFromCart.call(this, req.params.cartItemId.toString())];
                    case 4:
                        _e.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        _d = req.currentUser;
                        if (!_d) return [3 /*break*/, 7];
                        return [4 /*yield*/, _super.prototype.getCartItems.call(this, (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b._id)];
                    case 6:
                        _d = (_e.sent());
                        _e.label = 7;
                    case 7:
                        cartItems = _d;
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Product deleted from cart successfully",
                            data: cartItems,
                        });
                        return [3 /*break*/, 9];
                    case 8:
                        error_3 = _e.sent();
                        next(error_3);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /** get cart items */
    Cart.prototype.getCartInfo = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var cartItems, _b, error_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _b = req.currentUser;
                        if (!_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.getCartItems.call(this, (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        cartItems = _b;
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Cart items retrieved successfully",
                            data: cartItems,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _c.sent();
                        next(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Cart;
}(cart_logic_1.default));
exports.default = Cart;
