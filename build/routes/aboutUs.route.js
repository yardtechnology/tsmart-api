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
var aboutUs_controller_1 = __importDefault(require("../controllers/aboutUs.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var AboutUs = /** @class */ (function (_super) {
    __extends(AboutUs, _super);
    function AboutUs() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.AboutUsController = new aboutUs_controller_1.default();
        _this.createAboutUsRoute();
        _this.updateAboutUsRoute();
        _this.getAllAboutUssRoute();
        _this.deleteAboutUsRoute();
        return _this;
    }
    //create aboutUs
    AboutUs.prototype.createAboutUsRoute = function () {
        this.router.post("/aboutUs", _super.prototype.isAdmin, this.AboutUsController.createAboutUsController);
    };
    //update aboutUs
    AboutUs.prototype.updateAboutUsRoute = function () {
        this.router.put("/aboutUs/:aboutUsId", _super.prototype.isAdmin, this.AboutUsController.updateAboutUsController);
    };
    //get all aboutUss
    AboutUs.prototype.getAllAboutUssRoute = function () {
        this.router.get("/aboutUss", this.AboutUsController.getAllAboutUssController);
    };
    //delete aboutUs
    AboutUs.prototype.deleteAboutUsRoute = function () {
        this.router.delete("/aboutUs/:aboutUsId", _super.prototype.isAdmin, this.AboutUsController.deleteAboutUsController);
    };
    return AboutUs;
}(authenticate_middleware_1.default));
exports.default = AboutUs;
