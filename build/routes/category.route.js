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
var category_controller_1 = __importDefault(require("../controllers/category.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.categoryController = new category_controller_1.default();
        _this.createCategoryRoute();
        _this.updateCategoryRoute();
        _this.getCategoryRoute();
        _this.getAllCategoryRoute();
        _this.deleteCategoryRoute();
        _this.getFeaturedCategoryRoute();
        return _this;
    }
    // create user
    Category.prototype.createCategoryRoute = function () {
        this.router.post("/category/", _super.prototype.isAuthenticated, this.categoryController.validateCreateCategoryFields, this.categoryController.createCategory);
    };
    // update category
    Category.prototype.updateCategoryRoute = function () {
        this.router.put("/category/:categoryId", _super.prototype.isAuthenticated, this.categoryController.validateCreateCategoryFields, this.categoryController.updateCategory);
    };
    //TODO: GET PRODUCTS BY CATEGORY
    // get category
    Category.prototype.getCategoryRoute = function () {
        this.router.get("/category/:categoryId", _super.prototype.isAuthenticated, this.categoryController.getCategory);
    };
    // get my categories
    Category.prototype.getAllCategoryRoute = function () {
        this.router.get("/categories", this.categoryController.getAllCategory);
    };
    // delete category
    Category.prototype.deleteCategoryRoute = function () {
        this.router.delete("/category/:categoryId", _super.prototype.isAuthenticated, this.categoryController.deleteCategory);
    };
    //get featured category
    Category.prototype.getFeaturedCategoryRoute = function () {
        this.router.get("/categories/featured", this.categoryController.getAllFeaturedCategory);
    };
    return Category;
}(authenticate_middleware_1.default));
exports.default = Category;
