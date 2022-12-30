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
var banner_controller_1 = __importDefault(require("../controllers/banner.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var Banner = /** @class */ (function (_super) {
    __extends(Banner, _super);
    function Banner() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.BannerController = new banner_controller_1.default();
        _this.createBannerRoute();
        _this.updateBannerRoute();
        _this.getAllBannersRoute();
        _this.deleteBannerRoute();
        return _this;
    }
    //create banner
    Banner.prototype.createBannerRoute = function () {
        this.router.post("/banner", _super.prototype.isAdmin, this.BannerController.validateUpdateBannerFields, this.BannerController.createBannerController);
    };
    //update banner
    Banner.prototype.updateBannerRoute = function () {
        this.router.put("/banner/:bannerId", _super.prototype.isAdmin, this.BannerController.validateUpdateBannerFields, this.BannerController.updateBannerController);
    };
    //get all banners
    Banner.prototype.getAllBannersRoute = function () {
        this.router.get("/banners", this.BannerController.getAllBannersController);
    };
    //delete banner
    Banner.prototype.deleteBannerRoute = function () {
        this.router.delete("/banner/:bannerId", _super.prototype.isAdmin, this.BannerController.deleteBannerController);
    };
    return Banner;
}(authenticate_middleware_1.default));
exports.default = Banner;
