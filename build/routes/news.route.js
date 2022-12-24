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
var news_controller_1 = __importDefault(require("../controllers/news.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var News = /** @class */ (function (_super) {
    __extends(News, _super);
    function News() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.NewsController = new news_controller_1.default();
        _this.createNewsRoute();
        _this.updateNewsRoute();
        _this.getAllNewsesRoute();
        _this.deleteNewsRoute();
        _this.getNewsRoute();
        return _this;
    }
    //create news
    News.prototype.createNewsRoute = function () {
        this.router.post("/news", _super.prototype.isAdmin, this.NewsController.validateCreateNewsFields, this.NewsController.createNewsController);
    };
    //update news
    News.prototype.updateNewsRoute = function () {
        this.router.put("/news/:newsId", _super.prototype.isAdmin, this.NewsController.validateUpdateNewsFields, this.NewsController.updateNewsController);
    };
    //get news
    News.prototype.getNewsRoute = function () {
        this.router.get("/news/:newsId", this.NewsController.getNewsByIdController);
    };
    //get all newses
    News.prototype.getAllNewsesRoute = function () {
        this.router.get("/newses", this.NewsController.getAllNewsesController);
    };
    //delete news
    News.prototype.deleteNewsRoute = function () {
        this.router.delete("/news/:newsId", _super.prototype.isAdmin, this.NewsController.deleteNewsController);
    };
    return News;
}(authenticate_middleware_1.default));
exports.default = News;
