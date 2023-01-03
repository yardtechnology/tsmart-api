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
var wishlist_controller_1 = __importDefault(require("../controllers/wishlist.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var WishList = /** @class */ (function (_super) {
    __extends(WishList, _super);
    function WishList() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.wishListController = new wishlist_controller_1.default();
        _this.addToWishListRoute();
        _this.removeFromWishListRoute();
        _this.getMyWishListRoute();
        return _this;
    }
    // add to wishlist
    WishList.prototype.addToWishListRoute = function () {
        this.router.put("/wishlist", _super.prototype.isAuthenticated, this.wishListController.addToWishList);
    };
    // remove from wishlist
    WishList.prototype.removeFromWishListRoute = function () {
        this.router.delete("/wishlist/:productId", _super.prototype.isAuthenticated, this.wishListController.removeFromWishList);
    };
    // get my wishlist
    WishList.prototype.getMyWishListRoute = function () {
        this.router.get("/wishlists", _super.prototype.isAuthenticated, this.wishListController.getMyWishList);
    };
    return WishList;
}(authenticate_middleware_1.default));
exports.default = WishList;
