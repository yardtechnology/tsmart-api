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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var Cart = /** @class */ (function (_super) {
    __extends(Cart, _super);
    function Cart() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.cartController = new cart_controller_1.default();
        _this.addProductToCartRoute();
        _this.removeProductFromCartRoute();
        _this.deleteProductFromCartRoute();
        _this.getCartInfoRoute();
        return _this;
    }
    // add to Cart
    Cart.prototype.addProductToCartRoute = function () {
        this.router.put("/cart/add", _super.prototype.isAuthenticated, this.cartController.addToCart);
    };
    // remove from Cart
    Cart.prototype.removeProductFromCartRoute = function () {
        this.router.put("/cart/remove", _super.prototype.isAuthenticated, this.cartController.removeFromCart);
    };
    // delete
    Cart.prototype.deleteProductFromCartRoute = function () {
        this.router.delete("/cart/:cartItemId", _super.prototype.isAuthenticated, this.cartController.deleteFromCart);
    };
    // get cart info
    Cart.prototype.getCartInfoRoute = function () {
        this.router.get("/cart/all", _super.prototype.isAuthenticated, this.cartController.getCartInfo);
    };
    return Cart;
}(authenticate_middleware_1.default));
exports.default = Cart;
